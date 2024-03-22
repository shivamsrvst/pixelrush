import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

const fetchOrders = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);  // Set loader to true initially
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId= await AsyncStorage.getItem("id");

      const endpoint = `${BACKEND_URL}/api/orders/${userId}`;

      const headers = {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + JSON.parse(token),
      };

      const response = await axios.get(endpoint, { headers });
      setData(response.data);
      
    } catch (error) {
      setError(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoader(true);
    fetchData();
  }

  return { data, loader, error, refetch };
};

export default fetchOrders;
