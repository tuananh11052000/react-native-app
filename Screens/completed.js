import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


export default function Completed(props) {

    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.backgroundBox}>
                <View>
                    <Text style={styles.textRequired}>Đã được yêu cầu thành công</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={styles.buttonComplete} onPress={() => navigation.popToTop()}>
                    <Text style={styles.textComplete}>Xong</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBEBEB'
    },
    backgroundBox: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        paddingRight: 5,
        paddingLeft: 5,
    },
    textRequired: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonComplete: {
        backgroundColor: '#E70910',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        width: 100,
        alignItems: 'center',
        marginTop: 10,
    },
    textComplete: {
        color: '#FFF',
        fontSize: 25,
    }
});
