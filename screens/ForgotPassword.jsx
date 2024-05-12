import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn } from "../components";
import { COLORS, SIZES } from "../constants";
import { BACKEND_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation=useNavigation();

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/forgotpassword`, { email });
      setLoading(false);
      if (response.status === 200) {
        // Password reset instructions successfully sent
        navigation.replace('ForgotSuccess');
      } else {
        // Something went wrong or failed to send reset email
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
      if (error.response && error.response.status === 404) {
        // Email not found in the database
        Alert.alert(
          'Account Not Found',
          'No account is associated with this email.',
          [
            {
              text: 'Create Account',
              onPress: () => navigation.navigate('Register'),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]
        );
      } else {
        // Handle other errors
        Alert.alert('Error', 'Network error. Please check your internet connection.');
      }
    }
  };
  

  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View>
        <BackBtn onPress={() => navigation.goBack()} />
        <Image
          source={require("../assets/images/ForgotPass.png")}
          style={styles.cover}
        />
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: !validateEmail(email) ? '#ccc' : COLORS.primary }]}
          onPress={handleForgotPassword}
          disabled={!validateEmail(email) || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Wait..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.8,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginTop: SIZES.xxLarge,
  },
  title: {
    textAlign:"center",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize:SIZES.medium
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
