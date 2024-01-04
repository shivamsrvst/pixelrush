import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";

const addToCart=async(productId,quantity)=>{
    try {
        const token=await AsyncStorage.getItem('token');
        const endpoint=`${BACKEND_URL}/api/cart/`;
        console.log(token);

        const data={
            cartItem:productId,
            quantity:quantity
        }

        const headers={
            'Content-Type':'application/json',
            'token':'Bearer '+JSON.parse(token)
        };
        await axios.post(endpoint,data,{headers})

    } catch (error) {
        throw new Error(error.message);
    }


}

export default addToCart;