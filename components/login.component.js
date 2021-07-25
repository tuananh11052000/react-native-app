import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import axios from 'axios';
import LogoSmai from "../assets/logo_smai.png"
import { Checkbox } from 'react-native-paper';

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
console.log(Platform.OS)
function Login(props) {
    const { dispatch, navigation, onPress } = props;
    const [PhoneNumber, onChangePhone] = useState('');
    const [Password, onChangePass] = useState('');
    const [checked, setChecked] = useState(false);

    const loginFunction = async (PhoneNumber, Password) => {
        try {
            await axios.post('https://smai-app-api.herokuapp.com/account/login', {
                PhoneNumber: PhoneNumber,
                Password: Password
            }).then(async (data) => {
                if (data.status == 200) {
                    await save('token', data.data.accessToken)
                    if (props.auth.token == "null") {
                        dispatch({ type: 'SIGN_IN', token: data.data.accessToken, PhoneNumber: PhoneNumber })
                        props.onPress_()
                    }
                }
            })
        } catch (e) {
            alert("Sai thong tin tai khoan mat khau")
        }
    }

    return <>
        <ScrollView>
            <View style={styles.container}>
                <Image source={LogoSmai} style={styles.image_logo} />

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

                <View style={styles.checkboxContainer}>
                    <Checkbox style={styles.checkbox}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        color={'blue'}
                        border={'blue'}
                    />
                    <Text style={styles.label}>Duy trì đăng nhập</Text>
                </View>
                <Text>Is CheckBox selected: {checked ? "👍" : "👎"}</Text>

            </View>
         
        </ScrollView>
        <Button style={styles.btnLogin}
                title="Đăng nhập"
                onPress={() => {
                    loginFunction(PhoneNumber, Password)
                    props.onPress_
                }}
            />
    </>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingTop: '5%',
        alignItems: 'center'

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
        maxHeight: '40%',
        minHeight: '30%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    btnLogin: {

    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,

    },
    checkbox: {

    },
    label: {
        margin: 8,
    },

});



export default connect(function (state) {
    return { auth: state.auth }
})(Login);
