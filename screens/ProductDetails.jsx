import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./productDetails.style";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddToCart from "../hook/AddToCart";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoading,
  showToast,
  hideLoading,
  hideToast,
} from "../context/actions/uiActions";
import Toast from "react-native-root-toast";
import { BACKEND_URL } from "../config";
import { useStripe } from "@stripe/stripe-react-native";
import makeOrder from "../hook/makeOrder";
import ConfettiCannon from "react-native-confetti-cannon";

const ProductDetails = ({ navigation }) => {
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState(false);
  const [orderSuccessModalVisible, setOrderSuccessModalVisible] =
    useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isItemAddLoading = useSelector((state) => state.ui.isLoading);
  const toastMessage = useSelector((state) => state.ui.toastMessage);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const route = useRoute();
  const { item, isUpcoming } = route.params;
  console.log("Item's Structure:", item);

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

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  useEffect(() => {
    checkExistingUser();
    checkFavorites();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (id !== null) {
        const parsedData = JSON.parse(currentUser);
        setIsLoggedIn(true);
        setUserData(parsedData);
        console.log("Current User's Data:", parsedData);
      } else {
        console.log("User Not Logged In.....");
        setUserData(null);
      }
    } catch (error) {
      console.log("Error retrieving the data", error);
    }
  };

  const createCheckout = async () => {
    console.log("Entered The createCheckout Function");
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    const email = userData.email;
    const total = item.price * count + 5;
    const DUMMY_ADDRESS = {
      line1: "123 Fake Street",
      city: "Dummy City",
      postal_code: "98140",
      state: "DA",
      country: "US",
    };
    const response = await fetch(`${BACKEND_URL}/api/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.floor(total * 100),
        description: item.description,
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
      dispatch(showLoading());

      // Logic for placing order (pay on delivery)
      const formattedProduct = [
        {
          productId: item._id,
          quantity: count,
          price: item.price,
          imageUrl: item.imageUrl,
          title: item.title,
        },
      ];
      const generateOrderId = () => {
        const random = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
        return random.toString(); // Convert the random number to string
      };
      const orderData = {
        orderId: generateOrderId(), // You need to implement this function
        userId: userData ? userData._id : null,
        products: formattedProduct,
        subtotal: item.price,
        total: total,
        paymentStatus: "Paid Online",
        deliveryStatus: "Pending",
      };

      console.log("Order Data to be Sent To DataBase:", orderData);
      await makeOrder(orderData);
      dispatch(hideLoading());
      showOrderSuccessModal();

      // Delay and navigate to Home
      setTimeout(navigateToHome, 4000);
    }
  };

  const handlePress = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      addToFavorites();
    }
  };
  const handleAddToCart = async () => {
    try {
      // Check if the user is logged in
      if (!isLoggedIn) {
        // If not logged in, navigate to the login page
        navigation.navigate("Login");
        return;
      }

      // Check if the item is already in the cart
      const isInCart = cartItems.some(
        (cartItem) => cartItem.productId === item._id
      );

      // If not in cart, add to cart
      if (!isInCart) {
        dispatch(showLoading());
        await AddToCart(item._id, count, dispatch);
        dispatch(hideLoading()); // Dispatch action to hide loading indicator
        // Show a success toast message
        dispatch(showToast("Item added to cart"));
        // You can also update the UI to change the icon here
        setTimeout(() => {
          dispatch(hideToast()); // Dispatch action to hide toast after a delay
        }, 3000);
      } else {
        // Item is already in the cart
        console.log("Item is already in the cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      // Show an error toast message
      dispatch(showToast("Error adding to cart"));
      dispatch(hideLoading());
    }
  };
  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      createCheckout();
    }
  };
  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location,
    };
    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        console.log("Deleted");
        setFavorites(false);
      } else {
        favoritesObj[productId] = productObj;
        console.log("Added to favorites");
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };
  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    // console.log(favoritesId);
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          console.log(item._id);
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isItemAddLoading && (
        <View style={[styles.itemLoadingContainer, { flex: 1 }]}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.tertiary} />
        </View>
      )}
      {orderSuccessModalVisible ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Modal
            visible={orderSuccessModalVisible}
            transparent={false}
            animationType="slide"
            onRequestClose={hideOrderSuccessModal}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Yayy..!Order Placed Successfully!
              </Text>
              <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
            </View>
          </Modal>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>

            {!item.labels.includes("Upcoming") && (
              <TouchableOpacity onPress={() => handlePress()}>
                <Ionicons
                  name={favorites ? "heart" : "heart-outline"}
                  size={30}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />

          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.priceWrapper}>
                <Text style={styles.price}>$ {item.price}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={24}
                    color={isUpcoming ? "gray" : "gold"}
                  />
                ))}
                {isUpcoming ? (
                  <></>
                ) : (
                  <Text style={styles.ratingText}> (4.9)</Text>
                )}
              </View>
              {isUpcoming ? (
                <Text
                  style={[styles.rating, { fontSize: 15, fontWeight: "bold" }]}
                >
                  (Expected)
                </Text>
              ) : (
                <View style={styles.rating}>
                  <TouchableOpacity onPress={() => increment()}>
                    <SimpleLineIcons name="plus" size={20} />
                  </TouchableOpacity>
                  <Text style={styles.ratingText}>{count}</Text>

                  <TouchableOpacity onPress={() => decrement()}>
                    <SimpleLineIcons name="minus" size={20} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descText}>{item.description}</Text>
            </View>
            {isUpcoming ? (
              <></>
            ) : (
              <View style={{ marginBottom: SIZES.small }}>
                <View style={styles.location}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location-outline" size={20} />
                    <Text> {item.product_location}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={20}
                    />
                    <Text> Free Delivery</Text>
                  </View>
                </View>
              </View>
            )}

            {isUpcoming ? (
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.upcomingUrl)}
                  style={styles.cartBtn}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.medium,
                      color: COLORS.lightWhite,
                      marginLeft: SIZES.small,
                    }}
                  >
                    Discover More..
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => handleBuy()}
                  style={styles.cartBtn}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.medium,
                      color: COLORS.lightWhite,
                      marginLeft: SIZES.small,
                    }}
                  >
                    BUY NOW
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddToCart()}
                  style={[styles.cartBtn, { marginRight: 12 }]}
                >
                  {/* Change the Text based on whether the item is in the cart */}
                  {cartItems.some(
                    (cartItem) => cartItem.productId === item._id
                  ) ? (
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: SIZES.medium,
                        color: COLORS.lightWhite,
                        marginLeft: SIZES.small,
                      }}
                      onPress={() => navigation.navigate("Cart")}
                    >
                      GO TO CART
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: SIZES.medium,
                        color: COLORS.lightWhite,
                        marginLeft: SIZES.small,
                      }}
                    >
                      ADD TO CART
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Toast
            visible={toastMessage !== null}
            // position={Toast.positions.BOTTOM}
            shadow={false}
            animation={true}
            hideOnPress={true}
          >
            {toastMessage}
          </Toast>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
