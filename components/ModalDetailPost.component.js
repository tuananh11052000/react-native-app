import React, { Fragment, Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import config from "../config";
var { width } = Dimensions.get("window");
export default function App(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={props.show} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={styles.wrapModel}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DDD",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft: "2%",
                paddingTop: "2%",
                paddingBottom: "2%",
              }}
            >
              <TouchableOpacity onPress={props.onPress}>
                <AntDesign name="close" size={width * 0.05} color="black" />
              </TouchableOpacity>
              <Text style={styles.titleModel}>Thông tin</Text>
            </View>
            <Text>Khang</Text>
            <TouchableOpacity onPress={() => props.onPress()}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapModel: {
    backgroundColor: "#ffffff",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "10%",
    marginBottom: "10%",
    borderRadius: 10,
    flex: 1,
  },
  titleModel: {
    fontSize: config.fontsize_2,
    marginLeft: "5%",
    fontFamily: "OpenSans_600SemiBold",
  },
});
