// components/ProductCard.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SIZES,COLORS } from "../../constants";

const ProductCard = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Qty: {product.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
    backgroundColor:COLORS.offwhite,
    padding:SIZES.xSmall-3,
    borderRadius:SIZES.small
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.medium,
  },
  details: {
    marginBottom:25,
    marginLeft: SIZES.xSmall-2,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 1,
    color:COLORS.primary
  },
  price: {
    fontSize: 13,
    fontWeight:'bold',
    marginBottom: 1,
    color:COLORS.primary

  },
  quantity: {
    fontSize: 11,
    fontWeight:'bold'
  },
});

export default ProductCard;
