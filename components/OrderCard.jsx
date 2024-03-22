// components/OrderCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
import ProductCard from "./products/ProductCard";

const OrderCard = ({ order }) => {
  console.log("Order From the products Array:",order.products);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Format date as "Day Month Date Year"
  };
  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <Text style={styles.dateTime}>Placed on: {formatDate(order.createdAt)}</Text>
      <Text style={styles.sectionTitle}>Products:</Text>
      {order.products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      <Text style={styles.status}>PaymentStatus: {order.paymentStatus}</Text>
      <View style={styles.statusamount}>
      <Text style={styles.status}>Delivery Status: {order.deliveryStatus}</Text>
      <Text style={styles.status}>Total: ${order.total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    borderRadius: SIZES.medium,
    elevation: 2,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color:COLORS.primary
  },
  dateTime: {
    fontSize: 12,
    fontWeight:"400",
    marginBottom: SIZES.xSmall-6,
    color:COLORS.gray
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: SIZES.xSmall-4,
  },
  status: {
    fontSize: 12,
    fontWeight:'bold',
    marginTop: SIZES.xSmall-6,
    color:COLORS.primary
  },
  statusamount:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default OrderCard;
