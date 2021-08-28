import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import config from '../config';

const buttonConfirm = (props) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}>Tiếp theo</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#E70910',
        borderRadius: 5,
        padding: 5,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: config.fontsize_2,
        fontFamily: "OpenSans_600SemiBold",
    }


});
export default buttonConfirm;