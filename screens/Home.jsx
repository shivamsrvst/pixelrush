import { View, Text,TouchableOpacity, ActivityIndicator } from 'react-native'
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
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../context/actions/productsActions"
import { COLORS, SIZES } from "../constants"


const Home = () => {
  const navigation=useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const dispatch = useDispatch();


  const { products, loading, error } = useSelector((state) => state.products);
  // console.log(products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  useEffect(()=>{
    checkExistingUser();

  },[]);

  const checkExistingUser=async()=>{
    const id=await AsyncStorage.getItem('id')
    const userId=`user${JSON.parse(id)}`;
    try {
      const currentUser=await AsyncStorage.getItem(userId);

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
          <Text style={styles.location}>{userData ? userData.location : 'Varanasi India'}</Text>
  
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
  
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  
      {loading ? (
              <View style={[styles.loadingContainer, { flex: 1 }]}>
              <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
            </View>
      ) : error ? (
        <Text>Something Went Wrong {error.message}</Text>
      ) : (
        <ScrollView>
          <Welcome />
          <Carousel />
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <Headings {...section} />
              <ProductRow {...section} products={products} />
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
  
}

export default Home