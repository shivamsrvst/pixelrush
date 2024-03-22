import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

const makeOrder= async(orderData)=>{

    try {
          const token = await AsyncStorage.getItem("token");
          const endpoint = `${BACKEND_URL}/api/orders`;
          const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + JSON.parse(token),
          };
          const response=await axios.post(endpoint, orderData, { headers });
          console.log("Response From the Order:",response.data);

        } catch (error) {
            console.log(error);

        } 

    
//   return { loading, error, success, placeOrder };
}

export default makeOrder;