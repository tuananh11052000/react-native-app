import React from 'react'
import {
    Text, View, StyleSheet, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
//We will consider isLogin state and decide what will appear on the screen
function HeaderLoginPage(props) {
    const { dispatch } = props;
    return <View style={styles.wrapAll}>
        <Text>row2</Text>
    </View>
}

const styles = StyleSheet.create({
    wrapAll: {
        height: 60,
        backgroundColor: 'red',
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
})(HeaderLoginPage);