import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Pressable} from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from 'react-native-select-dropdown'


const priorityValues = ["High", "Medium", "Low", "None"]


const AddSection = (props) => {
    const [nameEntry, setNameEntry] = useState('');

    const [open, setOpen] = useState(false);

    return (
        <View style={{ ...props.style, ...styles.container }}>
            <TextInput
                style={styles.input}
                placeholder="Wobei Geldsparen?"
                onChangeText={newText => setNameEntry(newText)}
                defaultValue={nameEntry}
            />
            <SelectDropdown
                data={priorityValues}
                defaultButtonText={"Prio"}
                search={true}
                buttonStyle={styles.SelectDropdownButton}
                onSelect={(selectedItem, index) => {
                    alert(selectedItem + " " + index)
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

            <RNDateTimePicker mode="time"
                              style={styles.RNDateTimePicker}
                              value={new Date(Date.now() + 10 * 36e5 )}/>
            <Pressable style={styles.pressable}>
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
    input: {
        flex: 4,
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
