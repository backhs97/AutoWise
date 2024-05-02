import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Touchable} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate ('Login')}>
      <Text style={styles.title}>Welcome to CarWise</Text>
      <Image
        style={styles.image}
        source={require('./assets/car_logo.png')}
      />
    </TouchableOpacity>
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
    width: 1000, // Adjusted width for the image
    height: 1000, // Adjusted height for the image
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
