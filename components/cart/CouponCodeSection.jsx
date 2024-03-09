import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./coupon.style";
import { calculateTotalAmount } from "./cartUtils";

const CouponCodeSection = ({
  cartData,
  applyCouponCode,
  clearCoupon,
  isCouponApplied,
}) => {
  const [couponCodeEntered, setCouponCodeEntered] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const checkCouponValidity = (couponCode) => {
    // List of valid coupon codes
    const validCouponCodes = ["GAME20", "SALE10", "DISCOUNT50"]; // Add your valid coupon codes here

    // Check if the entered coupon code exists in the list of valid coupon codes
    return validCouponCodes.includes(couponCode);
  };

  const handleApplyCoupon = () => {
    if (checkCouponValidity(couponCodeEntered)) {
      applyCouponCode(couponCodeEntered);
      setAppliedCoupon(couponCodeEntered);
      setCouponCodeEntered(""); // Clear the input
      setInvalidCoupon(false);
    } else {
      setInvalidCoupon(true); // Set flag for invalid coupon code
    }
  };

  const handleClearCoupon = () => {
    clearCoupon();
    setAppliedCoupon(""); // Clear the applied coupon
    setInvalidCoupon(false);
  };

  const isButtonDisabled = couponCodeEntered === "" && !appliedCoupon;

  return (
    <View style={styles.couponSectionContainer}>
      <View style={styles.couponSection}>
      <TextInput
  style={[styles.couponInput, invalidCoupon && styles.invalidCouponInput]} // Apply styles for invalid coupon
  placeholder="Enter Coupon Code"
  value={appliedCoupon || couponCodeEntered}
  onChangeText={(text) => {
    setCouponCodeEntered(text);
    setInvalidCoupon(false); // Reset invalid coupon flag on text change
  }}
  editable={!appliedCoupon} // Disable editing if coupon is applied
/>
        <TouchableOpacity
          style={[
            styles.applyButton,
            isButtonDisabled && styles.disabledButton,
          ]}
          onPress={appliedCoupon ? handleClearCoupon : handleApplyCoupon}
          disabled={isButtonDisabled} // Disable button if coupon input is empty
        >
          <Text style={styles.applyButtonText}>
            {appliedCoupon ? "Clear" : "Apply"}
          </Text>
        </TouchableOpacity>
      </View>
      {invalidCoupon && (
        <Text style={styles.invalidCouponText}>COUPON CODE '{couponCodeEntered}' INVALID</Text>
      )}
    </View>
  );
};

export default CouponCodeSection;
