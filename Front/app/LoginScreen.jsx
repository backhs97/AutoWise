import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import { COLORS } from "../constants/theme";

import * as yup from "yup";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// const signInValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter valid email")
//     .required("Email Address is Required"),
//   password: yup
//     .string()
//     .min(8, ({ min }) => `Password must be at least ${min} characters`)
//     .required("Password is required"),
// });

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = formData;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData,
      );
      console.log("login successful:", response.data);
      console.log("Form submitted with data:", formData);
      navigation.navigate("Search");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(text) => handleChange("email", text)}
        value={formData.email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange("password", text)}
        value={formData.password}
        secureTextEntry
      />
      <Button onPress={handleSubmit} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
