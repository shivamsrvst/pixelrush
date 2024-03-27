// screens/Orders.js
import React from "react";
import { SafeAreaView, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import AppBar from "../components/cart/AppBar";
import { COLORS, SIZES } from "../constants";
import OrderCard from "../components/OrderCard";
import fetchOrders from "../hook/fetchOrders";

const Orders = () => {
  const { data, loader, error, refetch } = fetchOrders();
  console.log("Data from the Orders:",data);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Orders" />
      {loader ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={{ padding: SIZES.padding }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    marginTop: 50,
    marginHorizontal: 20,
  },
});

export default Orders;
