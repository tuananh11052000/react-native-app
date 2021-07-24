import React from 'react'
import {
    Image, Text, View, StyleSheet, TextInput, ScrollView, ImageBackground
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import bgrImage from '../assets/background.jpg'


export default function SearchComponent(props) {
    return <View style={style.wrapSearchBgr}>
        <Image source={bgrImage} style={style.bgr_style} />
        <View style={style.wrapSeachBox}>
            <TextInput placeholder="Tìm kiếm" style={style.searchInput} />
            <View style={style.wrapBell}>
                <MaterialCommunityIcons name="bell-ring-outline" size={40} color="black" />
            </View>
        </View>
    </View>
}

const style = StyleSheet.create({
    wrapSearchBgr: {
        flexDirection: 'column',
        height: 250
    },
    wrapSeachBox: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    },
    searchInput: {
        borderWidth: 1.0,
        minWidth: '70%',
        maxWidth: '70%',
        height: 50,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        paddingLeft: 10,
        backgroundColor: 'white'
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
    }, bgr_style: {
        height: 210,
        width: '100%',
        
    }
})