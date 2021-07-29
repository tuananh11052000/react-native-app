import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import CategoryComponent from '../components/category.component'

const heightStatusBar = StatusBar.currentHeight;
export default function Category(props) {
    const { navigation } = props;
    return <View style={style.container}>
        <CategoryComponent onPress={() => navigation.push('Description')} />
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: heightStatusBar
    }
})