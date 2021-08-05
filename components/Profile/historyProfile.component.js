import React from 'react'
import {
    Text, View, StyleSheet, ScrollView,TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';

import config from '../../config';

//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    const _pressRow = async () => {
        let result = await SecureStore.getItemAsync('token');
        if(result)
        {
            props.navigation.navigate('History') //chuyển trang

        }
        else{
            props.navigation.navigate('Authentication') //chuyển trang

        }
    }
    return <View  >
        <TouchableOpacity style={styles.wrapAll} onPress={() => _pressRow()}>
         <MaterialIcons style={styles.History} name="history" size={30} ></MaterialIcons>
        <Text style={styles.Text}>Lịch sử xem</Text>
        </TouchableOpacity>
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