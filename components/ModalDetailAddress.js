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
  Dimensions,
} from "react-native";
import RNPickerDialog from "rn-modal-picker";
import { AntDesign } from "@expo/vector-icons";
import db from "../db.json";
import { connect } from "react-redux";
import { Button } from "galio-framework";
import config from "../config";
import { TextInput } from "react-native-paper";
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
  const [isShow, setIsShow] = useState(props.show);
  const [isChage, setChange] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [addressDetail, setAddressDetail] = useState(" ");
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
    if ( province == "" || district == "" || commune == "" || addressDetail.trim() == "") {
      if (province == "") {
        Alert.alert("Thông báo", "Vui lòng chọn tỉnh/thành phố", [
          { text: "OK" },
        ]);
      } else {
        if (district == "") {
          Alert.alert("Thông báo", "Vui lòng chọn quận/huyện", [
            { text: "OK" },
          ]);
        } else {
          if (commune == "") {
            Alert.alert("Thông báo", "Vui lòng chọn phường/xã", [
              { text: "OK" },
            ]);
          } else {
            if (addressDetail.trim() == "") {
              Alert.alert("Thông báo", "Vui lòng điền đường/ấp/thôn/số nhà", [
                { text: "OK" },
              ]);
            }
          }
        }
      }
    } else {
      //neu ctrinh chay vao day tuc la khong co thay doi ve dia chi
      async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      save("idProvince", province.idProvince).then(() => {
        save("province", province.name).then((res) => {
          save("idDistrict", district.idDistrict).then((res) => {
            save("district", district.name).then((res) => {
              save("idCommune", commune.idCoummune).then((res) => {
                save("commune", commune.name).then((res) => {
                  save("detail", addressDetail).then((res) => {
                    const { dispatch } = props;
                    const address = `${addressDetail.trim()}, ${
                      commune.name
                    }, ${district.name}, ${province.name}`;
                    dispatch({ type: "CONFIRM_ADDRESS", address: address });
                    props.closeModel();
                  });
                });
              });
            });
          });
        });
      });
    }
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
                <AntDesign name="close" size={width * 0.05} color="black" />
              </TouchableOpacity>
              <Text style={Styles.tittleText}>Địa chỉ của bạn</Text>
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
            <View style={Styles.inputAddress}>
              <TextInput
                label="Đường/ấp/thôn/số nhà,..."
                style={Styles.styleLabel}
                mode={"flat"}
                dense={"true"}
                autoCapitalize="none"
                value={addressDetail}
                multiline
                onChangeText={(text) => {
                  setAddressDetail(text);
                }}
                theme={{
                  colors: {
                    primary: "gray",
                  },
                }}
              />
            </View>
            <Button style={Styles.touchableButton} onPress={() => pressFunc()}>
              <Text style={Styles.buttonConfirm}>Thay đổi</Text>
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
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  border: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#000000aa",
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
    fontSize: config.fontsize_2,
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
    fontSize: config.fontsize_5,
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
  },
  tittleText: {
    fontSize: config.fontsize_2,
    marginLeft: "5%",

    fontFamily: "OpenSans_600SemiBold",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  inputAddress: {
    width: "95%",
  },
  styleLabel: {
    fontSize: config.fontsize_5,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "gray",
    overflow: "hidden",
    fontFamily: "OpenSans_400Regular",
  },
});
export default connect(function (state) {
  return {
    controlConfirmAddress: state.controlConfirmAddress,
    dataCategory: state.dataCategory,
    infoPost: state.infoPost,
  };
})(confirmAddress);
