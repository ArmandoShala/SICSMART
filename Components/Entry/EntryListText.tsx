import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {render} from "react-dom";

const EntryListText  = ({ text, style }) => {
    return (
        <View>
            <Text style={{...styles.container, ...style}}>{text}</Text>
        </View>
    );
};

export default EntryListText ;


const styles = StyleSheet.create({
    container: {
        fontSize: 24
    },
});
