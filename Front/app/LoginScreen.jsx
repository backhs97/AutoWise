import { useState, useEffect } from "react";
import axios from "axios";
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

import { COLORS } from "../constants/theme";

import { Formik } from "formik";
import * as yup from "yup";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
      }}
    >
      <Text>Register Screen</Text>
      <Formik
        validationSchema={signInValidationSchema}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              style={{
                height: 40,
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
              }}
              placeholder="Email Address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              style={{
                height: 40,
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
              }}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid} />
            <Text>Register?</Text>
            <Button
              onPress={() => navigation.navigate("Register")}
              title="Register"
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;
