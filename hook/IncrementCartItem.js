import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { incrementCartItem } from "../context/actions/cartActions";


const IncrementCartItem = async (userId, productId,dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = `${BACKEND_URL}/api/cart/increment`;

    const data = {
      userId: userId,
      cartItem: productId,
    };

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };

    await axios.put(endpoint, data, { headers });
    
    dispatch(incrementCartItem(productId));
    console.log("Increment_CART_ITEM action dispatched");
  } catch (error) {
    // Handle errors here
    console.log(error);
  }
};

export default IncrementCartItem;

