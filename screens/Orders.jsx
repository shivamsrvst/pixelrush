import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { OrderCard } from "../components";
import fetchOrders from "../hook/fetchOrders";
const Orders = ({navigation}) => {
  
  const{data, loader, error, refetch }=fetchOrders();
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
        <Text style={styles.titletxt}>Orders</Text>
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
            <OrderCard
              item={item}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;
