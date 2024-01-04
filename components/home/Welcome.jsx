import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from "./welcome.style"
import { COLORS,SIZES } from "../../constants"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { Feather, Ionicons, } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"



const Welcome = () => {
  const navigation=useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text
          style={styles.welcomeTxt(
            "#b44182",
            SIZES.xSmall,
            SIZES.xxLarge - 5
          )}
        >
          {" "}
          Gear Up For
        </Text>
        <Text style={styles.welcomeTxt("#4b6fe8", 0, SIZES.xxLarge - 5)}>
          {" "}
          Gaming Glory 
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Pressable>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </Pressable>

        <View style={styles.searchWrapper}>

          <TextInput 
          style={styles.searchInput}
          value=""
          // onPressIn={()=> navigation.navigate("Search")}
          onFocus={()=>{ navigation.navigate("Search") }}
          placeholder="What are you looking for"
          />

        </View>

        <View>
          <Pressable
          style={styles.searchBtn}
          onPress={()=>{}}
          >
            <Ionicons 
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.offwhite}
            />

          </Pressable>
        </View>
      </View>


    </View>
  );
}

export default Welcome