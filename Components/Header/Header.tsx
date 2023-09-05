import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const getEmojiFromPrice = (currPrice) => {
    //todo: get the value for currPrice from JSON
    return currPrice > 15 ? '📈' : '📉';
};

export const currentlyInHighTarif = () => {
    //todo: get the value for time to next tarif from JSON
    const highTarifStart = "06:00:00".split(":");
    const highTarifEnd = "22:00:00".split(":");

    let differenceHours = 0;
    let differenceMin = 0;

    const currTime = new Date();
    if(isCurrentlyHighTarif(highTarifStart, highTarifEnd)){
        // we are in high tarif, so calc the time to the end
        differenceHours = parseInt(highTarifEnd[0]) - currTime.getHours() - 1; // subtrack one because that hour is represented in the minutes
        differenceMin = 60 - parseInt(highTarifEnd[1]);
//        alert(parseInt(highTarifEnd[0]) + " " + currTime.getHours() + " " + differenceHours)
//        alert(parseInt(highTarifEnd[1]) + " " + currTime.getMinutes() + " " + differenceMin)
    }

    return `${differenceHours}:${differenceMin}`;
};

const isCurrentlyHighTarif = (highTarifStart: string[], highTarifEnd: string[]) => {

    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    const [startHours, startMinutes, startSeconds] = highTarifStart.map(Number);
    const [endHours, endMinutes, endSeconds] = highTarifEnd.map(Number);

    start.setHours(startHours, startMinutes, startSeconds, 0);
    end.setHours(endHours, endMinutes, endSeconds, 0);

    return now >= start && now <= end;

}

export const convertPriceRpToFr = (priceInRp) => {
    return `${priceInRp / 100}Fr`;
}

const Header = (props) => {
//    const data = require('./data.json');
    const currTarifPriceInRp = 25;
    const savedCashMoney = 302;
    const emojiPrice = getEmojiFromPrice(currTarifPriceInRp);
    const timeUntilOtherTarif = currentlyInHighTarif();

    return (
        <View style={{ ...props.style, ...styles.header }}>
            <View style={styles.headerGroups}>
                <Text style={styles.headerText}>{emojiPrice}</Text>
                <Text style={styles.headerText}>{currTarifPriceInRp} Rp</Text>
            </View>
            <View style={styles.headerGroups}>
                <Text style={styles.headerText}>🤑</Text>
                <Text style={styles.headerText}>{savedCashMoney} Fr</Text>
            </View>
            <View style={styles.headerGroups}>
                <Text style={styles.headerText}>🕤</Text>
                <Text style={styles.headerText}>{timeUntilOtherTarif}</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerGroups: {
        flexDirection: 'column',
        alignItems: 'center',
        top: 70,
        left: 0,
        right: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    headerText: {
        fontSize: 24,
    }
});
