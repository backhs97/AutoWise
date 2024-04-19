import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import Slider from "@react-native-community/slider";

import { COLORS } from "../constants/theme";

const SearchScreen = () => {
  const [model, onChangeModel] = React.useState("");
  const [make, onChangeMake] = React.useState("");
  const [color, onChangeColor] = React.useState("");
  const [zipcode, onChangeZipcode] = React.useState("");
  const [price, onChangePrice] = React.useState(0);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(100);

  // api request

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          // justifyContent: 'center',

          alignItems: "center",
          paddingTop: 125,
        }}
      >
        <Text
          style={{ color: COLORS.secondary, fontSize: 26, fontWeight: "bold" }}
        >
          Search for your desired car
        </Text>

        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
          onChangeText={onChangeModel}
          value={model}
          placeholder="Model"
        />
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
          onChangeText={onChangeMake}
          value={make}
          placeholder="Make"
        />
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
          onChangeText={onChangeColor}
          value={color}
          placeholder="Color"
        />
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
          onChangeText={onChangeZipcode}
          value={zipcode}
          placeholder="Zipcode"
          keyboardType="numeric"
        />

        {/* price range thing */}
        <View>
          <Text>Price Range</Text>
          <Slider>
            style={{ width: 900, height: 40 }}
            minimumValue={0}
            maximumValue={1000000000}
            minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"
          </Slider>
        </View>

        <View
          style={{
            marginTop: 20,
            padding: 10,
          }}
        >
          <Button color={COLORS.secondary} title="Search" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
