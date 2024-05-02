import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Touchable} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate ('Login')}>
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
  image: {
    width: 1500, // Adjusted width for the image
    height: 1500, // Adjusted height for the image
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;

