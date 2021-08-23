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
import giftIcon4 from "../assets/gift4.png";

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
          <Text style={style.title}>Tặng cộng{"\n"}đồng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveCaNhan}>
        <View style={style.category}>
          <Image source={giftIcon1} style={style.giftIcon1} />
          <Text style={style.title}>Tặng người{"\n"}khó khăn</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveQuy}>
        <View style={style.category}>
          <Image source={giftIcon3} style={style.giftIcon1} />
          <Text style={style.title}>Tặng quỹ{"\n"}từ thiện</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPressGiveCongIch}>
        <View style={style.category}>
          <Image source={giftIcon4} style={style.giftIcon1} />
          <Text style={style.title}>Quyên góp{"\n"}công ích</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  giftIcon1: {
    width: 35,
    height: 35,
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
    fontSize: 15,
    fontFamily: "OpenSans_400Regular",
  },
  category: {
    alignItems: "center",
  },
});
