import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EntryListItem from "./EntryListItem";


const getDataFromAPI = () => {
    return [
            { "id": "1", "name": "Waschmaschine", "priority": "High", "startTime": "22:00" },
            { "id": "2", "name": "Spülmaschine", "priority": "High", "startTime": "22:30" },
            { "id": "3", "name": "Tumbler", "priority": "Medium", "startTime": "23:45" },
            { "id": "4", "name": "Trockner", "priority": "Low", "startTime": "03:00" }
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
    },
});
