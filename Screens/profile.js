import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, Linking } from 'react-native';
import { connect } from "react-redux";
import config from '../config';
import TopProfile from '../components/Profile/topProfile.component'
import HeaderLoginPage from '../components/Header/headerProfilePage.component';
import HistoryProfileComponent from '../components/Profile/historyProfile.component';

//const heightStatusBar = StatusBar.currentHeight;
function ProfileScreen(props) {
    const { navigation } = props;
    return (

        <View style={styles.container}>
            <View style={styles.scrollview}>
                <HeaderLoginPage message={'ProfilePage'} onPress={() => navigation.jumpTo('Feed')} />
                <TopProfile onPress={() => navigation.replace('Authentication')} navigation={navigation} />
                <Text style={styles.Text}>Quản lý</Text>
                <HistoryProfileComponent navigation={navigation}></HistoryProfileComponent>
            </View>

            <View style={styles.phonenumber} >
                <Text style={{ fontSize: config.fontsize_2 }}>Trung tâm hỗ trợ: </Text>
                <Text style={{ fontSize: config.fontsize_2, color: "#0061F2" }} onPress={() => { Linking.openURL('tel:0938516899'); }}>0938.51.68.99</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        height: '100%'
    },
    scrollview: {
        flex: 1,
        width: '100%'
    },
    Text: {
        padding: 15,
        fontSize: config.fontsize_2
    },
    phonenumber: {
        maxWidth: '95%',
        minWidth: '90%',
        position: 'absolute',
        bottom: 0,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },

});

export default connect(function (state) {
    return { auth: state.auth }
})(ProfileScreen);