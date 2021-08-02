import React from 'react'
import {
    Text, View, StyleSheet, TouchableOpacity, Image
} from 'react-native'
import books from '../assets/bookstore.png'

export default function NewsedBox(props) {
    return <View style={style.wrapTitle}>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={style.category}>
                <Image source={books} style={style.bookImage} />
                <Text style={style.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const style = StyleSheet.create({
    wrapTitle: {
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    bookImage: {
        width: 70,
        height: 70,
        borderRadius: 6,
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
    },
    category: {
        alignItems: "center"
    }
})