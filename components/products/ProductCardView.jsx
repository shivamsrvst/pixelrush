import { View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import styles  from "./productCardView.style"
import { Ionicons,Fontisto,AntDesign,FontAwesome } from "@expo/vector-icons"
import { COLORS, SIZES } from "../../constants"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../context/actions/cartActions"
import AddToCart from "../../hook/AddToCart"


const ProductCardView = ({item,isUpcoming}) => {
  const navigation=useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch=useDispatch();
  const cartItems = useSelector(state => state.cart.items)
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (id !== null) {
        setIsLoggedIn(true);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {}
  };
  const handleAddToCart = async () => {
    try {
      // Check if the user is logged in
      if (!isLoggedIn) {
        // If not logged in, navigate to the login page
        navigation.navigate('Login');
        return;
      }
  
      // Check if the item is already in the cart
      const isInCart = cartItems.some((cartItem) => cartItem.productId === item._id);
      if (!isInCart) {
        await AddToCart(item._id, 1,dispatch);
        // Show a success toast message
        // You can also update the UI to change the icon here
        
      } else {
        // Item is already in the cart
        console.log('Item is already in the cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      // Show an error toast message

    }
  };
  

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item ,isUpcoming})}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.publisher}
          </Text>
          {isUpcoming ? (
            <Text style={styles.price} numberOfLines={1}>
              See Details
            </Text>
            
          ) : (
            <Text style={styles.price} numberOfLines={1}>
              ${item.price}
            </Text>
          )}
        </View>

        {!isUpcoming && (
          <View style={styles.addBtn}>
            <TouchableOpacity onPress={handleAddToCart}>
              {/* Change the icon based on whether the item is in the cart */}
              {cartItems.some((cartItem) => cartItem.productId === item._id) ? (
                <FontAwesome name="check-circle" size={35} color={COLORS.primary} />
              ) : (
                <Ionicons name="add-circle" size={35} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ProductCardView