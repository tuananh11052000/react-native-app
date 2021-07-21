import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

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
                    if (props.auth.token == "null")
                    {
                        dispatch({ type: 'SIGN_IN', token: data.data.accessToken, PhoneNumber: PhoneNumber })
                        props.onPress_()
                    }
                }
            }).catch(e=>alert("Tài khoản đã tồn tại"))
    }

    return <View style={styles.container}>
            <Text style={styles.paragraph}>Đăng ký</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeName(text)}
                placeholder = "Họ tên"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangePhone(text)}
                placeholder = "Số điện thoại"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangePass(text)}
                placeholder = "Mật khẩu"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangePass(text)}
                placeholder = "Nhập lại mật khẩu"
            />
            <Button
                title="Đăng ký"
                onPress={()=>{
                    loginFunction(UserName, PhoneNumber, Password)}}
            />
        </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        marginTop: 34,
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    }
});



export default connect(function (state) {
    return { auth: state.auth }
})(SignUp);
