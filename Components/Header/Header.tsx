import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import tariffData from '../../assets/electricity_costs/zuerich_costs.json';
import moment from 'moment-timezone';

export const getEmojiFromPrice = (currPrice) => {
    //todo: get the value for currPrice from JSON
    return currPrice > 15 ? '📈' : '📉';
};


export const currentlyInHighTarif = () => {
    const highTarifData = tariffData["Elektrizitätstarif für feste Endverbraucher"]["EKZ Mixstrom"]["Hochtarif"]["Zeit"];
    const highTarifStartWeekday = highTarifData["Montag bis Freitag"]["Startzeit"];
    const highTarifEndWeekday = highTarifData["Montag bis Freitag"]["Endzeit"];
    const highTarifStartWeekend = highTarifData["Samstag und Sonntag"]["ganztägig"];

    //const currTime = moment(); // Get the current time
    const currTime = moment(); // Get the current time

    // Check if it's a weekday (Monday to Friday)
    const isWeekday = currTime.isoWeekday() >= 1 && currTime.isoWeekday() <= 5;

    let highTarifStartMoment = moment(highTarifStartWeekday, 'HH:mm'); // Parse the start time
    let highTarifEndMoment = moment(highTarifEndWeekday, 'HH:mm'); // Parse the end time

    if (!isWeekday) {
        // Use weekend time if it's not a weekday
        highTarifStartMoment = moment(highTarifStartWeekend, 'HH:mm');
        highTarifEndMoment = moment(highTarifStartWeekend, 'HH:mm');
    }

    if (currTime.isBetween(highTarifStartMoment, highTarifEndMoment)) {
        // We are in high tariff, so calculate the time until the next low tariff
        const nextLowTarifStartMoment = highTarifEndMoment.clone();
        const diff = moment.duration(nextLowTarifStartMoment.diff(currTime));
        const differenceHours = diff.hours();
        const differenceMin = diff.minutes();

        // Format minutes with leading zeros
        const formattedMin = differenceMin.toString().padStart(2, '0');

        return `${differenceHours}:${formattedMin}`;
    } else {
        // Calculate the time until the next high tariff
        const nextHighTarifStartMoment = highTarifStartMoment.clone();
        if (nextHighTarifStartMoment.isBefore(currTime)) {
            nextHighTarifStartMoment.add(1, 'day'); // Move to the next day
        }
        const diff = moment.duration(nextHighTarifStartMoment.diff(currTime));
        const differenceHours = diff.hours();
        const differenceMin = diff.minutes();

        // Format minutes with leading zeros
        const formattedMin = differenceMin.toString().padStart(2, '0');

        return `${differenceHours}:${formattedMin}`;
    }
};

// Function to check the current tariff price
export const getCurrentTariffPrice = (currentDateTime: Date) => {
    const currentTime = moment(currentDateTime);
    const dayOfWeek = currentTime.day();
    const currentTimeStr = currentTime.format('HH:mm');

    // Default to low tariff
    let currentTariff = "Niedertarif";

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Weekdays (Monday to Friday)
        const highTariffStartTime = "07:00";
        const highTariffEndTime = "20:00";

        if (currentTimeStr >= highTariffStartTime && currentTimeStr <= highTariffEndTime) {
            currentTariff = "Hochtarif";
        }
    }

    // Get the tariff details from the JSON data
    const tariffDetails = tariffData["Elektrizitätstarif für feste Endverbraucher"]["EKZ Mixstrom"][currentTariff];

    if (tariffDetails) {
        // Get the tariff price from the details
        const tariffPrice = tariffDetails["Rp./kWh"];
        return tariffPrice;
    }

    // Return a default value if tariff details are not found
    return 0.0;
};


// Function to check if currently in high tariff (HT)
export const convertPriceRpToFr = (priceInRp) => {
    return `${priceInRp / 100}Fr`;
}

const Header = (props) => {
//    const data = require('./data.json');
    const currTarifPriceInRp = getCurrentTariffPrice(new Date());
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
