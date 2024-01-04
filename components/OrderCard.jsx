import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons"
import styles from "../screens/cart.style"
import { COLORS } from "../constants"


const OrderCard = ({item}) => {
  return (
<TouchableOpacity style={styles.favContainer(COLORS.secondary)}>
    <View style={styles.imageContainer}>
        <Image
        source={{uri:item.productId.imageUrl}}
        style={styles.image}
        
        />

    </View>
    <View style={styles.textContainer}>

        <Text style={styles.productTxt} numberOfLines={1}>{item.productId.title}</Text>
        <Text style={styles.supplier} numberOfLines={1}>{item.productId.supplier}</Text>
        <Text style={styles.supplier} numberOfLines={1}>${item.productId.price}  *  {item.quantity}</Text>

    </View>
    <View
    style={{paddingHorizontal:30,backgroundColor:COLORS.lightWhite,borderRadius:12}}
    >
        <Text  style={styles.productTxt}>{item.payment_status.toUpperCase()}</Text>

    </View>


</TouchableOpacity>
  )
}

export default OrderCard
