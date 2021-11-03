import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import CategoryComponent from '../components/category.component'

const heightStatusBar = StatusBar.currentHeight;
function Category(props) {
    const { navigation, dispatch } = props;
    const pressFunc = () => {
        if (props.controlThreadTCD == 'tangcongdong') {
            navigation.push('Description', {name: 'Xác nhận gửi tặng'});
        } else {
            dispatch({ type: "SET_GUI" });
            navigation.push('GiveFor',{ name: 'Gửi tặng đến' });
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
      redirectTransaction: state.redirectTransaction
    };
  })(Category);
  