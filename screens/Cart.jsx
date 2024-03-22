import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import { Button, CartCard, CouponCodeSection, EmptyState, NotLoggedIn, PricingSection } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./cart.style";
import { calculateTotalAmount } from "../components/cart/cartUtils";
import AppBar from "../components/cart/AppBar";
import { addToCart, resetCart } from "../context/actions/cartActions";
import Toast from "react-native-root-toast";
import WebView from "react-native-webview";

const Cart = ({ navigation }) => {
  const { data, loader, error, refetch } = fetchCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch=useDispatch();
  console.log("Cart Items from Backend:(CartScreen):",data);
  console.log("Cart Items from Redux(CartScreen):",cartItems);
  const toastMessage = useSelector((state) => state.ui.toastMessage);

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


  console.log("Is User Currently Logged in:",isLoggedIn);
  

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
        <AppBar title="Cart"/>
        <EmptyState title="Oops..!! Your Cart Is Empty"/>
        </>
      );
    }else {
      return (
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartItemId}
            renderItem={({ item }) => <CartCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
             <AppBar title="Cart"/>
            }
            ListFooterComponent={
              <>
                <CouponCodeSection cartData={cartItems} applyCouponCode={applyCouponCode} clearCoupon={clearCoupon} isCouponApplied={isCouponApplied} />
                <PricingSection cartData={cartItems} discount={discount} isCouponApplied={isCouponApplied} />
                <Button
                  loader={false}
                  title="Proceed To Checkout"
                  onPress={() => navigation.navigate("Checkout", { cartItems, discount })}
                />
              </>
            }
          />
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default Cart;
