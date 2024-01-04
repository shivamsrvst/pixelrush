import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES } from "../../constants";
import styles from "./ProductList.style";
import ProductCardView from "./ProductCardView";
import { useRoute } from "@react-navigation/native";

const ProductList = ({category,label,isUpcoming}) => {
    const{filteredData,isloading,error}=useFetch();
    if (!Array.isArray(filteredData)) return null; // Handle initial state
    const filteredProducts = filteredData.filter((product) => {
      return product.category === category && product.labels.some((productLabel) => label.includes(productLabel));
    });
  

    if(isloading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator 
                size={SIZES.xxLarge}
                color={COLORS.primary}
                />
            </View>

        );
    }
    return(
        <View style={styles.container}>
            <FlatList 
            data={filteredProducts}
            numColumns={2}
            renderItem={({item}) =>(<ProductCardView item={item} isUpcoming={isUpcoming}/>)}
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={()=> <View style={styles.separator} />}

        />

        </View>
    )
    
}

export default ProductList

