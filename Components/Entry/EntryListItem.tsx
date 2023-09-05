import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const EntryListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange values horizontally
        justifyContent: 'space-between', // Space evenly between values
        paddingHorizontal: 16, // Add some horizontal padding
        paddingVertical: 8, // Add some vertical padding
        borderBottomWidth: 1, // Add a border between items (optional)
        borderBottomColor: '#ccc', // Border color (optional)
    },
});

export default EntryListItem;
