import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal, Pressable} from 'react-native';
import tariffData from '../../assets/electricity_costs/zuerich_costs.json';
import moment from 'moment-timezone';
import HeaderItem from "./HeaderItem";

const getEmojiFromPrice = (currPrice) => {
    //todo: get the value for currPrice from JSON
    return currPrice > 15 ? '📈' : '📉';
};

export let Hochtarif = undefined;
export let Niedertarif = undefined;

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
        const differenceHours = diff.hours().toString().padStart(2, '0');
        const differenceMin = diff.minutes().toString().padStart(2, '0');

        return `${differenceHours}:${differenceMin}`;
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
        Hochtarif = tariffData["Elektrizitätstarif für feste Endverbraucher"]["EKZ Mixstrom"]["Hochtarif"]["Rp./kWh"];
        Niedertarif = tariffData["Elektrizitätstarif für feste Endverbraucher"]["EKZ Mixstrom"]["Niedertarif"]["Rp./kWh"];
        return tariffPrice;
    }

    // Return a default value if tariff details are not found
    return 0.0;
};


// Function to check if currently in high tariff (HT)
 const convertPriceRpToFr = (priceInRp) => {
    return `${priceInRp / 100}Fr`;
}

export const currTarifPriceInRp = getCurrentTariffPrice(new Date());


const Header = (props) => {

    // Define the savedCashMoney state variable and a function to update it
    const [savedCashMoney, setSavedCashMoney] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const emojiPrice = getEmojiFromPrice(currTarifPriceInRp);
    const timeUntilOtherTarif = currentlyInHighTarif();

    // Function to increment savedCashMoney
    const incrementSavedCashMoney = (x) => {
        const updatedCashMoney = savedCashMoney + x; // You can adjust the increment value as needed
        setSavedCashMoney(updatedCashMoney);
    };


    return (
        <View style={{ ...props.style, ...styles.container }}>
            <View style={styles.headerGroups}>
                <HeaderItem props={styles.headerGroups} emoji={emojiPrice} text={currTarifPriceInRp + " Rp"} modalExplanation={"Aktueller Tarif"}></HeaderItem>
            </View>
            <View style={styles.headerGroups}>
                <HeaderItem props={styles.headerGroups} emoji={"🤑"} text={savedCashMoney + " Fr"} modalExplanation={"Total gespart bis jetzt"}></HeaderItem>
            </View>
            <View style={styles.headerGroups}>
                <HeaderItem props={styles.headerGroups} emoji={"🕤"} text={timeUntilOtherTarif} modalExplanation={"Stunden bis zum Tarifwechsel"}></HeaderItem>
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
        backgroundColor: "#a3a3a3"
    },
    headerGroups: {
        alignItems: "center"
    },
    headerText: {
        fontSize: 24,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
