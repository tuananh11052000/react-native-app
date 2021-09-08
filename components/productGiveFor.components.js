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
} from "react-native";
import { connect } from "react-redux";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Avatar } from "react-native-elements";

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
  const [avatar, setAvatar] = useState(" ");
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
            "https://smai-app-api.herokuapp.com/user/getInfoAuthor?AuthorID=" +
            AuthorID,
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
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber =
      "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12";
    if (
      district.indexOf("Quận") != -1 &&
      city.indexOf("Hồ Chí Minh") != -1 &&
      distritNumber.indexOf(district) != -1
    ) {
      return district;
    }
    if (
      district.indexOf("Quận") != -1 &&
      city.indexOf("Hồ Chí Minh") != -1 &&
      distritNumber.indexOf(district) == -1
    ) {
      return district.slice(5);
    }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    }
  };
  // render địa chỉ
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Thành phố") != -1) {
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
      return <Text style={styles.detail}>Chi tiết</Text>;
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
      props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
    }
  };
  const pressGiveFor = (item) => {
    if (props.viewDetail == "true") {
      const { dispatch } = props;
      dispatch({ type: "SET_GUI" });
      props.navigation.navigate("ConfirmGiveFor", { data: item }); //chuyển trang
    } else {
      console.log("Gửi tặng");
      giveFor();
    }
  };
  const giveFor = async () => {
    let result = await SecureStore.getItemAsync("token");
    let formData = new FormData();
    formData.append("status", "waiting");
    let apiUrl =
      "https://smai-app-api.herokuapp.com/transaction/update-status?transactionId=" +
      props.idTrans;
    let options = {
      method: "PUT",
      body: JSON.stringify({ status: "waiting" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: result,
      },
    };
    fetch(apiUrl, options)
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
            <Feather name="clock" size={18} color="gray" />
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
          <Entypo name="location" size={20} color="#BDBDBD" />
          <Text style={styles.address}>{renderAddress(props.address)}</Text>
        </View>
        <TouchableOpacity
          style={{ marginTop: "3%" }}
          onPress={() => pressGiveFor(props.item)}
        >
          <View style={styles.btnGiveFor}>
            <Text style={styles.textBtn}>Gửi tặng</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: "center",
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
    width: "80%",
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
  textBtn: {
    color: "#26c6da",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
});
export default connect(function (state) {
  return {
    redirectTransaction: state.redirectTransaction,
  };
})(ProductGiveForComponent);
