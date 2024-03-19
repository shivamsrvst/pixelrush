import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import styles from "./home.style";
import { ScrollView } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Headings from "../components/home/Headings";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../context/actions/productsActions";
import { COLORS, SIZES } from "../constants";
import fetchCart from "../hook/fetchCart";
import { loadCartFromServer, resetCart } from "../context/actions/cartActions";
import Toast from "react-native-root-toast";

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const { data, loader, refetch } = fetchCart();
  const cartItems = useSelector((state) => state.cart.items);

  const cartQuantity = cartItems.length;
  const isItemAddLoading = useSelector((state) => state.ui.isLoading);
  const toastMessage = useSelector((state) => state.ui.toastMessage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        setUserData(null);
        setUserLogin(false);
        dispatch(resetCart());
      }
    } catch (error) {
      console.log("Error retrieving the data", error);
    }
  };

  const sections = [
    { title: "Game On!", category: "Console", label: "Top Selling" },
    { title: "Best Sellers", category: "Game", label: "Top Selling" },
    { title: "Upcoming Titles", category: "Game", label: "Upcoming" },
    { title: "Classic Titles", category: "Game", label: "Classic" },
  ];

  useEffect(() => {
    const checkAsync = async () => {
      const shouldFetchFromBackend =
        userLogin &&
        data &&
        data.length > 0 &&
        cartItems.length === 0 &&
        !initialFetchDone; // Check for BOTH conditions

      if (shouldFetchFromBackend) {
        const formattedData = data.map((item) => ({
          cartItemId: item._id,
          imageUrl: item.cartItem.imageUrl,
          price: item.cartItem.price,
          productId: item.cartItem._id,
          quantity: item.quantity,
          title: item.cartItem.title,
        }));
        console.log("This Fetch Cart Is Getting Executed ......(HomeScreen)");

        dispatch(loadCartFromServer(formattedData));
        setInitialFetchDone(true); // Prevent re-fetching on reloads
      } else {
        console.log("Using cart data from Redux persist(Home Screen)");
      }
    };

    checkAsync();
  }, [data, userLogin, initialFetchDone]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>
            {userData ? userData.location : "Varanasi India"}
          </Text>

          <View style={{ alignItems: "flex-end" }}>
            {cartQuantity > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>{cartQuantity}</Text>
              </View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Ionicons name="cart-outline" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isItemAddLoading && (
        <View style={[styles.itemLoadingContainer, { flex: 1 }]}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.tertiary} />
        </View>
      )}

      {toastMessage && (
        <View style={styles.toastContainer}>
          <Toast
            visible={toastMessage !== null}
            // position={Toast.positions.BOTTOM}
            shadow={false}
            animation={true}
            hideOnPress={true}
          >
            {toastMessage}
          </Toast>
         </View>
      )}

      {loading ? (
        <View style={[styles.loadingContainer, { flex: 1 }]}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      ) : error ? (
        <Text>Something Went Wrong {error.message}</Text>
      ) : (
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <Welcome />
          <Carousel />
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <Headings {...section} />
              <ProductRow {...section} products={products} />
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
