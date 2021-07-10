import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'

export default function Home(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <SearchComponent />
            <GiftComponent onPress={() => navigation.navigate('Detail')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        backgroundColor: '#fff'
    },
    child: {

    }
});
