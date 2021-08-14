import React from 'react'
import {
    Image, Text, View, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native'

import giftIcon2 from "../assets/gift2.png"
import giftIcon1 from "../assets/gift1.png"
import giftIcon3 from "../assets/gift3.png"
import giftIcon4 from "../assets/gift4.png"

const { width, height } = Dimensions.get('window')

export default function GiftComponent(props) {
    return <View style={style.wrapCategory}>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPressTCD}>
            <View style={style.category}>
                <Image source={giftIcon2} style={style.giftIcon1} />
                <Text style={style.title}>Tặng cộng{'\n'}đồng</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveCaNhan}>
            <View style={style.category}>
                <Image source={giftIcon1} style={style.giftIcon1} />
                <Text style={style.title}>Tặng người{'\n'}nghèo</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveQuy}>
            <View style={style.category}>
                <Image source={giftIcon3} style={style.giftIcon1} />
                <Text style={style.title}>Tặng quỹ{'\n'}từ thiện</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveCongIch}>
            <View style={style.category}>
                <Image source={giftIcon4} style={style.giftIcon1} />
                <Text style={style.title}>Quyên góp{'\n'}công ích</Text>
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
        paddingBottom: 20,
        flex: 1,
        alignItems: 'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
    },
    title: {
        textAlign: 'center',
        fontSize: 15,
    },
    category: {
        alignItems: "center"
    }
})