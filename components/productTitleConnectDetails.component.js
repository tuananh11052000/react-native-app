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
import config from "../config";
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
import { Entypo, Fontisto } from "@expo/vector-icons";
export default function ProductTitleConnectDetails(props) {
  const { navigation, dispatch } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.wrapBottom}>
          <View style={styles.wrapBottomLeft}>
            <View style={styles.wrapTopLeft}>
              <Text style={styles.textTopLeft}>{props.title}</Text>
            </View>
            <Text style={styles.textTopRight}>22 - 28/11/2021 </Text>
          </View>
          <View style={{ width: "65%", justifyContent: "center" }}>
            <View style={styles.wrapThings}>
              <Text style={styles.textThings}>Hiện vật</Text>
              <TouchableOpacity onPress={() => props.onPress()}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.numberThings}>12 ĐH</Text>
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapMoney}>
              <Text style={styles.textThings}>Tiền</Text>
              <TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.numberThings}>0 VNĐ</Text>
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: "4%",
    marginRight: "4%",
    marginTop: "3%",
    marginBottom: "0.2%",
    padding: "2%",
    backgroundColor: "#FFF",
  },
  wrapTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  wrapTopLeft: { flexDirection: "row", alignItems: "center" },
  textTopRight: {
    color: "#BDBDBD",
    fontFamily: "OpenSans_400Regular_Italic",
    fontSize: config.fontsize_3,
  },
  textTopLeft: {
    marginLeft: "10%",
    marginTop: "10%",
    fontFamily: "OpenSans_700Bold",
    fontSize: config.fontsize_3,
  },
  wrapBottom: { flexDirection: "row" },
  wrapBottomLeft: {
    width: "35%",
    justifyContent: "center",
  },
  textBottomLeft: {
    color: "#26c6da",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
  },
  wrapThings: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "2%",
    marginBottom: "2%",
    borderColor: "#DDD",
    borderBottomWidth: 0.6,
  },
  textThings: {
    color: "#000",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  numberThings: {
    color: "#000",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapMoney: { flexDirection: "row", justifyContent: "space-between" },
});
