import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS } from '../constants/theme';

const Home = () => {

    const router = useRouter(); // I have no idea what this does...

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Stack.Screen
                options={{
                    headerStyle: { color: COLORS.primary },
                    headerTitle: "CarWise",
                    headerTintColor: COLORS.primary,
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold', },
                }}
            />

            <View
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 125,
                }}
            >
                <Text style={{ color: COLORS.secondary, fontSize: 26, fontWeight: 'bold' }}>Search for your desired car</Text>
                {/* <Text>MODEL</Text> */}

            </View>
        </SafeAreaView>
    );
}


export default Home;