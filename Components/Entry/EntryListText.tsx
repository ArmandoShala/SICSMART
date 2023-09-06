import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const EntryListText = ({ text }) => {
    return (
        <View>
            <Text style={styles.container}>{text}</Text>
        </View>
    );
};

export default EntryListText;


const styles = StyleSheet.create({
    container: {
        fontSize: 24
    },
});
