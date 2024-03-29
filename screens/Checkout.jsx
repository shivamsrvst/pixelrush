import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/cart/AppBar";
import { COLORS, SIZES } from "../constants";
import styles from "./checkout.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components";
import { calculateTotalAmount } from "../components/cart/cartUtils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import makeOrder from "../hook/makeOrder";
import deleteCart from "../hook/deleteCart";
import { resetCart } from "../context/actions/cartActions";
import { useStripe } from "@stripe/stripe-react-native";
import { BACKEND_URL } from "../config";
import { showLoading, hideLoading } from "../context/actions/uiActions";
import ConfettiCannon from "react-native-confetti-cannon";

const Checkout = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("payOnDelivery");
  const [userData, setUserData] = useState(null);
  const [orderSuccessModalVisible, setOrderSuccessModalVisible] =
    useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { discount } = route.params;
  const pricingDetails = calculateTotalAmount(cartItems, discount);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  console.log("Total Amount to Pay:", pricingDetails.finalTotal.toFixed(2));
  console.log("Items Coming From Cart To Checkout", cartItems);
  const isCheckoutInitiating = useSelector((state) => state.ui.isLoading);

  const showOrderSuccessModal = () => {
    setOrderSuccessModalVisible(true);
  };

  const hideOrderSuccessModal = () => {
    setOrderSuccessModalVisible(false);
  };

  const navigateToHome = () => {
    hideOrderSuccessModal(); // Close modal before navigating
    navigation.navigate("Home");
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const renderPaymentButton = () => {
    if (paymentMethod === "payOnDelivery") {
      return (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.paymentButtonText}>Place Order</Text>
        </TouchableOpacity>
      );
    } else if (paymentMethod === "payOnline") {
      return (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePayOnline}
        >
          <Text style={styles.paymentButtonText}>Pay and Place Order</Text>
        </TouchableOpacity>
      );
    }
  };

  const checkExistingUser = async () => {
    console.log("inside the check user function");
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.log("Error retrieving the data", error);
    }
  };

  useEffect(() => {
    checkExistingUser();
  }, []);

  const generateOrderId = () => {
    const random = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    return random.toString(); // Convert the random number to string
  };

  const handlePlaceOrder = async (paymentMethod) => {
    // Logic for placing order (pay on delivery)
    dispatch(showLoading());
    const orderData = {
      orderId: generateOrderId(), // You need to implement this function
      userId: userData ? userData._id : null,
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
        title: item.title,
        // Assuming you have imageUrl in your cartItems
      })),
      subtotal: pricingDetails.totalAmount,
      total: pricingDetails.finalTotal.toFixed(0),
      paymentStatus: paymentMethod === "payOnline" ? "Paid Online" : "pending",
      deliveryStatus: "pending",
    };

    console.log("Order Data to be Sent To DataBase:", orderData);
    await makeOrder(orderData);
    await deleteCart(userData._id);
    dispatch(resetCart());
    dispatch(hideLoading());
    showOrderSuccessModal();

    // Delay and navigate to Home
    setTimeout(navigateToHome, 4000);
  };
  const generatePaymentDescription = (cartItems) => {
    const titles = cartItems.map((item) => item.title); // Extract titles from cart items
    const description = "Payment Initiated for " + titles.join(", "); // Concatenate titles with commas
    return description;
  };

  const handlePayOnline = async () => {
    console.log("Entered The createCheckout Function");
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    const email = userData.email;
    const DUMMY_ADDRESS = {
      line1: "123 Fake Street",
      city: "Dummy City",
      postal_code: "98140",
      state: "DA",
      country: "US",
    };
    const description = generatePaymentDescription(cartItems);
    const response = await fetch(`${BACKEND_URL}/api/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: pricingDetails.finalTotal.toFixed(0) * 100,
        description: description,
        customerAddress: DUMMY_ADDRESS,
        customerEmail: email,
      }),
    });
    if (response.error) {
      Alert.alert("Something Went Wrong");
      return;
    }
    const responseJson = await response.json();
    console.log(responseJson.paymentIntent);

    const initResponse = initPaymentSheet({
      merchantDisplayName: "Pixelrush Ventures",
      paymentIntentClientSecret: responseJson.paymentIntent,
    });

    if ((await initResponse).error) {
      console.log(await initResponse.error);
      Alert.alert("Something Went Wrong....");
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      console.log("Payment UnsucessFull");
      console.log(paymentResponse.error);
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    } else {
      // Payment successful!
      console.log("Payment Successful");
      await handlePlaceOrder("payOnline");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Checkout" />
      {isCheckoutInitiating && (
        <View style={[styles.itemLoadingContainer, { flex: 1 }]}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      )}
      <Modal
        visible={orderSuccessModalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={hideOrderSuccessModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Yayy..!Order Placed Successfully!
          </Text>
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        </View>
      </Modal>
      <View style={styles.cardContainer}>
        <View style={styles.cardDelivery}>
          <Text style={styles.cardTitleDelivery}>
            Delivering To - {userData ? userData.location : "Varanasi India"}
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Payment Method:</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "payOnDelivery" && styles.selectedPayment,
            ]}
            onPress={() => handlePaymentMethod("payOnDelivery")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Pay on Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "payOnline" && styles.selectedPayment,
            ]}
            onPress={() => handlePaymentMethod("payOnline")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Pay Online</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountLabel}>To Pay:</Text>
          <Text style={styles.totalAmount}>
            ${pricingDetails.finalTotal.toFixed(0)}
          </Text>
        </View>
        {renderPaymentButton()}
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
