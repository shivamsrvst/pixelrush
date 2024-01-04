import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import fetchCart from "../hook/fetchCart";
import { Button, CartCard } from "../components";

const Cart = ({ navigation }) => {
  const { data, loader, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

  // console.log("Cart Data:", data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Cart</Text>
      </View>
      {loader ? (
        <ActivityIndicator />
      ) : !data ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartCard
              item={item}
              onPress={() => {
                setSelect(!select), setSelected(item);
              }}
              select={select}
            />
          )}
        />
      )}

      {select === false ? (
        <View></View>
      ) : (
        <Button
          title={"Checkout"}
          isValid={select}
          onPress={() => {}}
          loader={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;
