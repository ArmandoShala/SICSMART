import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal, Pressable} from 'react-native';

const HeaderItem = ({props, emoji, text, modalExplanation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{...props.style, ...styles.container}}>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{
                                fontSize: 24,
                                borderBottomWidth: 10,
                                borderBottomColor: "black",
                            }}>{modalExplanation}</Text>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{color: "green"}}>Verstanden!</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={styles.headerGroups}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.headerText}>{emoji}</Text>
                    <Text style={styles.headerText}>{text}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default HeaderItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        backgroundColor: "#a3a3a3"
    },
    headerGroups: {
        alignItems: "center"
    },
    headerText: {
        fontSize: 30,
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
        borderColor: "#a3a3a3",
        borderWidth: 1,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
});
