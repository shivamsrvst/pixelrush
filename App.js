import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback,forwardRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  AllProducts,
  Cart,
  Favourites,
  LoginPage,
  NewArrivals,
  Orders,
  ProductDetails,
  SignUp,
} from "./screens";
import { Provider } from "react-redux";
import store from "./context/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex:1}}>
          <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllProducts"
            component={AllProducts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favourites"
            component={Favourites}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

      </Provider>
    </NavigationContainer>

    </GestureHandlerRootView>

  );
}
