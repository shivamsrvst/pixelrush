import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import { Button, CartCard, CouponCodeSection, EmptyCart, NotLoggedIn, PricingSection } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import styles from "./cart.style";
import { calculateTotalAmount } from "../components/cart/cartUtils";
import AppBar from "../components/cart/AppBar";
import { addToCart } from "../context/actions/cartActions";

const Cart = ({ navigation }) => {
  const { data, loader, error, refetch } = fetchCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch=useDispatch();
  console.log("Cart Items from Backend:",data);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");   
      if (id !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);


  useEffect(() => {
      refetch();

  }, [cartItems]);

  useEffect(()=>{

  },[cartItems]);

  console.log("Cart Items from Redux:",cartItems);

  

  const applyCouponCode = (code) => {
    if (code === "GAME20") {
      const discountAmount = calculateTotalAmount(cartItems).totalAmount * 0.2;
      setDiscount(discountAmount);
      setIsCouponApplied(true);
    } else {
      console.log("Invalid coupon code");
      setDiscount(0);
    }
  };

  const clearCoupon = () => {
    setDiscount(0);
    setIsCouponApplied(false);
  };



  const renderContent = () => {
    if (loader || loadingData) {
      return <ActivityIndicator />;
    } 
    else if(!isLoggedIn) {
      return (
      <>
      <AppBar/>
      <NotLoggedIn/>
        </>
      );
    }
    else if  (!cartItems || cartItems.length === 0) {
      return (
        <>
        <AppBar/>
        <EmptyCart/>
        </>
      );
    } else {
      return (
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartItemId}
            renderItem={({ item }) => <CartCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
             <AppBar/>
            }
            ListFooterComponent={
              <>
                <CouponCodeSection cartData={cartItems} applyCouponCode={applyCouponCode} clearCoupon={clearCoupon} isCouponApplied={isCouponApplied} />
                <PricingSection cartData={cartItems} discount={discount} isCouponApplied={isCouponApplied} />
                <Button
                  loader={false}
                  title="Checkout"
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                />
              </>
            }
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default Cart;
