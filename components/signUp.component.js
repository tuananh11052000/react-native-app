import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import LogoSmai from "../assets/logo_smai.png"

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

                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeName(text)}
                    placeholder="Họ tên"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePhone(text)}
                    placeholder="Số điện thoại"
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePass(text)}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangePass(text)}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                />

            </View>
        </ScrollView>
        <Button
            title="Đăng ký"
            onPress={() => {
                loginFunction(UserName, PhoneNumber, Password)
            }}
        />
    </>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        alignItems: 'center'
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        height: '10%',
        maxWidth: '90%',
        minWidth: '80%',
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        fontSize: 20
    },
    image_logo: {
        maxHeight: '30%',
        minHeight: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});



export default connect(function (state) {
    return { auth: state.auth }
})(SignUp);
