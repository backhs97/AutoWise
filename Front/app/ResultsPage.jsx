import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const ResultsPage = () => {
  const results = [
    // Dummy data for demonstration
    {
      id: '1',
      name: '2023 Honda Civic',
      price: 'Price',
      condition: 'Condition',
      imageUrl: require('./assets/blue_civic.jpg'), // Local image for Honda Civic
    },
    {
      id: '2',
      name: '2023 Jeep Wrangler Rubicon',
      price: 'Price',
      condition: 'Condition',
      imageUrl: require('./assets/jeep_rubicon.png'), // Local image for Jeep Wrangler
    },
  
  ];

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={item.imageUrl} style={styles.carImage} />
      <Text style={styles.carName}>{item.name}</Text>
      <Text>{`${item.price} | ${item.condition}`}</Text>
      <Text>URL ★★★★★</Text>
      {/* Implement logic for displaying stars based on rating */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CarWise</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        // onChangeText={} // Handle search text changes
        // value={} // Control the input value
      />
      <Text style={styles.resultsCount}>4523 Results</Text>
      {/* Add sorting options here */}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // ItemSeparatorComponent={} // Add a separator component if you like
      />
      {/* Footer navigation would go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF5B00', // Orange color for the title
    textAlign: 'center',
    marginVertical: 30,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
  resultsCount: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultItem: {
    marginBottom: 15,
    padding: 10,
    
  },
  carImage: {
    width: '100%',
    height: 200, 
    borderRadius: 10, // Optional for rounded corners
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  // Add more styles as needed
});

export default ResultsPage;

