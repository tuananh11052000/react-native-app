import React, { useEffect, useState } from 'react'
import {
    Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native'

import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../../config';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-elements';
//check token

async function getToken() {
    let result = await SecureStore.getItemAsync('token');
    if (result) {
        return await result;
    } else {
        return await 'Null'
    }
}

//We will consider isLogin state and decide what will appear on the screen
function TopProfile(props) {
    const [token, setToken] = useState('Null')//token
    const { dispatch } = props;
    useEffect(() => {
        getToken().then(profile => {
            setToken(profile)
        }, (error) => {
            console.log('An error has occur: ', error)
        })
    }, [])
    if (props.auth.isLogin == false) {
        return (<View style={styles.wrapAll}>
            <MaterialIcons name="account-circle" size={96} color="#BDBDBD" />
            <View style={styles.login}>
                <Button
                    onPress={props.onPress}
                    title="Đăng nhập/Đăng ký"
                    buttonStyle={styles.buttonLogIn}
                    titleStyle={styles.titleStyle}
                    type="outline" />

            </View>
        </View>
        )
    }
    else {
        return (
            <View style={styles.wrapAll}>
                <MaterialIcons name="account-circle" size={96} color="gray" />
                <View>
                    <Text style={styles.text} >Nguyễn Duy Phú</Text>
                    <View style={styles.container}>
                        <MaterialIcons style={styles.icon_person} name="person-outline" size={30} color="#BDBDBD"></MaterialIcons>
                        <Text style={styles.text_person} >Cá nhân</Text>
                    </View>

                </View>
            </View>)
    }
    {/* */ }


}

const styles = StyleSheet.create({
    wrapAll: {
        height: 110,
        backgroundColor: '#fff',
        padding: 7,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%'
    },
    wrap_avatar: {
        height: 80,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        minWidth: '60%',
        maxWidth: '60%',
        maxHeight: 'auto',
        minHeight: '60%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: '5%'
    },
    text: {
        padding: 10,
        fontSize: config.fontsize_2
    },
    text_person: {
        padding: 10,
        fontSize: config.fontsize_2
    },
    icon_person: {
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonLogIn: {
        borderColor: config.color_btn_1,
    },
    titleStyle: {
        color: config.color_btn_1,
        fontSize: 20
    }

})

export default connect(function (state) {
    return { auth: state.auth }
})(TopProfile);