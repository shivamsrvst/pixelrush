import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./allProducts.style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import { ProductList } from "../components";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AllProducts = ({ route }) => {
  const { category, label, title, isUpcoming } = route.params;
  const navigation = useNavigation();
  const isItemAddLoading = useSelector((state) => state.ui.isLoading);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>{title}</Text>
        </View>
        <ProductList
          category={category}
          label={label}
          isUpcoming={isUpcoming}
        />
        {isItemAddLoading && (
          <View style={[styles.itemLoadingContainer, { flex: 1 }]}>
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.tertiary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllProducts;
