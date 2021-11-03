import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, Feather } from "@expo/vector-icons";
import config from "../config";
import { BottomSheet } from "react-native-elements";
import ModalCamera from "./ModalCamera";
import ModalDetailAddress from "./ModalDetailAddress";
import ModelShowCategory from './ModalShowCategorySelected.component';
import * as SecureStore from "expo-secure-store";
var { width } = Dimensions.get("window");

const UselessTextInput = (props) => {
  return (
    <TextInput
      placeholder="Viết mô tả..."
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      style={{
        textAlignVertical: "top",
        paddingLeft: 5,
        fontSize: config.fontsize_5,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: "OpenSans_400Regular",
      }}
    />
  );
};

const titleDetail = (props) => {
  const { dispatch } = props;
  const [number, onChangeNumber] = useState(null);
  const [value, onChangeText] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [FullName, getName] = useState("");
  const [showModelAddress, setshowModelAddress] = useState(false);
  const [fullAddress, setFullAddress] = useState(props.infoPost.address);
  const [isShowModelCate, setisShowModelCate] = useState(false);
  useEffect(() => {
    const getAvtFunc = async () => {
      if (props.auth.isLogin == true) {
        let Name = await SecureStore.getItemAsync("FullName");
        getName(Name);
      }
    };
    getAvtFunc();
  }, []);
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
  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: img.uri }} style={styles.imgUpload} />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              <AntDesign
                name="closecircle"
                size={width * 0.05}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  const removeImage = (index) => {
    let listImage = props.infoPost.image;
    listImage.splice(index, 1);
    dispatch({ type: "GET_IMG", image: listImage });
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
  const getTypeAuthor = () => {
    if (props.infoPost.TypeAuthor == "Cá nhân") return "Hoàn cảnh khó khăn";
    else return props.infoPost.TypeAuthor;
  };
  const renderInfor = () => {
    if (props.infoPost.TypeAuthor == "tangcongdong") {
      return (
        <View style={{ marginBottom: "2%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.childTitle}>Đồ tặng:{"  "}</Text>
            <Text style={styles.textCategory}>
              {props.infoPost.NameProduct[0].NameProduct}
            </Text>
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>Bên nhận{" "}</Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
          <Text style={styles.whoGive}>Cộng đồng</Text>
          <View style={{ flexDirection: "row", marginTop: "2%" }}>
            <Feather name="info" size={width * 0.04} color="#9E9E9E" />
            <Text style={styles.textNote}>
              {" "}
              Cộng đồng ai cần sẽ liên hệ với bạn
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ marginBottom: "2%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.childTitle}>Đối tương:{"  "}</Text>
            <Text style={styles.textCategory}>{getTypeAuthor()}</Text>
          </View>
          <View style={styles.wrapTypeWho}>
            <View>
              <Text style={styles.textWho}>Cần hỗ trợ{" "}</Text>
            </View>
            <View style={styles.lineBetween} />
          </View>
          <View style={styles.wraptCategory}>
            <Text style={styles.textContent}>
              Danh mục xin: {props.infoPost.NameProduct.length}
            </Text>
            <TouchableOpacity onPress={() => setisShowModelCate(true)}>
              <Text style={styles.wraptManyCategories}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.backgroundTitle}>
            <Text style={styles.textTitle}>THÔNG TIN LIÊN HỆ</Text>
          </View>
          <View style={styles.paddingLR}>
            <Text style={styles.textName}>{FullName}</Text>
            <View style={styles.wrapAddress}>
              <Text style={styles.childTitle}>Địa chỉ:{"  "}</Text>
              <Text style={styles.textAddress}>{fullAddress}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => setshowModelAddress(true)}>
                <Text style={styles.changeAdd}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            {renderInfor()}
          </View>
          <View style={styles.backgroundTitle}>
            <Text style={styles.textTitle}>THÔNG TIN MÔ TẢ</Text>
          </View>
          <View style={styles.paddingLR}>
            <Text style={styles.childTitle}>Tiêu đề*</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                dispatch({ type: "GET_TITLE", title: text })
              }
              value={number}
              maxLength={50}
              placeholder="Viết tiêu đề hoặc lời nhắn"
            />
            <Text style={styles.childTitle}>Ghi chú thêm(nếu có)</Text>
            <View style={styles.inputDescription}>
              <UselessTextInput
                multiline
                onChangeText={(text) =>
                  dispatch({ type: "GET_NOTE", note: text })
                }
              />
            </View>
            <Text style={styles.childTitle}>Hình ảnh (tối đa 5 hình ảnh)</Text>
            <ScrollView horizontal={true}>
              <TouchableOpacity
                style={styles.borderUpload}
                onPress={() => handleImage()}
              >
                <AntDesign
                  name="clouduploado"
                  size={width * 0.15}
                  color="#B1B1B1"
                />
              </TouchableOpacity>
              {renderIMG()}
            </ScrollView>
          </View>
        </View>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          <View style={styles.childSheet}>
            <View style={styles.topSheet}>
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
                <Text style={styles.textBottomSheet}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.btnCancel}
            >
              <Text style={[styles.textBottomSheet, { color: "#077DFF" }]}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
        <ModalCamera
          show={isShow}
          close={() => setIsShow(false)}
          doneCamera={() => doneCamera()}
        />
        <ModalDetailAddress
          show={showModelAddress}
          closeModel={() => {
            setshowModelAddress(false);
          }}
          onPress={() => {
            setshowModelAddress(false);
          }}
        />
        <ModelShowCategory show={isShowModelCate} onPress={() => {setisShowModelCate(false)}} 
        dataNameProduct={props.infoPost.NameProduct}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  paddingLR: { paddingLeft: "4%", paddingRight: "4%" },
  textName: { fontFamily: "OpenSans_700Bold", fontSize: config.fontsize_3 },
  wrapAddress: { flexDirection: "row", width: "90%", marginTop: "2%" },
  textAddress: {
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
  },
  changeAdd: {
    color: "#26c6da",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
  },
  textCategory: {
    textDecorationLine: "underline",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  wrapTypeWho: { flexDirection: "row", alignItems: "center", marginTop: "2%" },
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
    marginTop: "2%",
  },
  textContent: {
    color: "#000",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  wraptCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wraptManyCategories: {
    color: "#26c6da",
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
  },
  textNote: { fontFamily: "OpenSans_400Regular", color: "#F44336" },
  backgroundTitle: {
    backgroundColor: "#E1E1E1",
    paddingLeft: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginBottom: "2%",
  },
  textTitle: {
    color: "#999999",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_700Bold",
  },
  childTitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: config.fontsize_3,
    color: "#9E9E9E",
  },
  topSheet: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  input: {
    height: width * 0.1,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 8,
    paddingLeft: 10,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#B1B1B1",
    fontSize: config.fontsize_5,
    backgroundColor: "white",
    fontFamily: "OpenSans_400Regular",
  },
  inputDescription: {
    borderColor: "#B1B1B1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  borderUpload: {
    width: width * 0.2,
    height: width * 0.2,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#B1B1B1",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#FFF",
  },
  imgUpload: {
    height: width * 0.2,
    width: width * 0.2,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  wrapAllImage: {
    flexDirection: "row",
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
  btnCancel: {
    padding: "2%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: "2%",
  },
  childSheet: { padding: "2%", backgroundColor: "#BCBCBC" },
});
export default connect(function (state) {
  return { infoPost: state.infoPost, auth: state.auth };
})(titleDetail);
