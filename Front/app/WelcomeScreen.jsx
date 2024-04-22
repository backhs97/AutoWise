import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CarWise</Text>
      <Image
        style={styles.image}
        source={require('./assets/car_logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5B00',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Added color for title
  },
  image: {
    width: 200, // Adjusted width for the image
    height: 200, // Adjusted height for the image
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
