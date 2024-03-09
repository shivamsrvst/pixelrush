// actions/productsActions.js
import axios from 'axios';
import { BACKEND_URL } from "../../config";

export const fetchProductsRequest = () => ({
  type: 'FETCH_PRODUCTS_REQUEST',
});

export const fetchProductsSuccess = (products) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: 'FETCH_PRODUCTS_FAILURE',
  payload: {
    message: error.message, // Extract the relevant error message
    // Add other relevant error details if needed, e.g., error.code 
  } 
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());

    try {
      // Replace the URL with your actual endpoint
      const response = await axios.get(`${BACKEND_URL}/api/products/`);
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error));
    }
  };
};
