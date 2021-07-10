import React from 'react'
import {
    Image, Text, View, StyleSheet, TextInput
} from 'react-native'

import bellImage from '../assets/bell.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function SearchComponent(props) {
    return <View style={style.wrapSeachBox}>
        <TextInput placeholder="Tìm kiếm" style={style.searchInput} />
        <View style={style.wrapBell}>
            <MaterialCommunityIcons name="bell-ring-outline" size={40} color="black" />
        </View>
    </View>
}

const style = StyleSheet.create({
    wrapSeachBox: {
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    searchInput: {
        borderWidth: 1.0,
        width: 250,
        height: 50,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        paddingLeft: 10
    },
    bellImage: {
        height: 50
    },
    wrapBell: {
        height: 50,
        backgroundColor: 'gray',
        borderTopRightRadius: 8,
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomRightRadius: 8
    }
})