import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
export default function NewPostType(props) {
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
    <TouchableOpacity activeOpacity={0.3} onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    marginTop: 10,
  },
  title: {
    // fontWeight: "700",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
});
