import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
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
import config from "../config";
import PriorityImg from "../assets/priority_preview.png";
export default function NameAndAddress(props) {
  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.wrapTop}>
            <View style={styles.wrapTitle}>
              <Text style={styles.title}>NGƯỜI TẶNG</Text>
            </View>
            <View style={styles.wrapName}>
              <Text style={styles.name}>Nguyễn Hoàng An An - 0938566789</Text>
            </View>
            <View style={styles.wrapAddress}>
              <Entypo name="location" size={20} color="#BDBDBD" />
              <Text style={styles.address}>
                90 Võ Văn Ngân, phường Linh Chiểu, Tp Thủ Đức, Tp Hồ Chí Minh
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity>
                <Text style={styles.changeAdd}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapBottom}>
            <View style={styles.wrapTitleDescript}>
              <Text style={styles.titleDescript}>Lời nhắn hoặc mô tả*</Text>
              <TextInput
                editable={true}
                maxLength={200}
                onSubmitEditing={Keyboard.dismiss}
                multiline={true}
                numberOfLines={4}
                style={styles.input}
              />
            </View>
            <View style={styles.wrapTitleDescript}>
              <Text style={styles.titleDescript}>Hình ảnh (tối đa 5 hình)</Text>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  style={styles.borderUpload}
                  // onPress={() => props.onPress()}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={70}
                    color="#B1B1B1"
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.row}>
              <Image source={PriorityImg} style={{ width: 26, height: 26 }} />
              <Text style={styles.textNote}> Lưu ý</Text>
            </View>
            <Text style={styles.textContent}>
              Bạn cần cung cấp chính xác thông tin để người tặng có thể liên hệ, xác nhận, gửi đồ cho bạn.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapTop: {
    paddingLeft: "4%",
    paddingRight: "4%",
    borderBottomColor: "#FFF",
    borderBottomWidth: 10,
  },
  wrapBottom: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  wrapTitle: {
    marginTop: "2%",
    paddingBottom: "2%",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  title: {
    color: "#7F7E85",
    fontFamily: "OpenSans_700Bold",
    fontSize: config.fontsize_3,
  },
  wrapName: {
    marginTop: "2%",
    marginBottom: "2%",
  },
  name: {
    color: "#000",
    fontFamily: "OpenSans_700Bold",
    fontSize: config.fontsize_3,
  },
  wrapAddress: {
    flexDirection: "row",
    paddingRight: "2%",
  },
  address: {
    color: "#000",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    marginLeft: "4%",
  },
  changeAdd: {
    color: "#26c6da",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    marginBottom: "2%",
  },
  wrapTitleDescript: {
    marginTop: "2%",
  },
  titleDescript: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    color: "#7F7E85",
  },
  input: {
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: "2%",
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  borderUpload: {
    width: 90,
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#B1B1B1",
    borderWidth: 2,
    marginTop: "4%",
    marginBottom: "4%",
    backgroundColor: "#FFF",
  },
  row: {
    marginTop: '5%',
    flexDirection: "row",
    alignItems: 'center'
  },
  textNote: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
  },
  textContent: {
    textAlign: "justify",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
  },
});
