import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

import React from 'react'
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const AppBar = ({title}) => {
  const navigation=useNavigation();
  return (
    <View style={styles.titleRow}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
    </TouchableOpacity>
    <Text style={styles.titletxt}>{title}</Text>
  </View>
  )
}

export default AppBar

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: SIZES.width - 50,
        marginBottom: 12,
      },
      titletxt: {
        fontFamily: "bold",
        fontSize: SIZES.xLarge,
        letterSpacing: 4,
        marginLeft: SIZES.small,
      },
})