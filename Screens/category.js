import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import CategoryComponent from '../components/category.component'

const heightStatusBar = StatusBar.currentHeight;
function Category(props) {
    const { navigation } = props;
    const pressFunc = () => {
        if (props.controlThreadTCD == 'tangcongdong') {
            navigation.push('Description');
        } else {
            navigation.push('GiveFor');
        }
    }
    return <View style={style.container}>
        <CategoryComponent onPress={() => pressFunc()} />
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default connect(function (state) {
    return {
      controlThreadTCD: state.controlThreadTCD,
    };
  })(Category);
  