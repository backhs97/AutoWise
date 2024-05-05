import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure to install this package

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Placeholder login validation: replace with your actual logic
    if (username === "admin" && password === "password") {
      if (rememberMe) {
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, password }));
      } else {
        await AsyncStorage.removeItem('userCredentials');
      }
      // Navigate to another screen or reset navigation stack
      navigation.replace('HomeScreen'); // Replace 'HomeScreen' with the screen you want to navigate to
    } else {
      Alert.alert('Invalid Credentials', 'Please check your username and password!');
    }
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.rememberMeContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5B00',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FF6A00',
    fontWeight: 'bold',
  },
  linkText: {
    color: 'white',
    marginTop: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rememberMeText: {
    marginLeft: 10,
    color: 'white',
  }
});

export default LoginScreen;