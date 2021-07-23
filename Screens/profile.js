import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from "react-redux";

import config from '../config';
import TopProfile from '../components/topProfile.component'
import HeaderLoginPage from '../components/headerProfilePage.component';
import HistoryProfileComponent from '../components/historyProfile.component';


//const heightStatusBar = StatusBar.currentHeight;
function ProfileScreen(props) {
    return (
     
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <HeaderLoginPage />
                <TopProfile />
                <Text style={styles.Text}>Quản lý</Text>
                <HistoryProfileComponent></HistoryProfileComponent>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: config.heightStatusBar
         
    },
    scrollview: {
        flex: 1,
        width: '100%'
    },
    Text:{
       padding: 15,
       fontSize: config.fontsize_2
    }
    
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(ProfileScreen);