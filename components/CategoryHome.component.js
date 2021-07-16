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
    
})