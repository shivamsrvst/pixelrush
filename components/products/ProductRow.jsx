// ProductRow.js
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
const ProductRow = ({ category, label,products }) => {

  const filteredProducts = products.filter((product) => {
    return product.category === category && product.labels.some((productLabel) => label.includes(productLabel));
  });

  return (
    <View style={{ marginTop: SIZES.medium, marginLeft: 12 }}>
      {filteredProducts.length === 0 ? (
        <Text>No products found</Text>
      ) : (
        <FlatList
          data={filteredProducts.slice(0, 6)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCardView item={item} isUpcoming={label.includes('Upcoming')} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
