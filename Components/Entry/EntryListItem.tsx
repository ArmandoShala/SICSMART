import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import EntryListText from "./EntryListText";

const calcStartTimeOfEntry = (startTime: string) => {
    return startTime;
}
const translatePrioritiesToIcon = (priority: string) => {
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

const EntryListItem = ({item}) => {
    return (


        <View style={styles.container}>
            <View style={styles.row}>
                <EntryListText style={{}} text={item.name}></EntryListText>
                <EntryListText style={{}} text={translatePrioritiesToIcon(item.priority)}></EntryListText>
                <EntryListText style={{}} text={calcStartTimeOfEntry(item.startTime)}></EntryListText>
            </View>
            <View style={styles.row}>
                <EntryListText style={{}} text={"todo savings"}></EntryListText>
                <EntryListText style={{}} text={"todo cancel"}></EntryListText>
                <EntryListText style={{}} text={"todo start"}></EntryListText>
            </View>
        </View>
    );
};

export default EntryListItem;


const styles = StyleSheet.create({
    container: {
        flex: 1, // To make the container take up the entire screen
        flexDirection: 'column', // Default is column, but you can change it if needed
        padding: 20, // Add padding as needed
        margin: 7,
        height: 100,
        borderWidth: 1.2, // Add a border between items (optional)
        borderColor: 'lightgray', // Border color (optional)
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
});
