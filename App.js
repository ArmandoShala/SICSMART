import React, {useState} from 'react';
import {AppRegistry, StatusBar, StyleSheet, Text, View} from 'react-native';
import Header from "./Components/Header/Header";
import EntryList from "./Components/Entry/EntryList";


export default function App() {


    const [savedCashMoney, setSavedCashMoney] = useState(0);

    // Function to increment savedCashMoney
    const incrementSavedCashMoney = (updatedCashMoney) => {
        updatedCashMoney += savedCashMoney;
        setSavedCashMoney(updatedCashMoney);
    };


    const data = [
        { id: '1', name: 'Item 1', description: 'Description 1', price: '$10' },
        { id: '2', name: 'Item 2', description: 'Description 2', price: '$15' },
        // Add more items as needed
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header savedCashMoney={savedCashMoney}></Header>
            <EntryList style={styles.entryList} data={data} incrementSavedCashMoney={incrementSavedCashMoney} savedCashMoney={savedCashMoney}></EntryList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
});
