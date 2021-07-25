import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import LogoSmai from "../assets/logo_smai.png"
import { MaterialIcons } from '@expo/vector-icons';

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

    const loginFunction = async (UserName, PhoneNumber, Password) => {
        await axios.post('https://smai-app-api.herokuapp.com/account/register', {
            UserName: UserName,
            PhoneNumber: PhoneNumber,
            Password: Password
        }).then(async (data) => {
            console.log(data)
            if (data.status == 201) {
                await save('token', data.data.accessToken)
                if (props.auth.token == "null") {
                    dispatch({ type: 'SIGN_IN', token: data.data.accessToken, PhoneNumber: PhoneNumber })
                    props.onPress_()
                }
            }
        }).catch(e => alert("Tài khoản đã tồn tại"))
    }

    return <>
        <ScrollView>
            <View style={styles.container}>
                <Image source={LogoSmai} style={styles.image_logo} />
                <View style={styles.child_container}>
                    <View style={styles.username}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangeName(text)}
                            placeholder="Họ tên"
                        />
                    </View>
                    <View style={styles.phonenumber}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangePhone(text)}
                            placeholder="Số điện thoại"
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.password}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangePass(text)}
                            placeholder="Mật khẩu"
                            secureTextEntry={showPass}
                        />
                        <MaterialIcons name="visibility" size={26} color="gray" onPress={() => {
                            showPassWord(!showPass);
                        }} />
                    </View>
                    <View style={styles.password}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => onChangePass(text)}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={showPass2}
                        />
                        <MaterialIcons name="visibility" size={26} color="gray" onPress={() => {
                            showPassWord2(!showPass2);
                        }} />
                    </View>
                </View>
            </View>
        </ScrollView>
        <View style={styles.layoutBtnLogin}>
            <TouchableOpacity onPress={() => {
                loginFunction(UserName, PhoneNumber, Password)
            }}>
                <View >
                    <Text style={styles.btnLogin}>Đăng ký</Text>
                </View>

            </TouchableOpacity>

        </View>
    </>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%',
        alignItems: 'center'
    },
    child_container: {
        height: '100%',
        maxWidth: '97%',
        marginTop: '3%'
    },

    username: {
        height: '10%',
        minWidth: '80%',
        borderBottomWidth: 0.5,
        borderBottomColor: "#000",
        justifyContent: 'space-between',

    },
    phonenumber: {
        height: '14%',
        maxWidth: '90%',
        minWidth: '80%',
        borderBottomWidth: 0.5,
        borderBottomColor: "#000",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    password: {
        height: '14%',
        maxWidth: '90%',
        minWidth: '80%',
        borderBottomWidth: 0.5,
        borderBottomColor: "#000",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        fontSize: 20,
        width: '95%'
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
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '10%'

    },
    btnLogin: {
        color: "white"

    },
});



export default connect(function (state) {
    return { auth: state.auth }
})(SignUp);
