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
import axios from "axios";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import PriorityImg from "../assets/priority_preview.png";
import ModalDetailAddress from "./ModalDetailAddress";
import { BottomSheet } from "react-native-elements";
import ModalCamera from "./ModalCamera";
import ListImage from "./ImagesPicker/ListImage";
var { width } = Dimensions.get("window");

function NameAndAddress(props) {
  const [FullName, getName] = useState("");
  const [fullAddress, setFullAddress] = useState(props.infoPost.address);
  const [phonePerRecei, setPhonePerRecei] = useState("");
  const [text, settext] = useState("");
  const [showModelAddress, setshowModelAddress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { dispatch, navigation } = props;
  const data = props.data;
  useEffect(() => {
    const getAddress = async () => {
      let province = await SecureStore.getItemAsync("province");
      let district = await SecureStore.getItemAsync("district");
      let commune = await SecureStore.getItemAsync("commune");
      let addressDetail = await SecureStore.getItemAsync("detail");
      return {
        province: province,
        district: district,
        commune: commune,
        addressDetail: addressDetail,
      };
    };
    getAddress().then((result) => {
      // console.log(result)
      if (result.province != null) {
        let fulladdr =
          result.addressDetail +
          ", " +
          result.commune +
          ", " +
          result.district +
          ", " +
          result.province;
        setFullAddress(fulladdr);
        dispatch({ type: "CONFIRM_ADDRESS", address: fulladdr });
      } else {
        setFullAddress("");
      }
    });
  }, [props.infoPost.address]);
  useEffect(() => {
    const getAvtFunc = async () => {
      if (props.auth.isLogin == true) {
        let Name = await SecureStore.getItemAsync("FullName");
        getName(Name);
      }
    };
    getAvtFunc();
  }, [props.auth]);
  useEffect(() => {
    getPhone(data.AuthorID);
  }, []);
  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img, index) => {
        return (
          <Image
            source={{ uri: img.uri }}
            key={img.uri}
            style={styles.imgUpload}
          />
        );
      });
    }
  };
  const getPhone = async (AuthorID) => {
    try {
      await axios({
        method: "get",
        url: "https://api.smai.com.vn/user/getInfoAuthor?AuthorID=" + AuthorID,
      }).then(async (data) => {
        setPhonePerRecei("0" + data.data.PhoneNumber);
      });
    } catch (e) {
      alert(e);
    }
  };
  const handleImage = () => {
    setIsVisible(true);
  };
  const handleCamera = () => {
    setIsVisible(false);
    setIsShow(true);
  };
  const doneCamera = () => {
    setIsShow(false);
  };
  const handleTextChange = (text) => {
    settext(text);
    dispatch({ type: "GET_NOTE_TRANSAC", noteTransac: text });
  };
  const renderTitleTop = () => {
    if (props.cateSelected) {
      return (
        <>
          <View style={styles.backgroundTitle}>
            <Text style={styles.textTitle}>TH??NG TIN LI??N H???</Text>
          </View>
        </>
      );
    }
  };
  const renderNoteWarning = () => {
    if (!props.cateSelected) {
      return (
        <>
          <View style={styles.row}>
            <Image
              source={PriorityImg}
              style={{ width: width * 0.05, height: width * 0.05 }}
            />
            <Text style={styles.textNote}> L??u ??</Text>
          </View>
          <Text style={styles.textContent}>
            B???n c???n cung c???p ch??nh x??c th??ng tin ????? ng?????i t???ng c?? th??? li??n h???,
            x??c nh???n, g???i ????? cho b???n.
          </Text>
        </>
      );
    }
  };
  const renderPersonReceive = () => {
    if (props.cateSelected) {
      return (
        <>
          <View style={{ flexDirection: "row", marginBottom: "1%" }}>
            <Text style={styles.childTitle}>????? t???ng:{"  "}</Text>
            <Text style={styles.textCategory}>{props.cateSelected}</Text>
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>B??n nh???n </Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
          <Text style={styles.whoGive}>
            {data.NameAuthor} - {phonePerRecei}
          </Text>
          <View style={styles.wrapAddress}>
            <Entypo name="location" size={width * 0.05} color="#BDBDBD" />
            <Text style={styles.address}>{data.address}</Text>
          </View>
        </>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {renderTitleTop()}
          <View style={styles.wrapTop}>
            <View style={styles.wrapName}>
              <Text style={styles.name}>
                {FullName} - {props.auth.PhoneNumber}
              </Text>
            </View>
            <View style={styles.wrapAddress}>
              <Entypo name="location" size={width * 0.05} color="#BDBDBD" />
              <Text style={styles.address}>
                {fullAddress == "" ? "Nh???p ?????a ch???" : fullAddress}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => setshowModelAddress(true)}>
                <Text style={styles.changeAdd}>Thay ?????i</Text>
              </TouchableOpacity>
            </View>

            {renderPersonReceive()}
          </View>

          <View style={styles.wrapBottom}>
            <View style={styles.wrapTitleDescript}>
              <View style={styles.wrapTitleInput}>
                <Text style={styles.titleDescript}>L???i nh???n ho???c m?? t???*</Text>
                <Text style={{ color: "#BDBDBD", fontSize: config.fontsize_4 }}>
                  {text.length}/200
                </Text>
              </View>
              <TextInput
                onChangeText={(text) => {
                  handleTextChange(text);
                }}
                placeholder="Nh???p l???i nh???n ho???c m?? t???"
                editable={true}
                maxLength={140}
                onSubmitEditing={Keyboard.dismiss}
                multiline={true}
                autoFocus={true}
                numberOfLines={3}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.wrapTileImage}>
                H??nh ???nh (t???i ??a 5 h??nh ???nh)
              </Text>
              <ListImage
                navigation={navigation}
                dispatch={dispatch}
                onPress={() => handleImage()}
              />
            </View>
            <ModalDetailAddress
              show={showModelAddress}
              closeModel={() => {
                setshowModelAddress(false);
              }}
              onPress={() => {
                setshowModelAddress(false);
              }}
            />
            {renderNoteWarning()}
          </View>
          <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
          >
            <View style={{ padding: "2%", backgroundColor: "#BCBCBC" }}>
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.itemBottomSheet}
                  onPress={() => handleCamera()}
                >
                  <Text style={styles.textBottomSheet}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemBottomSheet}
                  onPress={() => {
                    setIsVisible(false);
                    props.onPress();
                  }}
                >
                  <Text style={styles.textBottomSheet}>Ch???n ???nh</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.canclePickImage}
              >
                <Text style={[styles.textBottomSheet, { color: "#077DFF" }]}>
                  H???y
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
          <ModalCamera
            show={isShow}
            close={() => setIsShow(false)}
            doneCamera={() => doneCamera()}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTitle: {
    backgroundColor: "#E1E1E1",
    paddingLeft: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  textTitle: {
    color: "#999999",
    fontSize: config.fontsize_3,
    // fontWeight: "bold",
    fontFamily: "OpenSans_700Bold",
  },
  wrapTop: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  wrapBottom: {
    paddingLeft: "4%",
    paddingRight: "4%",
    borderTopColor: "#FFF",
    borderTopWidth: 10,
  },
  wrapTitle: {
    marginTop: "1%",
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
  },
  wrapTitleDescript: {
    marginTop: "2%",
  },
  wrapTitleInput: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  wrapTileImage: {
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    marginTop: "2%",
    marginBottom: "2%",
    color: "#7F7E85",
  },
  borderUpload: {
    width: width * 0.2,
    height: width * 0.2,
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
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
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
  imgUpload: {
    height: width * 0.2,
    width: width * 0.2,
    marginLeft: 5,
    marginTop: "4%",
    borderRadius: 10,
  },
  itemBottomSheet: {
    padding: "2%",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  textBottomSheet: {
    fontSize: config.fontsize_5,
    textAlign: "center",
    color: "#077DFF",
  },
  wrapTypeWho: { flexDirection: "row", alignItems: "center" },
  textWho: {
    textAlign: "center",
    fontFamily: "OpenSans_700Bold",
    fontSize: config.fontsize_3,
    color: "#BDBDBD",
  },
  lineBetween: { flex: 1, height: 1, backgroundColor: "#BDBDBD" },
  whoGive: {
    fontFamily: "OpenSans_700Bold",
    fontSize: config.fontsize_3,
    marginTop: "1%",
    marginBottom: "1%",
  },
  childTitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    color: "#9E9E9E",
  },
  textCategory: {
    textDecorationLine: "underline",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  canclePickImage: {
    padding: "2%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: "2%",
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth };
})(NameAndAddress);
