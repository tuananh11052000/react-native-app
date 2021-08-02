import React from 'react'
import {
    Text, View, StyleSheet
} from 'react-native'

export default function TitleComponent(props) {
    return <View style={style.wrapTitle}>
        <Text style={style.title}>{props.title}</Text>
    </View>
}

const style = StyleSheet.create({
    wrapTitle: {
        backgroundColor: '#EBEBEB',
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 18,
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#7F7E85',
        textTransform: 'uppercase',
    }
})