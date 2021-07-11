import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

import GiftComponent from '../components/gift.component';
import SearchComponent from '../components/search.component'

import backgroundIMG from '../assets/background.jpg'

export default function Home(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <SearchComponent />
            <GiftComponent onPress={() => navigation.navigate('Detail')} style={styles.gift_component} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    child: {

    }, gift_component: {
        paddingLeft: 30,
        paddingRight: 30
    },
    wrap_search_bgr: {
        flex: 1
    }
});
