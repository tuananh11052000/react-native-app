import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//We will consider isLogin state and decide what will appear on the screen
function TopProfile(props) {
    const { dispatch } = props;
    return <View style={styles.wrapAll}>
        <MaterialIcons name="account-circle" size={96} color="gray" />
        <Text>Nguyễn Duy Phú</Text>
    </View>
}

const styles = StyleSheet.create({
    wrapAll: {
        height: 110,
        backgroundColor: '#4E6E58',
        padding: 7,
        flexDirection: 'row',
        width: '100%'
    },
    wrap_avatar: {
        height: 80,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(function (state) {
    return { auth: state.auth }
})(TopProfile);