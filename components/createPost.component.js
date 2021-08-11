import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";

import AddImg from "../assets/add.png";

export default function CreatePosts(props) {
  // const { navigation } = props;
  // const [selectedValue, setSelectedValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tất cả tin đăng", value: "1" },
    { label: "Tin tặng cộng đồng", value: "2" },
    { label: "Tin cần xin đồ", value: "3" },
  ]);
  return (
    <View style={styles.wrapContent}>
      <View style={styles.wrapPiker}>
        {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode={'dropdown'}
        style={{ height: 40,}}
      // style={styles.pikerStyle}
      >
        <Picker.Item label="Tất cả tin đăng" value="1" />
        <Picker.Item label="Tin tặng cộng đồng" value="2" />
        <Picker.Item label="Tin cần xin đồ" value="3" />
      </Picker> */}
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
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  wrapPiker: {
    // borderWidth: 1,
    // flexDirection: "row",
    borderRadius: 4,
    borderColor: "gray",
    width: "60%",
  },
  pickerStyle: {
    height: 40,
    // width: '100%',
  },

  btnCreate: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#018786",
    height: 41,
    paddingHorizontal: 18,
    borderRadius: 4,
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
    textTransform: "uppercase",
    color: "#fff",
  },
});
