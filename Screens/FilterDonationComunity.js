import React from 'react'
import { Text } from 'react-native';
import { View, StyleSheet, StatusBar } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { connect } from 'react-redux'
import ButtonConfirm from '../components/buttonConfirm.components';
import CategoryCheckBoxComponent from '../components/categoryCheckBox.component'

const heightStatusBar = StatusBar.currentHeight;
function Category(props) {
    const { navigation } = props;
    const { dispatch } = props;
    const pressFunc = () => {
        if (props.controlThreadTCD == 'tangcongdong') {
            navigation.push('Description');
        } else {
            navigation.push('GiveFor');
        }
    }
    return <View style={style.container}>
        <CategoryCheckBoxComponent onPress={() => {
            navigation.navigate("PostDonation")

        }}/>
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})
export default connect(function (state) {
    return {
      controlThreadTCD: state.controlThreadTCD,
      dataCategory: state.dataCategory,
    };
  })(Category);
  