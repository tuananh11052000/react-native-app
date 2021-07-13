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
        backgroundColor: 'gray',
        paddingTop: 3,
        paddingBottom: 3
    },
    title: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    }
})