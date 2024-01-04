// ProductRow.js

import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/useFetch';

const ProductRow = ({ category, label }) => {
  const { filteredData, isLoading, error } = useFetch();

  if (!Array.isArray(filteredData)) return null; // Handle initial state

  const filteredProducts = filteredData.filter((product) => {
    return product.category === category && product.labels.some((productLabel) => label.includes(productLabel));
  });

  return (
    <View style={{ marginTop: SIZES.medium, marginLeft: 12 }}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something Went Wrong</Text>
      ) : (
        <FlatList
          data={filteredProducts.slice(0,6)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} isUpcoming={label.includes("Upcoming")}  />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
          
        />
      )}
    </View>
  );
};

export default ProductRow;
