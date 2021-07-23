import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from "react-redux";

import TopProfile from '../components/topProfile.component'
import HeaderLoginPage from '../components/headerLoginPage';

const heightStatusBar = StatusBar.currentHeight;

function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <HeaderLoginPage />
                <TopProfile />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightStatusBar
    },
    scrollview: {
        flex: 1,
        width: '100%'
    }
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(ProfileScreen);