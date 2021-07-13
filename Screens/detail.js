import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";

function Detail(props) {
    function addNumber(){
        var { dispatch } = props;
        dispatch({ type: 'ADD', value: 1 });
    }
    return (
        <View style={styles.container}>
            <Text onPress={addNumber}>{props.num}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default connect(function (state) {
    return { num: state.countNumber}
})(Detail);