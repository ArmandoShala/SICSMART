import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AddSection = (props) => {
    const [nameEntry, setNameEntry] = useState('');

    const val = new Date();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    return (
        <View style={{ ...props.style, ...styles.container }}>
            <TextInput
                style={styles.container}
                placeholder="Wobei Geldsparen?"
                onChangeText={newText => setNameEntry(newText)}
                defaultValue={nameEntry}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <RNDateTimePicker mode="time"  value={val}/>
        </View>
    );
};

export default AddSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: "center",
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "red",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
