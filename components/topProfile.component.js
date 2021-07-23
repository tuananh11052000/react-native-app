import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../config';
//We will consider isLogin state and decide what will appear on the screen
function TopProfile(props) {
    const { dispatch } = props;
    return <View style={styles.wrapAll}>
        <MaterialIcons name="account-circle" size={96} color="gray" />
        <View>
            <Text style={styles.text} >Nguyễn Duy Phú</Text>
            <View style={styles.container}>
                <MaterialIcons style={styles.icon_person} name="person-outline" size={30} color="gray"></MaterialIcons> 
                <Text style={styles.text_person} >Cá nhân</Text>
            </View>
           
        </View>

    </View>
}

const styles = StyleSheet.create({
    wrapAll: {
        height: 110,
        backgroundColor: '#fff',
        padding: 7,
        flexDirection: 'row',
        width: '100%'
    },
    wrap_avatar: {
        height: 80,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        padding: 10,
        fontSize: config.fontsize_2
    },
    text_person: {
        padding: 10,
        fontSize: config.fontsize_2
    },
    icon_person:{
        padding:10
    },
    container: {
        flex: 1,
        flexDirection: 'row'
     },

})

export default connect(function (state) {
    return { auth: state.auth }
})(TopProfile);