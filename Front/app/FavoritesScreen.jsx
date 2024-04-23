import React from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";

// contains stylesheets
import styles from "../constants/styles";

// temporary data set
const DATA = [
  {
    id: '2',
    name: '2023 Jeep Wrangler Rubicon',
    favorite: true
  }
];

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>CarWise</Text>

      <TextInput style={styles.searchInput}
        placeholder="Search" />


      <View>
        <Text style={styles.headerText}>Favorites</Text>
      </View>


      {/* list favorite cars */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Recommended</Text>
      </View>



    </View>
  );
};



export default FavoritesScreen;
