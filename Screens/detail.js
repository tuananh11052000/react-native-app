import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Detail(props) {
    return (
        <View style={styles.container}>
            <Text>Detail</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    child: {

    }
});
