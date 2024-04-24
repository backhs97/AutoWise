import React from "react";

import {
    View,
    Text,
    TextInput,
    FlatList,
    Button,
    TouchableOpacity
} from "react-native";

// contains stylesheets
import styles from "../constants/styles";

// temporary data set
const DATA = [
    {
        id: '2',
        name: '2023 Jeep Wrangler Rubicon',
        favorite: true
    }
];

const NotificationScreen = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>CarWise</Text>

            <TextInput style={styles.searchInput}
                placeholder="Search" />


            <View>
                <Text style={styles.headerText}>Notifications</Text>
            </View>


            {/* list notifications */}
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />

            <View style={{ flex: 1 }}>
                <Text style={styles.headerText}>Featured</Text>
            </View>



        </View>
    );
};



export default NotificationScreen;
