import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./allProducts.style"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants"
import { ProductList } from "../components"
import { useRoute } from "@react-navigation/native"

const AllProducts = ({route}) => {
    const { category, label,title,isUpcoming } = route.params;
    const navigation=useNavigation();

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.wrapper}>
        <View style={styles.upperRow}>

        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
        </Pressable>

        <Text style={styles.heading}>
            {title}
        </Text>

        </View>
        <ProductList category={category} label={label} isUpcoming={isUpcoming}/>

     </View>
    </SafeAreaView>
  )
}

export default AllProducts
