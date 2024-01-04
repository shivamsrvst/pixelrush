import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const useFetch = () => {

    const [data,setData]=useState([]);
    const [isloading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    const fetchData = async () => {
      setIsLoading(true);
    
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(()=>{

      fetchData();
    },[]);

    const refetch = ()=>{
      setIsLoading(true)
      fetchData();

    }


  return {filteredData:data,isloading,error,refetch}

}

export default useFetch