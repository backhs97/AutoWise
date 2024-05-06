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
import NotificationPage from "./NotificationPage";

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
      <Tab.Screen name="Welcome" component={WelcomeStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        )
      }}
    />
      <Tab.Screen name="Results" component={SearchStack} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Favorites" component={FavoritesPage} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Notifications" component={NotificationPage} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bell" color={color} size={size} />
        )
      }}/>
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
