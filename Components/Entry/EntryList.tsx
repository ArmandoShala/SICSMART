import React, { useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EntryListItem from "./EntryListItem";

export const getEntries = () => {
    return    [
        { "name": "Waschmaschine", "priority": "High", "startTime": "22:00" },
        { "name": "Spülmaschine", "priority": "High", "startTime": "22:30" },
        { "name": "Tumbler", "priority": "Medium", "startTime": "23:45" },
        { "name": "Trockner", "priority": "Low", "startTime": "03:00" }
    ];
}

const data = getEntries();

export const addEntry = (entryName: string, entryPriority: EntryPriority, entryDuration: string) => {
    var entryDurationSplitted = entryDuration.split("h");
    var randomHour = parseInt(entryDurationSplitted[0]) + 5;
    var randomMinute = parseInt(entryDurationSplitted[1].replace("m", "")) + 12;
    data.push({ "name": entryName, "priority": entryPriority, "startTime": randomHour + ":" + randomMinute })
}
const EntryList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => <EntryListItem item={item} />}
            />
        </View>
    );
};



export default EntryList;

const styles = StyleSheet.create({
    container:{
        flex: 6,
    },
    list: {
    },
});


export enum EntryPriority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
    None = "None"
}
