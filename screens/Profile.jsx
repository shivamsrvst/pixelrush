import { View, Image, Text, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import styles from "./profile.style"
import { COLORS } from "../constants"
import { AntDesign,MaterialCommunityIcons,SimpleLineIcons } from "@expo/vector-icons"
import { ScrollView } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { resetCart } from "../context/actions/cartActions"
import { useDispatch } from "react-redux"

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const dispatch=useDispatch();
  
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
        
      }else{
        navigation.navigate('Login');
      }

      
    } catch (error) {
      console.log("Error retrieving the data",error);
      
    }
  }

  const userLogout=async()=>{
    const id=await AsyncStorage.getItem('id')
    const userId=`user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId,'id']);
      dispatch(resetCart());
      navigation.replace('Bottom Navigation')
      

    } catch (error) {
      console.log("Error retrieving the data",error);

      
    }

  }
  const cacheClear=async()=>{
    const id=await AsyncStorage.getItem('id')
    const userId=`favorites${JSON.parse(id)}`;
    try {
      await AsyncStorage.removeItem(userId);
      navigation.replace('Bottom Navigation')
      

    } catch (error) {
      console.log("Error retrieving the data",error);

      
    }

  }

  const clearCache=()=>{
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear the cache? This action will remove temporary data and may impact app performance temporarily.",
      [
        {
          text:"Cancel",onPress:()=>console.log("Cancel Pressed"), style:"cancel"

        },
        {
          text:"Continue",onPress:()=>cacheClear(), style:"destructive"
          
        },
       
      ]


    )
  }
  const deleteAccount=()=>{
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone, and all your data will be permanently lost.",
      [
        {
          text:"Cancel",onPress:()=>console.log("Cancel Pressed"), style:"cancel"

        },
        {
          text:"Continue",onPress:()=>console.log("Continue Pressed"), style:"destructive"
          
        },
       
      ]


    )
  }
  const logout=()=>{
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text:"Cancel",onPress:()=>console.log("Cancel Pressed"), style:"cancel"

        },
        {
          text:"Logout",onPress:()=>userLogout(),  style:"destructive"
          
        },
       
      ]


    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={styles.container}>
        <View style={{ width: '100%', marginTop: -StatusBar.currentHeight }}>
          <Image
            source={require('../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image 
          source={require("../assets/images/profile.jpeg")}
          style={styles.profile}
          />

          <Text style={styles.name}>
            {userLogin===true?userData.username:"Please login into your account"}
          </Text>


          {userLogin===false?(
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <View style={styles.loginBtn}>

                <Text style={styles.menuText}>   L O G I N   </Text>


              </View>

            </TouchableOpacity>
          ):(
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
                

            </View>
          )}

          {userLogin===false?(
            <View>

            </View>

          ):(
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.menuWrapper}>
              <Pressable onPress={()=>navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons 
                  name="heart-outline"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Wishlist</Text>
                </View>


              </Pressable>
              <Pressable onPress={()=>navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons 
                  name="truck-delivery-outline"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>


              </Pressable>
              <Pressable onPress={()=>navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons 
                  name="bag"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>


              </Pressable>
              <Pressable onPress={()=>clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons 
                  name="cached"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>


              </Pressable>
              <Pressable onPress={()=>deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign 
                  name="deleteuser"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>


              </Pressable>
              <Pressable onPress={()=>logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign 
                  name="logout"
                  size={24}
                  color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>


              </Pressable>



            </View>
            </ScrollView>

          )}

        </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
