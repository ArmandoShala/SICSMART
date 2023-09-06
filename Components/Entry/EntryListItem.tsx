import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EntryListText from "./EntryListText";

const calcStartTimeOfEntry = (startTime: string) =>
{
    return "startTime";
}

const EntryListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <EntryListText text={item.name}></EntryListText>
            <EntryListText text={item.priority}></EntryListText>
            <EntryListText text={calcStartTimeOfEntry(item.startTime)}></EntryListText>
        </View>
    );
};

export default EntryListItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange values horizontally
        justifyContent: 'space-between', // Space evenly between values
        paddingHorizontal: 16, // Add some horizontal padding
        paddingVertical: 8, // Add some vertical padding
        marginBottom: 10,
        borderBottomWidth: 1, // Add a border between items (optional)
        borderBottomColor: '#ccc', // Border color (optional)
    },
});
