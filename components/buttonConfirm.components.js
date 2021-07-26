import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


const buttonConfirm = () => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.button}>
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
    },
    button: {
        backgroundColor: '#E70910',
        borderRadius: 3,
        padding: 5,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    }

    
});
export default buttonConfirm;