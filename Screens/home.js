import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GiftComponent from '../components/gift.component';

export default function Home(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <GiftComponent onPress={() => navigation.navigate('Detail')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        backgroundColor: '#fff'
    },
    child: {

    }
});
