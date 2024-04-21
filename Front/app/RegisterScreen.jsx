import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { fullName, email, password } = formData;
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
      );
      console.log("Form submitted with data:", formData);
      console.log("Registration successful:", response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => handleChange("fullName", text)}
        value={formData.fullName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => handleChange("confirmPassword", text)}
        value={formData.confirmPassword}
        secureTextEntry
      />
      <Button onPress={handleSubmit} title="Register" />
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default RegisterScreen;
