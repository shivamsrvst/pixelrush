import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from "../Button";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const NotLoggedIn = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Please Log In to view your cart.</Text>
    <Button
      loader={false}
      title="Log In"
      onPress={() => {
        navigation.navigate("Login");
      }}
      
      />
  </View>
  )
}

export default NotLoggedIn

const styles = StyleSheet.create({
    container: {
      marginBottom:90,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: SIZES.large,
      fontFamily: 'bold',
      color: COLORS.primary,
      textAlign: 'center',
    },
  });