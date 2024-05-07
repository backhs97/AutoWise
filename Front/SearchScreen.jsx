import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from './AuthContext';

const SearchPage = ({ navigation }) => {
  const [searchParams, setSearchParams] = useState({
    model: "",
    make: "",
    color: "",
    zipCode: "",
    price: "",
    type: "",
    year: "",
  });

  const { user } = useAuth();

  const handleSearch = () => {
    console.log("Search parameters:", searchParams);
    navigation.navigate("Results", { params: searchParams });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hi {user ? user.username : 'Guest'}, search for your desired car</Text>
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={searchParams.make}
        onChangeText={(text) => setSearchParams({ ...searchParams, make: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={searchParams.model}
        onChangeText={(text) => setSearchParams({ ...searchParams, model: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="New or Used"
        value={searchParams.type}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, type: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={searchParams.year}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, year: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={searchParams.color}
        onChangeText={(text) => setSearchParams({ ...searchParams, color: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={searchParams.zipCode}
        onChangeText={(text) => setSearchParams({ ...searchParams, zipCode: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={searchParams.price}
        onChangeText={(text) => setSearchParams({ ...searchParams, price: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: 'center',  // Center content horizontally
    justifyContent: 'center'  // Center content vertically
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray'
  },
  input: {
    height: 40,
    width: '80%',  // Width of 80% of the screen width
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#FF6A00',  // Button color similar to your provided image
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default SearchPage;




