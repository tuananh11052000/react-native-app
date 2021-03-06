import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Avatar } from "react-native-elements";
import ModalGiveFor from "./ModalGiveFor.component";
var { width } = Dimensions.get("window");
const height = width * 0.5;
import AppLoading from "expo-app-loading";
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
function ProductGiveForComponent(props) {
  const [isShow, setIsShow] = useState(false);
  const [avatar, setAvatar] = useState(" ");
  const [showDialog, setShowDialog] = useState(false);
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
  useEffect(() => {
    //Lay ra so dien thoai nguoi dang bai
    const getPhone = async (AuthorID) => {
      try {
        await axios({
          method: "get",
          url:
            "https://api.smai.com.vn/user/getInfoAuthor?AuthorID=" + AuthorID,
        }).then(async (data) => {
          setAvatar(data.data.ImgAuthor);
        });
      } catch (e) {
        alert(e);
      }
    };
    getPhone(props.authorID);
    //Lay ra avatar
  }, []);
  const renderAvatar = () => {
    if (avatar != null)
      return (
        <View>
          <Avatar size={width * 0.15} rounded source={{ uri: avatar }}></Avatar>
        </View>
      );
    else
      return (
        <View>
          <Ionicons
            name="person-circle-outline"
            size={width * 0.15}
            color="#DDD"
          />
        </View>
      );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };

  // render address
  const renderDistrict = (district, city) => {
    if (district.indexOf("Th??nh ph???") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Qu???n") != -1 && city.indexOf("H??? Ch?? Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber =
      "Qu???n 1, Qu???n 2, Qu???n 3, Qu???n 4, Qu???n 5, Qu???n 6, Qu???n 7, Qu???n 8, Qu???n 9, Qu???n 10, Qu???n 11, Qu???n 12";
    if (
      district.indexOf("Qu???n") != -1 &&
      city.indexOf("H??? Ch?? Minh") != -1 &&
      distritNumber.indexOf(district) != -1
    ) {
      return district;
    }
    if (
      district.indexOf("Qu???n") != -1 &&
      city.indexOf("H??? Ch?? Minh") != -1 &&
      distritNumber.indexOf(district) == -1
    ) {
      return district.slice(5);
    }
    if (district.indexOf("Huy???n") != -1) {
      return district.slice(7);
    }
  };
  // render ?????a ch???
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Th??nh ph???") != -1) {
      tinh = add[3].slice(10);
    } else {
      tinh = add[3].slice(6);
    }
    huyen = renderDistrict(add[2], add[3]);

    let diachi = huyen + ", " + tinh;
    return diachi;
  };
  const detailText = () => {
    if (props.viewDetail == "true") {
      return <Text style={styles.detail}>Chi ti???t</Text>;
    }
  };
  const renderImage = () => {
    if (props.urlImage != null) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: props.urlImage,
          }}
        />
      );
    } else {
      return <></>;
    }
  };
  const _pressRow = (item) => {
    if (props.viewDetail == "true") {
      props.navigation.navigate("DetailPost", { data: item }); //chuy???n trang
    }
  };
  const pressGiveFor = (item) => {
    if (props.viewDetail == "true") {
      const { dispatch } = props;
      dispatch({ type: "SET_GUI" });
      // dispatch({ type: "COMPLETE_LOINHAN_CXD" });
      // props.navigation.navigate("ConfirmGiveFor", { data: item, name: "X??c nh???n g???i t???ng", sender: "Ng?????i t???ng" }); //chuy???n trang
      props.navigation.navigate("ConfirmCategoryGive", { data: item });
    } else {
      setIsShow(true)
    }
  };

  const renderBtnGive = (item) => {
    if (props.isStatus == null || props.isStatus == "null") {
      return (
        <TouchableOpacity
          style={{ marginTop: "3%" }}
          onPress={() => pressGiveFor(item)}
        >
          <View style={styles.btnGiveFor}>
            <Text style={styles.textBtn}>G???i t???ng</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      if (props.isStatus == "waiting") {
        return (
          <View style={styles.btnGived}>
            <Text style={styles.textBtnWaiting}>??ang ch??? nh???n</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.btnGived}>
            <Text style={styles.textBtnGived}>???? t???ng</Text>
          </View>
        );
      }
    }
  };

  const currentTime = new Date();

  return (
    <TouchableOpacity
      style={styles.wrapProduct}
      activeOpacity={0.8}
      onPress={() => _pressRow(props.item)}
    >
      <View style={styles.wrapBorder}>
        {renderAvatar()}
        <View style={styles.wrapInfor}>
          <Text style={styles.wrapName}>{props.nameAuthor}</Text>
          <View style={styles.wrapAddress}>
            <Feather name="clock" size={width * 0.04} color="gray" />
            <Text style={styles.address}>
              {calculatingTime(props.time, currentTime)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapBorder}>
        <Text style={styles.description}>{props.title}</Text>
        {detailText()}
      </View>
      <View style={styles.wrapImage}>{renderImage()}</View>
      <View style={styles.wrapBorderBottom}>
        <View style={styles.wrapAddress}>
          <Entypo name="location" size={width * 0.03} color="#BDBDBD" />
          <Text style={styles.address}>{renderAddress(props.address)}</Text>
        </View>
        {renderBtnGive(props.item)}
        <ModalGiveFor
          show={isShow}
          onPressClose={() => setIsShow(false)}
          idTrans={props.idTrans}
          navigation={props.navigation}
          titleModal="X??c nh???n g???i t???ng"
          titleBtn="G???i t???ng"
          nameNote="notereceiver"
          status="waiting"
          postId={props.idPost}
        />
        <DialogInput
          isDialogVisible={showDialog}
          title={"DialogInput 1"}
          message={"Message for DialogInput #1"}
          hintInput={"HINT INPUT"}
          submitInput={(inputText) => {
              console.log(inputText)
              setShowDialog(false);
          }}
          closeDialog={() => {
            setShowDialog(false);
          }}
        ></DialogInput>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#DDD",
  },
  containterLoading: {
    flex: 1,
    justifyContent: "center",
  },
  wrapProduct: {
    width: "100%",
    paddingTop: 10,
    backgroundColor: "#FFF",
    marginBottom: "2%",
    paddingBottom: "3%",
  },
  wrapBorder: {
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
    justifyContent: "space-between",
  },
  wrapBorderBottom: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
    justifyContent: "space-between",
  },
  wrapInfor: {
    marginLeft: "3%",
    width: "80%",
  },
  wrapName: {
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapAddress: {
    flexDirection: "row",
    marginTop: "3%",
    alignItems: "center",
    // width: "80%",
  },
  address: {
    fontSize: config.fontsize_3,
    marginLeft: "3%",
    color: "#BDBDBD",
    fontFamily: "OpenSans_400Regular",
  },
  description: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_400Regular",
    marginBottom: "1%",
    marginTop: "3%",
    maxWidth: "85%",
  },
  detail: {
    color: "#26c6da",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  wrapImage: {
    flexDirection: "row",
    width: width,
    alignItems: "center",
  },
  image: {
    height: height,
    width: width,
    // resizeMode: "contain",
  },
  btnGiveFor: {
    borderColor: "#26c6da",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "2%",
    paddingBottom: "2%",
    alignItems: "center",
  },
  btnGived: {
    paddingLeft: "3%",
    paddingRight: "3%",
    marginTop: "2%",
    alignItems: "center",
  },
  textBtn: {
    color: "#26c6da",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  textBtnGived: {
    color: "green",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_700Bold",
  },
  textBtnWaiting: {
    color: "green",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_700Bold",
    marginRight: "2%",
  },
});
export default connect(function (state) {
  return {
    redirectTransaction: state.redirectTransaction,
    redirectComplete: state.redirectComplete,
  };
})(ProductGiveForComponent);
