import { combineReducers, configureStore,} from "@reduxjs/toolkit";
import { persistStore, persistReducer,  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',  
  storage: AsyncStorage, 
  whitelist: ['cart'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store); 

export { store, persistor };
