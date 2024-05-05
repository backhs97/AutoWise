import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { Alert } from "react-native";

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

  const handleSearch = () => {
    console.log("Search parameters:", searchParams);


    navigation.navigate("Results", { params: searchParams });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Model"
        value={searchParams.model}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, model: text })
        }
      />
      <TextInput
        placeholder="Make"
        value={searchParams.make}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, make: text })
        }
      />
      <TextInput
        placeholder="New or Used"
        value={searchParams.type}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, type: text })
        }
      />
      <TextInput
        placeholder="Year"
        value={searchParams.year}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, year: text })
        }
      />
      <TextInput
        placeholder="Color"
        value={searchParams.color}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, color: text })
        }
      />
      <TextInput
        placeholder="zip code"
        value={searchParams.zipCode}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, zipCode: text })
        }
      />
      <TextInput
        placeholder="Price"
        value={searchParams.price}
        onChangeText={(text) =>
          setSearchParams({ ...searchParams, price: text })
        }
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default SearchPage;
