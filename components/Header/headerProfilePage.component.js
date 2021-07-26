import React, { useEffect,useRef } from 'react';
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import config from '../../config';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import * as SecureStore from 'expo-secure-store';

//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    const menu = useRef();

    const hideMenu = async () => await SecureStore.deleteItemAsync('token')

  
    const showMenu = () => menu.current.show();
    if (props.message == 'ProfilePage') {
        return <View style={styles.wrapAll}>
            <View>
                <Text style={styles.Text}>Tài khoản</Text>
            </View>
            <View >
                <Menu style={styles.Settings} ref={menu} button={<Text onPress={showMenu}> <MaterialIcons  name="settings" size={30} ></MaterialIcons></Text>}>
                    <MenuItem onPress={hideMenu}>Đăng xuất</MenuItem>
                    {/* <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                    <MenuItem onPress={hideMenu} disabled>
                        Menu item 3
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
                </Menu>
           
            </View>
        </View>
    }
    else {
        return <View style={styles.wrapAll}>
            <View>
                <Text style={styles.Text}>Tài khoản</Text>
            </View>
        </View>
    }

}
const styles = StyleSheet.create({
    wrapAll: {
        marginTop: config.heightStatusBar,
        height: config.header,
        backgroundColor: 'red',
        alignItems: 'center',
        paddingLeft:'3%',
        paddingRight:'3%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    Settings: {
        padding: 8,
        color: "#fff",
        fontSize: config.fontsize_1,
    },
    Text: {
        padding: 8,
        fontSize: config.fontsize_2,
        color: "#fff"
    },
    icon_settings: {


    }
})

export default connect(function (state) {
    return { auth: state.auth }
})(HeaderLoginPage);