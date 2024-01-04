import { View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import React from 'react'
import styles  from "./productCardView.style"
import { Ionicons,Fontisto } from "@expo/vector-icons"
import { COLORS, SIZES } from "../../constants"
import { useNavigation } from "@react-navigation/native"


const ProductCardView = ({item,isUpcoming}) => {

  const navigation=useNavigation();


  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item ,isUpcoming})}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.publisher}
          </Text>
          {isUpcoming ? (
            <Text style={styles.price} numberOfLines={1}>
              See Details
            </Text>
          ) : (
            <Text style={styles.price} numberOfLines={1}>
              ${item.price}
            </Text>
          )}
        </View>

        {isUpcoming ? (
          <View style={styles.addBtn}>
            <TouchableOpacity onPress={()=>Linking.openURL(item.upcomingUrl)}>
              <Ionicons name="globe" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addBtn}>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ProductCardView