import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import RNPickerDialog from "rn-modal-picker";
import { AntDesign } from "@expo/vector-icons";
import db from "../db.json";
import { connect } from "react-redux";
import { Button } from "galio-framework";
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

function confirmAddress(props) {
  //khai bao cac local state
  const { navigation } = props;
  const [isShow, setIsShow] = useState(props.show);
  const [isChage, setChange] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const { dispatch } = props;
  //lay ra dia chi
  useEffect(() => {
    // ẩn warning
    LogBox.ignoreLogs([
      "FloatingLabel: `ref` is not a prop. Trying to access it will result in `undefined` being returned",
    ]);
    //lay ra dia chi da duoc luu truoc do

    //lay ra dia chi va gan chung vao cac o input
  }, []);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [data1, setData1] = useState([...db.province]);
  const [data2, setData2] = useState([...db.district]);
  const [data3, setData3] = useState([...db.commune]);
  //ham xu ly su kien chon tinh/tp
  const choseProvince = (item, change) => {
    if (change == true) setChange(true);
    setProvince(item);
    if (item.idProvince != province.idProvince) {
      setDistrict("");
      setCommune("");
    }
    let getDistrict = [...db.district];
    let count = data2.length;
    for (let i = 0; i < count; i++) {
      data2.pop();
    }
    for (let i = 0; i < getDistrict.length; i++) {
      if (getDistrict[i].idProvince == item.idProvince)
        data2.push(getDistrict[i]);
    }
    setData2(data2);
  };
  //ham xu ly su kien chon quan huyen
  const choseDistrict = (item, change) => {
    if (change == true) setChange(true);
    setDistrict(item);
    if (item.idDistrict != district.idDistrict) {
      setCommune("");
    }
    let getCommune = [...db.commune];
    let count = data3.length;
    for (let i = 0; i < count; i++) {
      data3.pop();
    }
    for (let i = 0; i < getCommune.length; i++) {
      if (getCommune[i].idDistrict == item.idDistrict)
        data3.push(getCommune[i]);
    }
    setData3(data3);
  };
  const choseCommune = (item) => {
    setChange(true);
    setCommune(item);
  };
  //Khai bao ham xu ly su kien click
  const pressFunc = () => {
    if (province == "")
      Alert.alert("Thông báo", "Vui lòng điền tỉnh hoặc thành vô", [
        { text: "OK" },
      ]);
    else {
      //neu ctrinh chay vao day tuc la khong co thay doi ve dia chi
      const { dispatch } = props;
      let address = "";
      if (commune.name != null) {
        address = `${commune.name}, ${district.name}, ${province.name}`;
      } else {
        if (district.name != null) {
          address = `${district.name}, ${province.name}`;
        } else {
          if (province.name != null) {
            address = `${province.name}`;
          }
        }
      }

      dispatch({ type: "SAVE_ADDRESS_FILTER", addressFilter: address });
    }
    props.closeModel();
  };
  //ca ham xu ly neu da tung nhap thong tin  dia chi vao


  return (
    <Modal transparent={true} visible={props.show}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ backgroundColor: "#000000aa", flex: 1 }}
      >
        <View style={Styles.border}>
          <View style={Styles.containermain}>
            <View style={Styles.top}>
              <TouchableOpacity onPress={props.onPress}>
                <AntDesign name="close" size={28} color="black" />
              </TouchableOpacity>
              <Text style={Styles.tittleText}>Tìm theo vị trí</Text>
              <TouchableOpacity onPress={() => {
                  dispatch({ type: "RESET_ADDRESS_FILTER"});
                  setProvince("")
                  props.closeModel()}} >
                <Text style={{color: 'red'}}>Bỏ lọc</Text>
              </TouchableOpacity>
            </View>
            <View>
              <RNPickerDialog
                data={data1}
                labelText={"Tỉnh/thành phố"}
                showSearchBar={true}
                showPickerTitle={true}
                listTextStyle={Styles.listTextStyle}
                pickerStyle={Styles.pickerStyle1}
                selectedText={province.name}
                // placeHolderText={this.state.placeHolderText}
                searchBarPlaceHolder={"Search....."}
                searchBarPlaceHolderColor={"#9d9d9d"}
                selectedTextStyle={Styles.selectedTextStyle1}
                placeHolderTextColor={"black"}
                dropDownIconStyle={Styles.dropDownIconStyle1}
                searchBarStyle={Styles.searchBarStyle}
                //dropDownIcon={require('../assets/pin.png')}
                selectedValue={(index, item) => choseProvince(item)}
              />

              <RNPickerDialog
                data={data2}
                labelText={"Quận/huyện"}
                showSearchBar={true}
                showPickerTitle={true}
                listTextStyle={Styles.listTextStyle}
                pickerStyle={Styles.pickerStyle1}
                selectedText={district.name}
                // placeHolderText={this.state.placeHolderText}
                searchBarPlaceHolder={"Search....."}
                searchBarPlaceHolderColor={"#9d9d9d"}
                selectedTextStyle={Styles.selectedTextStyle1}
                placeHolderTextColor={"black"}
                dropDownIconStyle={Styles.dropDownIconStyle1}
                searchBarStyle={Styles.searchBarStyle}
                //dropDownIcon={require('../assets/pin.png')}
                selectedValue={(index, item) => choseDistrict(item)}
              />
              <RNPickerDialog
                data={data3}
                labelText={"Phường/xã/thị trấn"}
                showSearchBar={true}
                showPickerTitle={true}
                listTextStyle={Styles.listTextStyle}
                pickerStyle={Styles.pickerStyle1}
                selectedText={commune.name}
                // placeHolderText={this.state.placeHolderText}
                searchBarPlaceHolder={"Search....."}
                searchBarPlaceHolderColor={"#9d9d9d"}
                selectedTextStyle={Styles.selectedTextStyle1}
                placeHolderTextColor={"black"}
                dropDownIconStyle={Styles.dropDownIconStyle1}
                searchBarStyle={Styles.searchBarStyle}
                //dropDownIcon={require('../assets/pin.png')}
                selectedValue={(index, item) => choseCommune(item)}
              />
            </View>
            <Button style={Styles.touchableButton} onPress={() => pressFunc()}>
              <Text style={Styles.buttonConfirm}>Tìm theo</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  touchableButton: {
    width: "90%",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ff443a",
    borderRadius: 5,
  },
  buttonConfirm: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
  },
  border: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containermain: {
    marginLeft: "5%",
    marginRight: "5%",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderWidth: 3,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E0E0E0",
    borderWidth: 5,
  },
  selectedTextStyle: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
    color: "black",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: -2,
    fontFamily: "OpenSans_400Regular",
  },
  selectedTextStyle1: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
    color: "black",
    fontSize: 18,
    paddingLeft: 10,
    marginTop: 15,
    fontFamily: "OpenSans_400Regular",
  },
  listTextStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  searchBarStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  placeHolderTextStyle: {
    color: "red",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row",
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    left: -40,
  },
  dropDownIconStyle1: {
    width: 10,
    height: 10,
    left: -40,
    marginTop: 15,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 60,
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 2,
    elevation: 0.5,
  },
  pickerStyle1: {
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  top: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    borderColor: "#E0E0E0",
    borderWidth: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    paddingLeft: "2%",
    paddingRight: "2%",
    justifyContent: 'space-between'
  },
  tittleText: {
    fontSize: 20,
    marginLeft: "5%",

    fontFamily: "OpenSans_600SemiBold",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default connect(function (state) {
  return {
    controlConfirmAddress: state.controlConfirmAddress,
    dataCategory: state.dataCategory,
  };
})(confirmAddress);
