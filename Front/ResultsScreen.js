import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { useEffect, useState } from "react";

import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const ResultsScreen = ({ route, navigation }) => {
  const { params } = route.params;
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/search", params);
      setSearchResults1(response.data.cars);
      setSearchResults2(response.data.autotrader);
      console.log(response.data.cars);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getResults();
  }, []);

  const handleBookmark = async (item) => {
    try {
      await axios.post("http://localhost:3000/car/favorite", {
        type: item.type,
        model: item.model,
        price: item.price,
        distance: item.distance,
        carDealer: item.carDealer,
        url: item.imageUrl,
        source: item.source,
        year: item.year,
      });
      console.log("Item bookmarked:", item.model);
    } catch (error) {
      console.error("Error saving bookmark:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Searching for {JSON.stringify(params.model)}
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ScrollView>
            {searchResults1.map((item, index) => (
              <View key={index.toString()} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemText}>Model: {item.model}</Text>
                  <TouchableOpacity onPress={() => handleBookmark(item)}>
                    <Icon name="bookmark" size={20} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemText}>source: {item.source}</Text>
                <Text style={styles.itemText}>Price: {item.price}</Text>
                <Text style={styles.itemText}>type: {item.type}</Text>
                <Text style={styles.itemText}>Dealer: {item.carDealer}</Text>
                <Text style={styles.itemText}>Location: {item.distance}</Text>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
            ))}

            {searchResults2.map((item, index) => (
              <View key={index.toString()} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.itemText}>Model: {item.model}</Text>
                  <TouchableOpacity onPress={() => handleBookmark(item)}>
                    <Icon name="bookmark" size={20} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemText}>source: {item.source}</Text>
                <Text style={styles.itemText}>Price: {item.price}</Text>
                <Text style={styles.itemText}>type: {item.type}</Text>
                <Text style={styles.itemText}>Dealer: {item.carDealer}</Text>
                <Text style={styles.itemText}>Location: {item.distance}</Text>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
            ))}
          </ScrollView>

          <ScrollView></ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9", // A light grey background
  },
  headerText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },

  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default ResultsScreen;
