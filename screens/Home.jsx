import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Fontisto, Ionicons } from "@expo/vector-icons"
import styles from "./home.style"
import { ScrollView } from "react-native-gesture-handler"
import { Welcome } from "../components"
import Carousel from "../components/home/Carousel"
import Headings from "../components/home/Headings"
import ProductRow from "../components/products/ProductRow"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const Home = () => {
  const navigation=useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(()=>{
    checkExistingUser();

  },[]);

  const checkExistingUser=async()=>{
    const id=await AsyncStorage.getItem('id')
    const useId=`user${JSON.parse(id)}`;
    try {
      const currentUser=await AsyncStorage.getItem(useId);

      if (currentUser!==null) {
        const parsedData=JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
        
      }

      
    } catch (error) {
      console.log("Error retrieving the data",error);
      
    }
  }
  const sections = [
    { title: "Game On!", category: "Console", label: "Top Selling" },
    { title: "Best Sellers", category: "Game", label: "Top Selling" },
    { title: "Upcoming Titles", category: "Game", label: "Upcoming" },
    { title: "Classic Titles", category: "Game", label: "Classic" },
  ];


  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>{userData?userData.location:'Varanasi India'}</Text>

          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView >
        <Welcome />
        <Carousel />
        {sections.map((section, index) => (
        <React.Fragment key={index}>
          <Headings {...section} />
          <ProductRow {...section} />
        </React.Fragment>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home