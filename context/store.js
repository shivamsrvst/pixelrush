// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
