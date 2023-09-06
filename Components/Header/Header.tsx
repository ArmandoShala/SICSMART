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
        <View style={{ ...props.style, ...styles.container }}>
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 30,
        paddingBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: "#a3a3a3"
    },
    headerGroups: {
        alignItems: "center"
    },
    headerText: {
        fontSize: 24,
    }
});
