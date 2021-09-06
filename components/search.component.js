import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import bgrImage from "../assets/background.jpg";
import bell from "../assets/bell.png";
import { TouchableOpacity } from "react-native";
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");
export default function SearchComponent(props) {
  return (
    <View style={style.wrapSearchBgr}>
      <Image source={bgrImage} style={style.bgr_style} />
      <View style={style.wrapSearchBox}>
        <TextInput
          placeholder="Tìm kiếm"
          style={style.searchInput}
          onTouchStart={() => props.onPress()}
        />
        <TouchableOpacity style={style.wrapBell} activeOpacity={0.95} onPress={() => props.pressAnnounce()}>
          <Image source={bell} style={style.bellImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapSearchBgr: {
    flexDirection: "column",
    height: SCREEN_WIDTH*0.4,
    backgroundColor: "#DDD",
    marginBottom: '8%',
    position: 'relative'
  },
  wrapSearchBox: {
    flexDirection: "row",
    justifyContent: "center",
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -25,
  },
  wrapSearch: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchInput: {
    minWidth: "70%",
    maxWidth: "70%",
    height: 50,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    paddingLeft: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#847B80",
  },
  bellImage: {
    height: 28,
    width: 28,
    marginRight: 5,
    marginLeft: 5,
  },
  wrapBell: {
    height: 50,
    backgroundColor: "#EBEBEB",
    borderTopRightRadius: 8,
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomRightRadius: 8,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#847B80",
  },
  bgr_style: {
    height: SCREEN_WIDTH*0.4,
    width: '100%',
  },
});
