import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import db from "../db.json";
import { connect } from "react-redux";
import config from "../config";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
var { width } = Dimensions.get("window");
function confirmAddress(props) {
  //khai bao cac local state
  const { navigation } = props;
  const [isloading, setIsLoading] = useState(false);
  const [text, settext] = useState("");
  const { dispatch } = props;
  //lay ra dia chi
  useEffect(() => {}, []);
  const giveFor = async () => {
    setIsLoading(true)
    let result = await SecureStore.getItemAsync("token");
    const body = { status: props.status, notereceiver: text };
    await axios({
      method: "put",
      url: "https://smai-app-api.herokuapp.com/transaction/update-status?transactionId=" +
      props.idTrans,
      data: body,
      headers: {
        Authorization: result,
      },
    })
      .then((res) => {
        if (props.status == "waiting") {
          dispatch({ type: "COMPLETE_LOINHAN" });
        } 
        if (props.status == "done") {
          dispatch({ type: "COMPLETE_LOINHAN_CXD" });
        }
        navigation.navigate("Completed");
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
  
};
  return (
    <Modal transparent={true} visible={props.show}>
      <Spinner
        visible={isloading}
        textContent={"Loading..."}
        textStyle={Styles.spinnerTextStyle}
      />
      <View style={Styles.border}>
        <View style={Styles.containermain}>
          <View style={Styles.top}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={props.onPressClose}>
                <AntDesign name="close" size={width * 0.05} color="black" />
              </TouchableOpacity>
              <Text style={Styles.tittleText}>{props.titleModal}</Text>
            </View>

            <TouchableOpacity onPress={() => giveFor()}>
              <Text
                style={{
                  color: "#26c6da",
                  fontFamily: "OpenSans_700Bold",
                  fontSize: config.fontsize_3,
                }}
              >
                {props.titleBtn}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.inputAddress}>
            <TextInput
              style={Styles.input}
              onChangeText={(text) => settext(text)}
              value={text}
              multiline
              placeholder="Ghi thêm(nếu có)"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  border: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#000000aa",
  },
  containermain: {
    flex: 2,
    flexDirection: "column",
    width: "80%",
    borderWidth: 3,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFF",
    height: "50%",
  },
  top: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    borderColor: "#E0E0E0",
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "2%",
    justifyContent: "space-between",
  },
  tittleText: {
    fontSize: config.fontsize_2,
    marginLeft: "5%",
    fontFamily: "OpenSans_600SemiBold",
  },

  inputAddress: {
    width: "95%",
    height: "50%",
  },
  input: {
    fontSize: config.fontsize_5,
    backgroundColor: "white",
    fontFamily: "OpenSans_400Regular",
    paddingLeft: "4%",
    paddingRight: "2%",
    marginTop: "2%",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default connect(function (state) {
  return {
    controlConfirmAddress: state.controlConfirmAddress,
    dataCategory: state.dataCategory,
    infoPost: state.infoPost,
    redirectComplete: state.redirectComplete,
    redirectTransaction: state.redirectTransaction,
  };
})(confirmAddress);
