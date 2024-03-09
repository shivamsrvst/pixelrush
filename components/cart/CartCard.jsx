import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState} from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import styles from "../../screens/cart.style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import DecrementCartItem from "../../hook/DecrementCartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import DeleteCartItem from "../../hook/DeleteCartItem";
import { decrementCartItem, deleteCartItem } from "../../context/actions/cartActions";



const CartCard = ({ item, onPress, select }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  // console.log(item);
  // console.log(cartItems);

  const handleCartItemRemoval = async () => {
    try {
      const cartItemId = item.cartItemId;
      console.log("Removing cart item with ID:", cartItemId);
      await DeleteCartItem(cartItemId,dispatch)
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemDecrement = async () => {
    try {
      const productId = item.productId;
      // console.log("This is the Carts id", productId);
  
      const userId = (await AsyncStorage.getItem("id"))?.replace(/"/g, "");
      // console.log(userId);

      await DecrementCartItem(userId, productId,dispatch);

    } catch (error) {
      console.log(error);
      // Handle errors here
    }
  };
  const reduxItem = cartItems.find(cartItem => cartItem.cartItemId === item._id);
  // console.log("selected",reduxItem);
  
  return (
    
      <TouchableOpacity
        style={styles.favContainer(!select ? "#FFF" : COLORS.secondary)}
        onPress={handleCartItemRemoval}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTxt} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.priceQuantity}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>{" "}
            * {item.quantity}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleItemDecrement}
        >
          <AntDesign name="delete" size={18} color={COLORS.red} />
        </TouchableOpacity>
      </TouchableOpacity>
    
  );
};

export default CartCard;
