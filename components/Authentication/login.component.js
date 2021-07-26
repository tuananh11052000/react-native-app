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
    Platform,
    Switch,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import LogoSmai from "../../assets/logo_smai.png"
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../../config';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}
function Login(props) {
    const { dispatch, navigation, onPress } = props;
    const [PhoneNumber, onChangePhone] = useState('');
    const [Password, onChangePass] = useState('');
    const [checked, setChecked] = useState(true);
    const [showPass, showPassWord] = useState(true)
    const loginFunction = async (PhoneNumber, Password) => {
        try {
            await axios.post('https://smai-app-api.herokuapp.com/account/login', {
                PhoneNumber: PhoneNumber,
                Password: Password
            }).then(async (data) => {
                
                if (data.status == 200) {
                    await save('token','bearer '+data.data.accessToken)
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
    const onToggleSwitch = () => setChecked(!checked); //dùng cho ios
    let checkbox;
    if (Platform.OS === "ios") {
        //switch for ios
        checkbox =
            <View style={styles.checkboxContainer}>
                <Text style={styles.label}>Lưu tài khoản cho lần đăng nhập sau</Text>
                <Switch value={checked} onValueChange={onToggleSwitch}
                    style={{ transform: [{ scaleX: 0.76 }, { scaleY: 0.76 }] }} />
            </View>
    } else {
        //check box 
        checkbox =
            <View style={styles.checkboxContainer}>
                <Checkbox style={styles.checkbox}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    color={'green'}
                />
                <Text style={styles.label}>Lưu tài khoản cho lần đăng nhập sau</Text>
            </View>


    }
    return <>

        <View style={styles.container}>
            <Image source={LogoSmai} style={styles.image_logo} />
            <View style={styles.child_container}>
                <View style={styles.username}>
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

                {checkbox}
                {/* <Text>Is CheckBox selected: {checked ? "👍" : "👎"}</Text> */}
                <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
            </View>
           
        </View>
        <View  style={styles.layoutBtnLogin}>
            <TouchableOpacity  onPress={() => {
                    loginFunction(PhoneNumber, Password)
                    props.onPress_
                }}>
                <View >
                    <Text style={styles.btnLogin}>Đăng nhập</Text>
                </View>

            </TouchableOpacity>

        </View>
    </>

}
const styles = StyleSheet.create({
    container: {
     
        flex: 1,
        paddingTop: '5%',
        width: '100%',
        alignItems: 'center',
       

    },
    child_container: {
        height: '100%',
        maxWidth: '96%',
        marginTop: '3%'
    },
    textInput: {
        fontSize: 20,
        width: '94%'

    },
    image_logo: {
        maxHeight: '40%',
        minHeight: '30%',
        resizeMode: 'contain',

    },
    username: {
        height: '10%',
        maxWidth: '90%',
        minWidth: '80%',
        borderBottomWidth: 0.5,
        borderBottomColor: "#000",
        justifyContent: 'space-between',

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

    label: {
        margin: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: '2%',
    },
    forgotPassword:{
        alignSelf: 'center',
        fontSize:config.fontsize_3,
        marginTop:'10%',
        color:'blue'
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
        marginBottom:'10%'

    },
    btnLogin: {
       
        color:"white"

    },
});



export default connect(function (state) {
    return { auth: state.auth }
})(Login);
