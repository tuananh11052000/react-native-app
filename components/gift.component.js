import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from "../config";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import giftIcon2 from "../assets/gift2.png";
import giftIcon1 from "../assets/gift1.png";
import giftIcon from "../assets/gift.png";
import doctor from "../assets/doctorLarge.png";

const { width, height } = Dimensions.get("window");

export default function GiftComponent(props) {
  const [fontsLoaded, error] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={style.wrapCategory}>
      <TouchableOpacity onPress={props.onPressTCD} style={style.category}>
        <Image source={giftIcon} style={style.giftIcon1} />
        <Text style={style.title}>Tặng đồ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressCXD} style={style.category}>
        <Image source={giftIcon1} style={style.giftIcon1} />
        <Text style={style.title}>Cần giúp đỡ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onPressMedicalAdvise}
        style={style.category}
      >
        <Image source={doctor} style={style.doctorIcon} />
        <Text style={style.titleDoctor}>Y tế 0đ</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  giftIcon1: {
    width: width * 0.06,
    height: width * 0.06,
  },

  doctorIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  wrapCategory: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    marginTop: "2%",
  },
  titleDoctor: {
    textAlign: "center",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    marginTop: "2%",
  },

  category: {
    alignItems: "center",
    width: width * 0.25,
    zIndex: 2
  },
});
