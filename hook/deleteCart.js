import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";

const deleteCart = async (userId) => {
  try {
    console.log("Entereing the delete cart hook along with userId:",userId);
    const token = await AsyncStorage.getItem("token");
    const endpoint = `${BACKEND_URL}/api/cart/delete/${userId}`;

    const headers = {
      'Content-Type': 'application/json',
      'token': 'Bearer ' + JSON.parse(token),
    };

    await axios.delete(endpoint, { headers });
    console.log("Cart deleted successfully");
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export default deleteCart;
