import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Adjust based on the icons you have
import axios from "axios";

const FavoritesPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchCars = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get("http://localhost:3000/favorites");
          setCars(response.data);
        } catch (error) {
          console.error("Failed to fetch cars:", error);
        }
        setIsLoading(false);
      };

      fetchCars();
    }, []),
  );

  const removeCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/car/favorite/${id}`);
      setCars(cars.filter((car) => car.id !== id)); // Assuming each car has a unique 'id'
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cars</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {cars.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.carText}>
                {item.model} - {item.price}
              </Text>
              <TouchableOpacity
                onPress={() => removeCar(item.id)}
                style={styles.trashIcon}
              >
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  carText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  trashIcon: {
    padding: 10,
  },
});

export default FavoritesPage;
