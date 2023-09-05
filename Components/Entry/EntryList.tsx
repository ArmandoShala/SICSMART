import React from 'react';
import { FlatList, View } from 'react-native';
import EntryListItem from "./EntryListItem";

const data = [
    { id: '1', name: 'Item 1', description: 'Description 1', price: '$10' },
    { id: '2', name: 'Item 2', description: 'Description 2', price: '$15' },
    // Add more items as needed
];

const EntryList = () => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EntryListItem item={item} />}
            />
        </View>
    );
};

export default EntryList;
