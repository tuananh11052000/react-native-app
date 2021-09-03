import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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
import giftIcon3 from "../assets/gift3.png";
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
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressTCD}>
        <View style={style.category}>
          <Image source={giftIcon2} style={style.giftIcon1} />
          <Text style={style.title}>Có đồ cần tặng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressCXD}>
        <View style={style.category}>
          <Image source={giftIcon1} style={style.giftIcon1} />
          <Text style={style.title}>Cần hỗ trợ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressMedicalAdvise}>
        <View style={style.category}>
          <Image source={doctor} style={style.doctorIcon} />
          <Text style={style.titleDoctor}>Tư vấn y tế</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  giftIcon1: {
    width: 45,
    height: 45,
  },
  doctorIcon: {
    width: 50,
    height: 50,
  },
  wrapCategory: {
    paddingBottom: 10,
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
  },
  title: {
    textAlign: "center",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    marginTop: '4%'
  },
  titleDoctor: {
    textAlign: "center",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    marginTop: '2%'
  },

  category: {
    alignItems: "center",
  },
});
