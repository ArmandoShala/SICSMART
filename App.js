import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from "./Components/Header/Header";
import EntryList from "./Components/Entry/EntryList";

export default function App() {
    const data = [
        { id: '1', name: 'Item 1', description: 'Description 1', price: '$10' },
        { id: '2', name: 'Item 2', description: 'Description 2', price: '$15' },
        // Add more items as needed
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header style={styles.header}></Header>
            <EntryList style={styles.entryList} data={data}></EntryList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Make the container flex to occupy the whole screen
        flexDirection: "column",
    },
    header: {
    },
    entryList: {
    }
});
