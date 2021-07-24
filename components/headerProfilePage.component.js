import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import config from '../config';
//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    if (props.message == 'ProfilePage') {
        return <View style={styles.wrapAll}>
            <View>
                <Text style={styles.Text}>Tài khoản</Text>
            </View>
            <View >
                <MaterialIcons style={styles.Settings} name="settings" size={30} ></MaterialIcons>
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
        padding: 7,
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