import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SearchScreen from "./SearchScreen";
import FavoritesPage from "./FavoritesPage";
import ResultsScreen from "./ResultsScreen.js";

import { Icon } from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Search" component={SearchStack} />
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
