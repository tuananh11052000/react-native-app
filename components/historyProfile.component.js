import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import config from '../config';
//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    const { dispatch } = props;
    return <View style={styles.wrapAll}>
        <Text style={styles.Text}>Lịch sử xem</Text>
    </View>
}
const styles = StyleSheet.create({
    wrapAll: {
        height: config.header,
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'space-between'
    },
    Text:{
    
        fontSize: config.fontsize_2
    }
  
})

export default connect(function (state) {
    return { auth: state.auth }
})(HeaderLoginPage);