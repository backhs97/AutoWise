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

const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),

  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character",
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const RegisterScreen = ({ navigation }) => {
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
        validationSchema={signUpValidationSchema}
        initialValues={{
          fullName: "",
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
              name="fullName"
              style={{
                height: 40,
                borderWidth: 1,
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
              }}
              placeholder="Name"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
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
            <Button
              onPress={handleSubmit}
              title="SIGN UP"
              disabled={!isValid}
            />
            <Text>Login?</Text>
            <Button
              onPress={() => navigation.navigate("Login")}
              title="Login"
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default RegisterScreen;
