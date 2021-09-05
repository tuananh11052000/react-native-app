import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import config from '../config';
import ProductTitleConnect from '../components/productTitleConnect.component';

export default function Connection(props) {
  
  return (
    <SafeAreaView style={styles.container}>
        <ProductTitleConnect title="bạn tặng" type="Đăng tặng ?"/>
        <ProductTitleConnect title="nhận tặng" type="Cần hỗ trợ ?"/>
        <Text style={styles.textTitle}>Danh sách</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFF4",
  },
  textTitle: {
    fontSize: config.fontsize_3,
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '2%',
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
  }
 
});
