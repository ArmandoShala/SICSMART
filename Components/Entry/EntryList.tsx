import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EntryListItem from "./EntryListItem";


const getDataFromAPI = () => {
    return [
        { id: '1', name: 'Item 1', priority: 'Description 1', startTime: "10" },
        { id: '2', name: 'Item 2', priority: 'Description 2', startTime: "15" },
        // Add more items as needed
    ];
}

const data = getDataFromAPI();


const EntryList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                style={styles.list}
                keyExtractor={(item) => item.id}
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
        backgroundColor: "yellow",
    },
});
