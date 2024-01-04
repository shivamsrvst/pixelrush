import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from "../../screens/cart.style"
import { AntDesign } from "@expo/vector-icons"
import { COLORS } from "../../constants/theme"

const CartCard = ({item,onPress,select}) => {
  return (
    <TouchableOpacity style={styles.favContainer(!select?"#FFF":COLORS.secondary)}onPress={onPress}>
    <View style={styles.imageContainer}>
        <Image
        source={{uri:item.cartItem.imageUrl}}
        style={styles.image}
        
        />

    </View>
    <View style={styles.textContainer}>

        <Text style={styles.productTxt} numberOfLines={1}>{item.cartItem.title}</Text>
        <Text style={styles.supplier} numberOfLines={1}>{item.cartItem.supplier}</Text>
        <Text style={styles.supplier} numberOfLines={1}>${item.cartItem.price}  *  {item.quantity}</Text>

    </View>
    <TouchableOpacity
    style={{paddingBottom:20,paddingLeft:75}}
    onPress={()=>{}}
    >
    <AntDesign
    name="delete"
    size={18}
    color={COLORS.red}
    />


    </TouchableOpacity>


</TouchableOpacity>

  )
}

export default CartCard