import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar,Linking } from 'react-native';
import { connect } from "react-redux";
import config from '../config';
import TopProfile from '../components/topProfile.component'
import HeaderLoginPage from '../components/headerProfilePage.component';
import HistoryProfileComponent from '../components/historyProfile.component';


//const heightStatusBar = StatusBar.currentHeight;
function ProfileScreen(props) {
    const { navigation } = props;
    return (
     
        <View style={styles.container}>
            <View style={styles.scrollview}>
                <HeaderLoginPage message={'ProfilePage'} />
                <TopProfile  onPress={() => navigation.navigate('Authentication')}  />
                <Text style={styles.Text}>Quản lý</Text>
                <HistoryProfileComponent></HistoryProfileComponent>
            </View>
            <View style={styles.phonenumber} >
                    <Text style={{fontSize:config.fontsize_2}}>Trung tâm hỗ trợ: </Text>
                    <Text style={{fontSize:config.fontsize_2, color:"#0061F2"}} onPress={()=>{Linking.openURL('tel:0938516899');}}>0938.51.68.99</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
        height:'100%'
    },
    scrollview: {
        flex: 1,
        width: '100%'
    },
    Text:{
       padding: 15,
       fontSize: config.fontsize_2
    },
    phonenumber: {
        maxWidth: '95%',  
        minWidth:'90%', 
        position: 'absolute',
        bottom: 0,
        padding: 15,
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf : 'center', 
    },
    
});

export default connect(function (state) {
    return { num: state.countNumber, newestPost: state.newestPost }
})(ProfileScreen);