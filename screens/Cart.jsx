import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import { Button, CartCard, CouponCodeSection, EmptyCart, PricingSection } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import styles from "./cart.style";
import { calculateTotalAmount } from "../components/cart/cartUtils";

const Cart = ({ navigation }) => {
  const { data, loader, error, refetch } = fetchCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items from Backend",data);
  console.log("Cart Items from Redux",cartItems);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
      console.log("refetch called");
    }
  }, [cartItems]);

  

  const applyCouponCode = (code) => {
    if (code === "GAME20") {
      const discountAmount = calculateTotalAmount(data).totalAmount * 0.2;
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

  const renderContent = () => {
    if (loader) {
      return <ActivityIndicator />;
    } else if  (!data || data.length === 0) {
      return (
        <>
        <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Cart</Text>
      </View>
        <EmptyCart />
        </>
      );
    } else if (isLoggedIn) {
      return (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <CartCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View style={styles.titleRow}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text style={styles.titletxt}>Cart</Text>
                </View>
              </>
            }
            ListFooterComponent={
              <>
                <CouponCodeSection cartData={data} applyCouponCode={applyCouponCode} clearCoupon={clearCoupon} isCouponApplied={isCouponApplied} />
                <PricingSection cartData={data} discount={discount} isCouponApplied={isCouponApplied} />
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
    } else {
      return (
        <View>
          <Text>Please Log In to view your cart.</Text>
          <Button
            loader={false}
            title="Log In"
            onPress={() => {
              navigation.navigate("Login");
            }}
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
