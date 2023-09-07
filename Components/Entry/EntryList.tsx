import React, { useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EntryListItem from "./EntryListItem";
import {getEntries} from "./Entry";

const data = getEntries();

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
