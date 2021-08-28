import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import AppLoading from "expo-app-loading";
import config from '../config';
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";

import AddImg from "../assets/add.png";

// import CreatePosts from "../components/createPost.component";
import {
  MyProductComponent,
  DonateProductComponent,
  HelpProductComponent,
} from "../components/myproduct.component";
// import MyProductComponent from "../components/myproduct.component";

function CreatePost(props) {
  const { navigation } = props;
  const [selectedValue, setSelectedValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Tất cả tin đăng", value: "1" },
    { label: "Tin tặng cộng đồng", value: "2" },
    { label: "Tin cần hỗ trợ", value: "3" },
  ]);
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
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
      >
        <Picker.Item label="&ensp;Tất cả tin đăng " value="1" style={{fontSize: config.fontsize_3}} />
        <Picker.Item label="&ensp;Tin tặng cộng đồng" value="2" style={{fontSize: config.fontsize_3}}/>
        <Picker.Item label="&ensp;Tin cần hỗ trợ" value="3" style={{fontSize: config.fontsize_3}}/>
      </Picker>
    );
  }

  let product;
  if (props.auth.isLogin == false) {
    product = (
      <Text style={styles.textFalse}>Đăng nhập để xem tin của bạn</Text>
    );
  } else if (selectedValue == 1 || value == 1) {
    product = <MyProductComponent navigation={navigation} />;
  } else if (selectedValue == 2 || value == 2) {
    product = <DonateProductComponent navigation={navigation} />;
  } else {
    product = <HelpProductComponent navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1 }}>
        {/* <CreatePosts onPress={() => navigation.navigate("PostType")} /> */}
        <View style={styles.wrapContent}>
          <View style={styles.wrapPikerA}>{dropdown}</View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (props.auth.isLogin == true) {
                navigation.navigate("PostType");
              } else navigation.replace("Authentication");
            }}
            style={styles.btnCreate}
          >
            <Image source={AddImg} style={{ width: 20, height: 20 }} />
            <Text style={styles.btnText}>&ensp; Đăng tin</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ zIndex: 0 }}>
        <ScrollView style={{ zIndex: 100 }} nestedScrollEnabled={true}>
          {product}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  wrapContent: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wrapPikerA: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
    width: "57%",
  },
  wrapPiker: {
    borderRadius: 4,
    borderColor: "gray",
    width: "57%",
  },
  pickerStyle: {
    height: 40,
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
    fontSize: config.fontsize_3,
    color: "#000",
    fontFamily: "OpenSans_700Bold",
  },
  textFalse: {
    color: "gray",
    fontSize: 15,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
});

export default connect(function (state) {
  return { auth: state.auth, infoPost: state.infoPost };
})(CreatePost);
