import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import styles from "./pricing.style";
import { calculateTotalAmount } from "./cartUtils";

const PricingSection = ({ cartData, discount }) => {
  const pricingDetails = calculateTotalAmount(cartData, discount);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.amount}>${pricingDetails.totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shipping Cost:</Text>
        <Text style={styles.amount}>${pricingDetails.shippingCost.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Discount:</Text>
        <Text style={styles.amount}>${pricingDetails.discount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>To Pay:</Text>
        <Text style={styles.amount}>${pricingDetails.finalTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}
export default PricingSection