import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from "react-redux";

import config from '../config';
import TopProfile from '../components/topProfile.component'
import HeaderLoginPage from '../components/headerLoginPage';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const heightStatusBar = StatusBar.currentHeight;
console.log(getStatusBarHeight());

function ProfileScreen(props) {
    return (
     
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <HeaderLoginPage />
                <TopProfile />
                <Text style={styles.Text}>Quản lý</Text>
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
    },
    Text:{
       padding: 20,
       fontSize: config.fontsize_2
    }
    
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(ProfileScreen);