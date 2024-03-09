import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../context/actions/cartActions";

const DeleteCartItem = async (cartItemId, dispatch) => {
  try {
    const userId = await AsyncStorage.getItem("id"); // Retrieve user ID

    const endpoint = `${BACKEND_URL}/api/cart/${cartItemId}`; // Corrected endpoint using cartItemId

    const token = await AsyncStorage.getItem("token"); // Retrieve authentication token

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };

    await axios.delete(endpoint, { headers }); // Send DELETE request

    dispatch(deleteCartItem(cartItemId)); // Dispatch action to update Redux state
  } catch (error) {
    console.error("Error deleting cart item:", error);
    // Handle error appropriately, e.g., display an error message
  }
};

export default DeleteCartItem;
