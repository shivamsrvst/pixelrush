import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "./headings.style"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../../constants"
import { useNavigation } from "@react-navigation/native"

const Headings = ({ title, category, label }) => {

  const navigation=useNavigation();

  const isUpcoming = label.includes('Upcoming');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("AllProducts",{category,label,title,isUpcoming}) }>
            <Ionicons
            name="grid"
            size={24}
            color={COLORS.primary}
            />

        </TouchableOpacity>


      </View>
    </View>
  )
}

export default Headings