import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS, SIZES } from "../constants"
import { useNavigation } from "@react-navigation/native"

const ForgotSuccess = () => {
  const navigation=useNavigation();
  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
    <View>
      <Image
        source={require("../assets/images/Email.png")}
        style={styles.cover}
      />
      <Text style={styles.text}>Password reset instructions have been sent to your email.</Text>
      <Text style={[styles.text,{fontSize:16,marginTop:-10,color:"gray"}]}>Please check your inbox and follow the instructions provided in the email to complete the password reset process.</Text>
      <Text style={[styles.text,{fontSize:11,marginTop:-10,color:"red"}]}>For your security, ensure that the email is from a trusted source and avoid sharing your passwords with anyone. If you encounter any issues or have questions, please contact our support team at info@pixelrush.com.</Text>
      <TouchableOpacity
          style={styles.button}
          onPress={()=> navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>
           Login Now
          </Text>
        </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

export default ForgotSuccess

const styles = StyleSheet.create({
    cover: {
        height: SIZES.height / 4.8,
        width: SIZES.width - 60,
        resizeMode: "contain",
        marginTop: SIZES.xxLarge,
      },
      text: {
        textAlign:"center",
        fontSize: 28,
        marginVertical: 20,
        fontWeight:"bold",
        color:"#333333"
      },
      button: {
        width: '50%',
        height: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        alignSelf:"center"
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})