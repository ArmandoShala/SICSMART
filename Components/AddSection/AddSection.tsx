import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {addEntry, EntryPriority} from "../Entry/Entry"


const AddSection = (props) => {
    const [entryName, setEntryName] = useState('');
    const [entryDuration, setEntryDuration] = useState('');
    let selectedPriority: EntryPriority = EntryPriority.None;


    return (
        <View style={{ ...props.style, ...styles.container }}>
            <TextInput
                style={styles.entryName}
                placeholder="Wobei Geldsparen?"
                onChangeText={newText => setEntryName(newText)}
                defaultValue={entryName}
            />
            <SelectDropdown
                data={Object.values(EntryPriority)}
                defaultButtonText={"Prio"}
                search={true}
                buttonStyle={styles.SelectDropdownButton}
                onSelect={(selectedItem, index) => {
                    selectedPriority = selectedItem;
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />

            <TextInput
                style={styles.entryDuration}
                placeholder="2h30m"
                onChangeText={newText => setEntryDuration(newText)}
                defaultValue={entryDuration}
            />
            <Pressable
                style={styles.pressable}
                       onPress={() => addEntry(entryName, selectedPriority, entryDuration)}>
                <Text style={styles.text}>
                    +
                </Text>
            </Pressable>
        </View>
    );
};

export default AddSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: "flex-start",
        paddingVertical: 5,
        paddingHorizontal: 10,
        paddingBottomColor: 'black',
        backgroundColor: "lightgreen"
    },
    entryName: {
        flex: 4,
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "white",
        padding: 5,
        margin: 5,
    },
    entryDuration: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "white",
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
    text: {
        fontSize: 29,
        fontWeight: 'bold',
        color: 'white',
    },

});
