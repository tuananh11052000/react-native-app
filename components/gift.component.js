import React from 'react'
import {
    Image, Text, View, StyleSheet, TouchableOpacity
} from 'react-native'

import giftIcon2 from "../assets/gift2.png"
import giftIcon1 from "../assets/gift1.png"
import giftIcon3 from "../assets/gift3.png"
import giftIcon4 from "../assets/gift4.png"

export default function GiftComponent(props) {
    return <View style={style.wrapCategory}>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={style.category}>
                <Image source={giftIcon2} style={style.giftIcon1} />
                <Text style={style.title}>Tặng cộng đồng</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
            <View style={style.category}>
                <Image source={giftIcon1} style={style.giftIcon1} />
                <Text style={style.title}>Tặng người nghèo</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
            <View style={style.category}>
                <Image source={giftIcon3} style={style.giftIcon1} />
                <Text style={style.title}>Tặng quỹ từ thiện</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
            <View style={style.category}>
                <Image source={giftIcon4} style={style.giftIcon1} />
                <Text style={style.title}>Quyên góp công ích</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const style = StyleSheet.create({
    giftIcon1: {
        width: 40,
        height: 40
    },
    wrapCategory: {
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        width: 70,
        textAlign: 'center'
    },
    category: {
        alignItems: "center"
    }
})