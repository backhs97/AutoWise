import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import SearchScreen from "./SearchScreen";
import FavoritesScreen from "./FavoritesScreen";
import ProfileScreen from "./ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Register" independent={true}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Search" component={SearchScreen} />
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainTab.Navigator initialRouteName="Home" independent={true}>
      <MainTab.Screen name="Home" component={SearchScreen} />
      <MainTab.Screen name="Favorites" component={FavoritesScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(!status);
  };

  return (
    <NavigationContainer independent={true}>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Layout;
