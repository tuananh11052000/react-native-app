import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import config from '../../config';
//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    const { dispatch } = props;
    return <View style={styles.wrapAll}>
         <MaterialIcons style={styles.History} name="history" size={30} ></MaterialIcons>
        <Text style={styles.Text}>Lịch sử xem</Text>
    </View>
}
const styles = StyleSheet.create({
    wrapAll: {
        backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row',
        width: '100%'
    },
    History:{
        paddingLeft:10,
    },
    Text:{
        paddingLeft:10,
        fontSize: config.fontsize_2
    }
  
})

export default connect(function (state) {
    return { auth: state.auth }
})(HeaderLoginPage);