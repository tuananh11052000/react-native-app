import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
export default function TitleComponent(props) {
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
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  wrapTitle: {
    backgroundColor: "#EBEBEB",
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
  },
});
