import React from 'react'
import {
    Image, Text, View, StyleSheet, TextInput
} from 'react-native'

import bellImage from '../assets/bell.png'


export default function SearchComponent(props) {
    return <View style={style.wrapSeachBox}>
        <TextInput placeholder="Tìm kiếm" />
        <Image source={bellImage} />
    </View>
}

const style = StyleSheet.create({
    wrapSeachBox: {
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchInput: {
        borderWidth: 1.0,
        borderColor: '#ffffff'
    }
})