import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationPage = () => {
  const [priceComparison, setPriceComparison] = useState([]);

  useEffect(() => {
    // Fetch price comparison data from your backend
    // Assume your backend exposes an endpoint at 'http://localhost:3000/price-comparison'
    fetch('http://localhost:3000/price-comparison')
      .then(response => response.json())
      .then(data => setPriceComparison(data))
      .catch(error => console.error('Error fetching price comparison:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Price Comparison</Text>
      {priceComparison.map((item, index) => (
        <View key={index} style={styles.comparisonItem}>
          <Text>{item.productName}</Text>
          <Text>Website A: {item.websiteA}</Text>
          <Text>Website B: {item.websiteB}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  comparisonItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  }
});

export default NotificationPage;
