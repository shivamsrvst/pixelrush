import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { addToCart } from "../context/actions/cartActions";

const AddToCart = async (productId, quantity, dispatch) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endpoint = `${BACKEND_URL}/api/cart/`;
      
      const data = {
        cartItem: productId,
        quantity: quantity
      };
  
      const headers = {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + JSON.parse(token)
      };
  
      const response = await axios.post(endpoint, data, { headers });
      console.log('Full Backend Response:', response.data);
  
      if (response.data && response.data.products) {
        response.data.products.forEach(product => {
          const { _id: cartItemId, cartItem, quantity } = product;
          const { _id: productId, title, imageUrl, price } = cartItem;
          dispatch(addToCart({ productId, quantity, cartItemId, title, imageUrl, price }));
        });
      } else {
        console.log("No Products Yet");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default AddToCart;
  