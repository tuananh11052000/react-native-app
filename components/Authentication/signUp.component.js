import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import LogoSmai from "../../assets/logo_smai.png"
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from "galio-framework";
import config from '../../config';
import { TextInput, } from 'react-native-paper';
async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        alert(result)
        return result;
    } else {
        return "null"
    }
}

function SignUp(props) {
    const { dispatch, navigation, onPress } = props;
    const [UserName, onChangeName] = useState('')
    const [PhoneNumber, onChangePhone] = useState('');
    const [Password, onChangePass] = useState('');
    const [showPass, showPassWord] = useState(true)
    const [showPass2, showPassWord2] = useState(true)

    // const loginFunction = async (UserName, PhoneNumber, Password) => {
    //     await axios.post('https://smai-app-api.herokuapp.com/account/register', {
    //         UserName: UserName,
    //         PhoneNumber: PhoneNumber,
    //         Password: Password
    //     }).then(async (data) => {
    //         if (data.status == 201) {
    //             await save('token', data.data.accessToken)
    //             if (props.auth.token == "null") {
    //                 dispatch({ type: 'SIGN_IN', token: data.data.accessToken, PhoneNumber: PhoneNumber })
    //                 props.onPress_()
    //             }
    //         }
    //     }).catch(e => alert("Tài khoản đã tồn tại"))
    // }

    return <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.child_container}>
            <View style={styles.username}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeName(text)}
                    label="Họ tên"
                    theme={{
                        colors: {
                            primary: 'gray',
                        },
                    }}
                />
            </View>
            <View style={styles.phonenumber}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePhone(text)}
                    label="Số điện thoại"
                    keyboardType='numeric'
                    theme={{
                        colors: {
                            primary: 'gray',
                        },
                    }}
                />
            </View>
            <View style={styles.password}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePass(text)}
                    label="Mật khẩu"
                    secureTextEntry={showPass}
                    theme={{
                        colors: {
                            primary: 'gray',
                        },
                    }}
                    right={<TextInput.Icon name="eye" onPress={() => {
                        showPassWord(!showPass);
                    }} />}
                />
            </View>
            <View style={styles.password}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePass(text)}
                    label="Nhập lại mật khẩu"
                    secureTextEntry={showPass2}
                    theme={{
                        colors: {
                            primary: 'gray',
                        },
                    }}
                    right={<TextInput.Icon name="eye" onPress={() => {
                        showPassWord2(!showPass2);
                    }} />}
                />
            </View>
        </View>
        <View style={styles.layoutBtnLogin}>
            <Button onPress={() => {
                // loginFunction(UserName, PhoneNumber, Password)
                   props.navigation.navigate("VerifyOtps");
            }}
                color={config.color_btn_1}
                size="large">
                <Text style={styles.btnLogin}>Đăng ký</Text>
            </Button>

        </View>
    </ScrollView>


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%',
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },
    child_container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'space-around',
    },

    username: {
        height: '14%',
        maxWidth: '90%',
        minWidth: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    },
    phonenumber: {
        height: '14%',
        maxWidth: '90%',
        minWidth: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    },
    password: {
        height: '14%',
        maxWidth: '90%',
        minWidth: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    },
    textInput: {
        fontSize: 20,
        width: '95%',
        backgroundColor: '#FFF',
    },
    image_logo: {
        maxHeight: '30%',
        minHeight: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    //btn
    layoutBtnLogin: {
        maxHeight: '10%',
        minHeight: '8%',
        maxWidth: '80%',
        minWidth: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%'

    },
    btnLogin: {
        color: "white",
        fontSize: 20,
    },
});



export default connect(function (state) {
    return { auth: state.auth }
})(SignUp);
