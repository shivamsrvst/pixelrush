import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import styles from "../../screens/cart.style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import DecrementCartItem from "../../hook/DecrementCartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import DeleteCartItem from "../../hook/DeleteCartItem";
import IncrementCartItem from "../../hook/IncrementCartItem";
import {
  showLoading,
  showToast,
  hideLoading,
  hideToast,
} from "../../context/actions/uiActions";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import GestureHandlerRootView from "react-native-gesture-handler";

const CartCard = ({ item, onPress, select }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(item);
  // console.log(cartItems);
  const swipeableRef = useRef(null);

  const getDeliveryMessage = (title) => {
    const firstLetter = title.charAt(0).toUpperCase(); // Get the first letter and capitalize it
    if (firstLetter >= "A" && firstLetter <= "I") {
      return "Delivery in 2 Days";
    } else if (firstLetter >= "J" && firstLetter <= "R") {
      return "Delivery in 3 Days";
    } else {
      return "Delivery in 5 Days";
    }
  };

  const handleCartItemRemoval = async () => {
    try {
      const cartItemId = item.cartItemId;
      console.log("Removing cart item with ID:", cartItemId);
      await DeleteCartItem(cartItemId, dispatch);
      dispatch(showToast("Item deleted"));
      // You can also update the UI to change the icon here
      setTimeout(() => {
        dispatch(hideToast()); // Dispatch action to hide toast after a delay
      }, 3000);
    } catch (error) {
      console.error(error);
      // Show an error toast message
      dispatch(showToast("Error deleting the Item from the cart"));
      dispatch(hideLoading());
    }
  };

  const handleItemIncrement = async () => {
    try {
      const productId = item.productId;
      // console.log("This is the Carts id", productId);

      const userId = (await AsyncStorage.getItem("id"))?.replace(/"/g, "");
      // console.log(userId);

      await IncrementCartItem(userId, productId, dispatch);
    } catch (error) {
      console.log(error);
      // Handle errors here
    }
  };

  const handleItemDecrement = async () => {
    try {
      const productId = item.productId;
      // console.log("This is the Carts id", productId);

      const userId = (await AsyncStorage.getItem("id"))?.replace(/"/g, "");
      // console.log(userId);

      await DecrementCartItem(userId, productId, dispatch);
    } catch (error) {
      console.log(error);
      // Handle errors here
    }
  };

  const rightSwipeActions = () => {
    return (
      <View style={styles.swipeActions}>
        <TouchableOpacity>
          <Ionicons name="trash-bin-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  const swipeFromRightOpen = () => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      {
        text: "Cancel",
        onPress: () => {
          swipeableRef.current.close();
        },
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: handleCartItemRemoval,
        style: "destructive",
      },
    ]);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={() => swipeFromRightOpen()}
      style={styles.favContainer(!select ? "#FFF" : COLORS.secondary)}
    >
      <TouchableOpacity
        style={styles.favContainer(!select ? "#FFF" : COLORS.secondary)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTxt} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.priceQuantity}>
            <Text style={styles.price}>
              ${(item.quantity * item.price).toFixed(2)}
            </Text>
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {getDeliveryMessage(item.title)}
          </Text>
        </View>
        <View style={styles.quantityCounter}>
          <TouchableOpacity onPress={handleItemDecrement}>
            <AntDesign name="minus" size={18} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityCount}>{item.quantity}</Text>
          <TouchableOpacity onPress={handleItemIncrement}>
            <AntDesign name="plus" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CartCard;
