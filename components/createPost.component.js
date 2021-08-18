import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import AppLoading from 'expo-app-loading';
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

import AddImg from "../assets/add.png";

export default function CreatePosts(props) {
  const { navigation } = props;
  const [selectedValue, setSelectedValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tất cả tin đăng", value: "1" },
    { label: "Tin tặng cộng đồng", value: "2" },
    { label: "Tin cần xin đồ", value: "3" },
  ]);
  const [fontsLoaded, error] = useFonts({
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
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let dropdown;
  if (Platform.OS === "ios") {
    //switch for ios
    dropdown = (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Tất cả tin đăng"
        // zIndex: {10}
        // style={{ height: 41,}}
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          height: 41,
          borderColor: "gray",
        }}
        dropDownContainerStyle={{
          backgroundColor: "white",
          borderColor: "gray",
        }}
      />
    );
  } else {
    //check box
    dropdown = (
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode={"dropdown"}
        style={{ height: 40 }}
        // style={styles.pikerStyle}
      >
        <Picker.Item label="Tất cả tin đăng" value="1" />
        <Picker.Item label="Tin tặng cộng đồng" value="2" />
        <Picker.Item label="Tin cần xin đồ" value="3" />
      </Picker>
    );
  }
  return (
    <View style={styles.wrapContent}>
      <View style={styles.wrapPikerA}>
        {dropdown}
        {/* <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          mode={"dropdown"}
          style={{ height: 40 }}
          // style={styles.pikerStyle}
        >
          <Picker.Item label="Tất cả tin đăng" value="1" />
          <Picker.Item label="Tin tặng cộng đồng" value="2" />
          <Picker.Item label="Tin cần xin đồ" value="3" />
        </Picker> */}
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Tất cả tin đăng"
          // zIndex: {10}
          // style={{ height: 41,}}
          style={{
            
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: 41,
            borderColor: "gray",
          }}
          dropDownContainerStyle={{
            backgroundColor: "white",
            borderColor: "gray",
          }}
        /> */}
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        style={styles.btnCreate}
      >
        <Image source={AddImg} style={{ width: 20, height: 20 }} />
        <Text style={styles.btnText}>&ensp; Đăng tin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContent: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    // marginBottom: 10,
  },
  wrapPikerA: {
    borderWidth: 1,
    // flexDirection: "row",
    borderRadius: 4,
    borderColor: "gray",
    width: "57%",
  },
  wrapPiker: {
    // borderWidth: 1,
    // flexDirection: "row",
    borderRadius: 4,
    borderColor: "gray",
    width: "57%",
  },
  pickerStyle: {
    height: 40,
    // width: '100%',
  },

  btnCreate: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#00a2e8",
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    width: "38%",
    justifyContent: "space-around",
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
    fontFamily: "OpenSans_700Bold"
  },
});
