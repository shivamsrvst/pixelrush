// Search.jsx

import { View, Text, TextInput, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { SearchTile } from "../components";
import { BACKEND_URL } from "../config";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Implement a debounce function to avoid making too many requests while typing
    const debounceSearch = setTimeout(() => {
      // Check if searchKey is not empty before making the API call
      if (searchKey.trim() !== "") {
        handleSearch();
      } else {
        // If searchKey is empty, clear the search results
        setSearchResults([]);
      }
    }, 300); // Adjust the delay according to your preference

    return () => clearTimeout(debounceSearch);
  }, [searchKey]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/search/${searchKey}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get Products", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            placeholder="What are you looking for"
            autoFocus
          />
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require('../assets/images/Pose23.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
