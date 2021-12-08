import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import ticket from "../../assets/ticket.png";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
var { width } = Dimensions.get("window");
import config from "../../config";
export default function NewsedBox(props) {
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={style.wrapTitle}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => props.onPress()}>
        <View style={style.category}>
          <View style={{ borderColor: "#E0E0E0", borderWidth: 1, borderRadius: 15, backgroundColor: '#FFF'}}>
            <Image source={ticket} style={style.bookImage} />
          </View>

          <Text style={style.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  wrapTitle: {
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  bookImage: {
    width: width*0.15,
    height: width*0.15,
    borderRadius: 6,
  },
  title: {
    paddingTop: 5,
    fontSize: config.fontsize_3,
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
  },
  category: {
    alignItems: "center",
  },
});
