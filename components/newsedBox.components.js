import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import books from "../assets/bookstore.png";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
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
          <Image source={books} style={style.bookImage} />
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
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  title: {
    paddingTop: 5,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
  },
  category: {
    alignItems: "center",
  },
});
