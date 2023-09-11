import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import EntryListText from "./EntryListText";
import {Hochtarif, Niedertarif, setAddValue} from "../Header/Header";

export const getEntries = () => {
    return [
        { name: 'Waschmaschine', priority: 'High', startTime: '22:00' },
        { name: 'Geschirrspüler', priority: 'High', startTime: '22:30' },
        { name: 'Trockner', priority: 'Medium', startTime: '23:45' },
        { name: 'Handy', priority: 'Low', startTime: '03:00' },
    ];
};

const deviceConsumptionData = require('../../assets/energieverbrauch_geraete.json');


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

const calcSavings = (item) => {
    const deviceConsumptionData = require('../../assets/energieverbrauch_geraete.json');
    const precision = Math.pow(10, 2);
    return Math.round(deviceConsumptionData.GeräteVerbrauch[item.name] * (Hochtarif - Niedertarif) * precision) / precision
}

const calcStartTimeOfEntry = (startTime: string) => {
    return startTime;
}



const EntryList = () => {
    const [entryName, setEntryName] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(EntryPriority.None);
    const [data, setData] = useState(getEntries());

    const addEntry = () => {
        // Create a new entry
        const entry = {
            name: entryName,
            priority: selectedPriority,
            startTime: calcRandomStartTime(entryName),
        };

        // Update the state with the new entry
        setData([...data, entry]);

        // Clear the input fields
        setEntryName('');
        setSelectedPriority(EntryPriority.None);
    };

    const calcRandomStartTime = (entryName) => {
        // Calculate random start time logic here
        // Replace this with your actual logic
        const entryDurationSplitted = "2h30m".split('h');
        const randomHour = parseInt(entryDurationSplitted[0]) + 5;
        const randomMinute = parseInt(entryDurationSplitted[1].replace('m', '')) + 12;
        return `${randomHour}:${randomMinute}`;
    };
    const calcConsumption = (entryName) => {
        return deviceConsumptionData.GeräteVerbrauch[entryName]
    };

    return (
        <View style={styles.container}>
            <View style={{ ...styles.flatListContainer }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.containerEntryListItem}>
                            <View style={styles.row}>
                                <EntryListText style={styles.entryListItemName} text={item.name}></EntryListText>
                                <EntryListText style={{}} text={translatePrioritiesToIcon(item.priority)}></EntryListText>
                                <EntryListText style={{}} text={calcStartTimeOfEntry(item.startTime)}></EntryListText>
                            </View>
                            <View style={styles.row}>
                                <EntryListText style={{ marginTop: 13, ...styles.entryListItemName}} text={calcSavings(item)+" Rp/kWh"}></EntryListText>
                                <Pressable
                                    style={styles.pressableDeleteButton}
                                >
                                    <EntryListText style={{}} text={"-"}></EntryListText>
                                </Pressable>

                                <Pressable
                                    style={styles.pressableAddButton}
                                    onPress={() => setAddValue(calcSavings(item))}
                                >
                                    <EntryListText style={{}} text={"+"}></EntryListText>
                                </Pressable>

                            </View>
                        </View>
                    )}
                />

            </View>
            <View style={ styles.addSectionContainer }>
                <SelectDropdown
                    data={Object.values(Object.keys(deviceConsumptionData.GeräteVerbrauch))}
                    defaultButtonText={'Gerät...'}
                    search={true}
                    buttonStyle={styles.SelectDropdownButton}
                    onSelect={(selectedItem) => setEntryName(selectedItem)}
                    buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                        return item;
                    }}
                />
                <SelectDropdown
                    data={Object.values(EntryPriority)}
                    defaultButtonText={'Prio...'}
                    buttonStyle={styles.SelectDropdownButton}
                    onSelect={(selectedItem) => setSelectedPriority(selectedItem)}
                    buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                        return item;
                    }}
                />

                <Pressable style={styles.pressable} onPress={addEntry}>
                    <Text style={styles.addSectionText}>+</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default EntryList;

const styles = StyleSheet.create({
    container: {
        flex: 6,
    },
    flatListContainer: {
        flex: 8,
    },
    addSectionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#a3a3a3",
    },
    entryName: {
        flex: 4,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        padding: 5,
        margin: 5,
    },
    entryDuration: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        padding: 5,
        margin: 5,
    },
    SelectDropdownButton: {
        flex: 2,
        height: 40,
        paddingLeft: 5,
        padding: 5,
        margin: 5,
    },
    RNDateTimePicker: {
        flex: 2,
        height: 50,
    },
    pressable: {
        flex: 1,
        height: 45,
        padding: 5,
        margin: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    addSectionText: {
        fontSize: 29,
        fontWeight: 'bold',
        color: 'white',
    },

    containerEntryListItem: {
        flex: 1, // To make the container take up the entire screen
        flexDirection: 'column', // Default is column, but you can change it if needed
        padding: 20, // Add padding as needed
        margin: 7,
        height: 110,
        borderWidth: 1.2, // Add a border between items (optional)
        borderColor: 'lightgray', // Border color (optional)
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    pressableAddButton: {
        flex: 0,
        height: 45,
        width: 45,
        padding: 5,
        margin: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    pressableDeleteButton: {
        flex: 0,
        height: 45,
        width: 45,
        padding: 5,
        margin: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    entryListItemName: {
        minWidth: "60%"
    }
});

export enum EntryPriority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    None = 'None',
}
