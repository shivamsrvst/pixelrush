// searchTile.jsx

import { Image, TouchableOpacity, View ,Text} from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import styles from "./searchTile.style";

const SearchTile = ({ item }) => {
  const navigation = useNavigation();

  const navigateToProductDetails = () => {
    // Assuming that 'labels' is an array of labels associated with the product
    const isUpcoming = item.labels && item.labels.includes("Upcoming");

    navigation.navigate("ProductDetails", { item, isUpcoming });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToProductDetails}>
      <View style={styles.image}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImg}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.supplier}>{item.publisher}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchTile;
