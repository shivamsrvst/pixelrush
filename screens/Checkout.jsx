import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../components/cart/AppBar';
import { COLORS } from '../constants';
import styles from './checkout.style';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components";
import { calculateTotalAmount } from "../components/cart/cartUtils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import makeOrder from "../hook/makeOrder";
import deleteCart from "../hook/deleteCart";
import { resetCart } from "../context/actions/cartActions";

const Checkout = () => {
  const route=useRoute();
  const dispatch=useDispatch();
  const navigation=useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('payOnDelivery');
  const [userData, setUserData] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const {discount}=route.params;
  const pricingDetails = calculateTotalAmount(cartItems, discount);
  console.log("Total Amount to Pay:",pricingDetails.finalTotal.toFixed(2));
  console.log("Items Coming From Cart To Checkout",cartItems);

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const renderPaymentButton = () => {
    if (paymentMethod === 'payOnDelivery') {
      return (
        <TouchableOpacity style={styles.paymentButton} onPress={handlePlaceOrder}>
          <Text style={styles.paymentButtonText}>Place Order</Text>
        </TouchableOpacity>
      );
    } else if (paymentMethod === 'payOnline') {
      return (
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayOnline}>
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
  useEffect(()=>{
    checkExistingUser()
  },[])
  const generateOrderId = () => {
    const random = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    return random.toString(); // Convert the random number to string
  };

  const handlePlaceOrder = async () => {
    // Logic for placing order (pay on delivery)
    const orderData = {
      orderId: generateOrderId(), // You need to implement this function
      userId: userData ? userData._id : null,
      products: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
        title:item.title
         // Assuming you have imageUrl in your cartItems
      })),
      subtotal: pricingDetails.totalAmount,
      total: pricingDetails.finalTotal.toFixed(0),
      paymentStatus: 'pending',
      deliveryStatus: 'pending'
    };

    console.log("Order Data to be Sent To DataBase:",orderData);
    await makeOrder(orderData);
    await deleteCart(userData._id);
    dispatch(resetCart());
    navigation.navigate("Home")
    
  };

  const handlePayOnline = () => {
    // Logic for online payment
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Checkout" />
      <View style={styles.cardContainer}>
        <View style={styles.cardDelivery}>
          <Text style={styles.cardTitleDelivery}>Delivering To - {userData ? userData.location : "Varanasi India"}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Payment Method:</Text>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'payOnDelivery' && styles.selectedPayment]}
            onPress={() => handlePaymentMethod('payOnDelivery')}
          >
            <Text style={{fontWeight:'bold',fontSize:15}}>Pay on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'payOnline' && styles.selectedPayment]}
            onPress={() => handlePaymentMethod('payOnline')}
          >
            <Text style={{fontWeight:'bold',fontSize:15}}>Pay Online</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountLabel}>To Pay:</Text>
          <Text style={styles.totalAmount}>${pricingDetails.finalTotal.toFixed(0)}</Text>
        </View>
        {renderPaymentButton()}
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
