import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./productDetails.style";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addToCart from "../hook/addToCart";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";



const ProductDetails = ({ navigation }) => {
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(false);

  const route = useRoute();
  const { item, isUpcoming } = route.params;

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  useEffect(() => {
    checkUser();
    checkFavorites();
  }, []);

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (id !== null) {
        setIsLoggedIn(true);
      } else {
        console.log("User not logged in");
      }
    } catch (error) {}
  };

  const createCheckout = async () => {
    const id = await AsyncStorage.getItem("id");
    const response = await fetch(
      "https://stripe-server-production-531f.up.railway.app/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(id),
          cartItems: [
            {
              name: item.title,
              id: item._id,
              price: item.price,
              cartQuantity: count,
            },
          ],
        }),
      }
    );
    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };

  const handlePress = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      addToFavorites();
    }
  };
  const handleCart = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      addToCart(item._id, count);
    }
  };
  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      createCheckout();
    }
  };
  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location,
    };
    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        console.log("Deleted");
        setFavorites(false);
      } else {
        favoritesObj[productId] = productObj;
        console.log("Added to favorites");
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };
  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    console.log(favoritesId);
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          console.log(item._id);
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>

            {!item.labels.includes("Upcoming") && (
              <TouchableOpacity onPress={() => handlePress()}>
                <Ionicons
                  name={favorites ? "heart" : "heart-outline"}
                  size={30}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />

          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.priceWrapper}>
                <Text style={styles.price}>$ {item.price}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={24}
                    color={isUpcoming ? "gray" : "gold"}
                  />
                ))}
                {isUpcoming ? (
                  <></>
                ) : (
                  <Text style={styles.ratingText}> (4.9)</Text>
                )}
              </View>
              {isUpcoming ? (
                <Text
                  style={[styles.rating, { fontSize: 15, fontWeight: "bold" }]}
                >
                  (Expected)
                </Text>
              ) : (
                <View style={styles.rating}>
                  <Pressable onPress={() => increment()}>
                    <SimpleLineIcons name="plus" size={20} />
                  </Pressable>
                  <Text style={styles.ratingText}>{count}</Text>

                  <Pressable onPress={() => decrement()}>
                    <SimpleLineIcons name="minus" size={20} />
                  </Pressable>
                </View>
              )}
            </View>

            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descText}>{item.description}</Text>
            </View>
            {isUpcoming ? (
              <></>
            ) : (
              <View style={{ marginBottom: SIZES.small }}>
                <View style={styles.location}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location-outline" size={20} />
                    <Text> {item.product_location}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={20}
                    />
                    <Text> Free Delivery</Text>
                  </View>
                </View>
              </View>
            )}

            {isUpcoming ? (
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.upcomingUrl)}
                  style={styles.cartBtn}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.medium,
                      color: COLORS.lightWhite,
                      marginLeft: SIZES.small,
                    }}
                  >
                    Discover More..
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => handleBuy()}
                  style={styles.cartBtn}
                >
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.medium,
                      color: COLORS.lightWhite,
                      marginLeft: SIZES.small,
                    }}
                  >
                    BUY NOW
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCart()}
                  style={styles.addCart}
                >
                  <Fontisto
                    name="shopping-bag"
                    size={22}
                    color={COLORS.lightWhite}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
