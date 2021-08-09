import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
} from "react-native";
import ProductComponent from '../components/product.component'
const heightStatusBar = StatusBar.currentHeight;

export default function historyPage(props) {
    const { navigation } = props;
  return (
    <View style={styles.container}>
      <ProductComponent navigation={navigation}/>
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