import React, { useEffect, useState } from 'react'
import {
    Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert, Image
} from 'react-native'
import { Avatar } from 'react-native-elements';

import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../../config';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
//check token

//We will consider isLogin state and decide what will appear on the screen
function TopProfile(props) {
    const [avatar, getAvatar] = useState('');
    const [FullName, getName] = useState('');
    const [avtUpload, setAvatar] = useState('');
    const { dispatch } = props;
    let openImagePickerAsync = async () => {
        let token = await SecureStore.getItemAsync('token');
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        setAvatar(pickerResult.uri);
        let apiUrl = "https://smai-app-api.herokuapp.com/user/profileUser";
        let formData = new FormData();
        let uri = pickerResult.uri;
        let uriArray = uri.split(".");
        let fileType = uriArray[uriArray.length - 1];
        formData.append("imageUser", {
            uri: uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        let options = {
            method: "POST",
            body: formData,
            mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: token
            },
        };
        fetch(apiUrl, options).then(data => console.log(data))
        console.log(token)
    }
    useEffect(() => {
        const getAvtFunc = async () => {
            if (props.auth.isLogin == true) {
                let avatar_ = await SecureStore.getItemAsync('avatar');
                let Name = await SecureStore.getItemAsync('FullName');
                getAvatar(avatar_)
                getName(Name);
            }
        }
        getAvtFunc();
    }, [])
    console.log(avatar)
    const renderAvatar = () => {
        if (avatar)
            return <Avatar
                size={90}
                rounded
                source={{ uri: avatar }}
                containerStyle={styles.avatarContainer}
                onPress={() => {
                    openImagePickerAsync();
                }}>
                <Avatar.Accessory
                    size={30}
                />
            </Avatar>
        else
            return <Avatar
                size={90}
                rounded
                source={{ uri: "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png" }}
                containerStyle={styles.avatarContainer}
                onPress={() => {
                    openImagePickerAsync();
                }}>
                <Avatar.Accessory
                    size={30}
                />
            </Avatar>
    }
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
                {renderAvatar()}
                <View>
                    <Text style={styles.text} >{FullName}</Text>
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
    },
    avatar: {
        marginTop: '20px'
    }

})

export default connect(function (state) {
    return { auth: state.auth }
})(TopProfile);