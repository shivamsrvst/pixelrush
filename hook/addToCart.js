import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { addToCart } from "../context/actions/cartActions";


const AddToCart=async(productId,quantity,dispatch)=>{
    try {
        const token=await AsyncStorage.getItem('token');
        const endpoint=`${BACKEND_URL}/api/cart/`;
        // console.log(token);

        const data={
            cartItem:productId,
            quantity:quantity
        }

        const headers={
            'Content-Type':'application/json',
            'token':'Bearer '+JSON.parse(token)
        };
        const response = await axios.post(endpoint, data, { headers });
        console.log('Full Backend Response:', response.data);
        // const cartItemId = response.data.products[0]._id;
        // console.log(cartItemId);
        // const cartItemId="65eb5e0abf78b074f75000a2"
        if (response.data) {
            const existingCartItemIds = []; 
        
            response.data.products.forEach(product => {
                if (!existingCartItemIds.includes(product._id)) { 
                    existingCartItemIds.push(product._id); // Add ID to the array
                    // const newlyAddedCartItemId = product._id; 
                    // console.log('Newly Added Cart Item ID:', newlyAddedCartItemId);
                }
            });
            //  console.log('existingCartItemIds:', existingCartItemIds)
             const n=existingCartItemIds.length;
             if(n>0){

                //  console.log("new cartItemId:",existingCartItemIds[n-1]);
                 const cartItemId=existingCartItemIds[n-1];
                 dispatch(addToCart({ productId, quantity,cartItemId}));
             }else{
                console.log("No Products Yet");
             }

        } else {
            // ... error handling ...
        }
    




    } catch (error) {
        throw new Error(error.message);
    }


}

export default AddToCart;