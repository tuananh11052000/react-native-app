import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import ProductComponent from '../components/product.component'
import axios from 'axios'

export default function historyPage(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ProductComponent navigation={navigation}  type="history"/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    child: {

    }, gift_component: {
        paddingLeft: 30,
        paddingRight: 30
    },
    wrap_search_bgr: {
        flex: 1
    },

});