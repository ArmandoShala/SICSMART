import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EntryListText from "./EntryListText";

const calcStartTimeOfEntry = (startTime: string) =>
{
    return startTime;
}
const translatePrioritiesToIcon = (priority: string) =>
{
    switch (priority) {
        case 'High':
            return '‼️';
        case 'Medium':
            return '❗';
        case 'Low':
            return '❕';
        case 'None':
        default:
            return '';
    }
}

const EntryListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <EntryListText style={{flex: 1}} text={item.name}></EntryListText>
            <EntryListText style={{flex: 5}} text={translatePrioritiesToIcon(item.priority)}></EntryListText>
            <EntryListText style={{flex: 1}} text={calcStartTimeOfEntry(item.startTime)}></EntryListText>
        </View>
    );
};

export default EntryListItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 8,
        margin: 7,
        height: 100,
        borderWidth: 1.2, // Add a border between items (optional)
        borderColor: 'lightgray', // Border color (optional)
    },
});
