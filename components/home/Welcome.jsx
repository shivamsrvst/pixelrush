import { View, Text, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import styles from "./welcome.style"
import { COLORS,SIZES } from "../../constants"
// import { TextInput,  } from "react-native-gesture-handler"
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
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>

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
          <TouchableOpacity
          style={styles.searchBtn}
          onPress={()=>{}}
          >
            <Ionicons 
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.offwhite}
            />

          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

export default Welcome