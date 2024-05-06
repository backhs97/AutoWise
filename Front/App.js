import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./WelcomeScreen";
import SearchScreen from "./SearchScreen";
import FavoritesPage from "./FavoritesPage";
import ResultsScreen from "./ResultsScreen.js";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";

// Assuming FontAwesome icons are used correctly elsewhere as needed
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const WelcomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function WelcomeStackNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen}/>
      <WelcomeStack.Screen name="SignUp" component={SignUpScreen}/>
      <WelcomeStack.Screen name="Login" component={LoginScreen}/>
    </WelcomeStack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

function Navbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeStackNavigator}/>
      <Tab.Screen name="Results" component={SearchStack}/>
      <Tab.Screen name="Favorites" component={FavoritesPage} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
}

export default App;
