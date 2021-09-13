import React, { useEffect, useState, useRef } from "react";
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
  Alert,
  RefreshControl,
} from "react-native";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

var { width } = Dimensions.get("window");

export default function ConnectPost(props) {
  const menu = useRef();
  const { dispatch } = props;
  const hideMenu = async () => {
    props.onPressDel();
  };

  const showMenu = () => menu.current.show();
  const renderId = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 10) + "...";
    else return item;
  };

  const renderType = (pr) => {
    if (pr[0].NameProduct.length > 27)
      return pr[0].NameProduct.slice(0, 27) + ", ...";
    else return pr[0].NameProduct;
  };

  //Function handling type product
  const renderName = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 21) + "...";
    else return item;
  };

  const createTime = (item) => {
    return item.slice(0, 10);
  };

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

  const renderItType = () => {
    if (props.confirm == true)
      return (
        <View style={style.wrapBot}>
          <Text style={style.textStatusTrue}>&ensp;Hiển thị</Text>
        </View>
      );
    else return <Text style={style.textStatusFalse}>Chờ xác thực</Text>;
  };
  const renderStatus = (status) => {
    if (status == "done") {
      return "Đã tặng";
    } else {
      if (status == "waiting") {
        return "Chưa tặng"
      } else {
        if (status == "done") {
          return "Đã tặng"
        } else return "Hủy"
      }
    }
  }

  const renderImage = () => {
    if (props.urlImage != null) {
      return (
        <Image
          style={style.tinyLogo}
          source={{
            uri: props.urlImage,
          }}
        />
      );
    } else {
      return (
        <MaterialIcons
          name="volunteer-activism"
          size={width * 0.1}
          color="#CCCCCC"
        />
      );
    }
  };
  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.4}
      onPress={() => props.onPress()}
    >
      <View style={style.wrapTop}>
        <View style={style.wrapImage}>{renderImage()}</View>

        <View style={style.wrapInfoProduct}>
          <View style={style.wrapTitle}>
            <Text style={style.titlePost}>Mã: {renderId(props.title)}</Text>
            <View style={style.wrapMore}>
              <Text style={style.giveStatus}>{renderStatus(props.status)}</Text>
            </View>
          </View>

          {/* {renderName()} */}
          <View style={style.wrapTypePrice}>
            <MaterialIcons
              name="person-outline"
              size={width * 0.05}
              color="gray"
            />
            <Text style={style.name}>&ensp;{renderName(props.name)}</Text>
          </View>
          <View style={style.wrapTimeAddress}>
            <Text style={style.address}>
              Đ/c:{renderAddress(props.address)}
            </Text>
          </View>
        </View>
      </View>
      <View style={style.wrapBot}>
        <Text style={style.textCate}>{createTime(props.time)}</Text>
        <Text style={style.textStatusTrue}>Hiện vật</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: "3%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  wrapTop: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  wrapImage: {
    width: "30%",
    alignItems: "center",
  },
  tinyLogo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  wrapTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapMore: {
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  wrapInfoProduct: {
    marginLeft: "1%",
    width: "70%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  wrapTypePrice: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%",
    marginTop: "2%",
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
    color: "gray",
  },
  wrapTime: {
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: config.fontsize_3,
    marginLeft: 5,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  price: {
    color: "green",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  name: {
    fontSize: config.fontsize_5,
    color: "black",
    fontFamily: "OpenSans_600SemiBold",
  },
  address: {
    color: "black",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  wrapBot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  textCate: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusTrue: {
    fontSize: config.fontsize_3,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusFalse: {
    fontSize: config.fontsize_3,
    color: "red",
    fontFamily: "OpenSans_400Regular",
  },
  textFalse: {
    color: "gray",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  textMessage: {
    fontSize: config.fontsize_3,
    color: "#00a2e8",
    fontFamily: "OpenSans_400Regular",
  },
  giveStatus: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    backgroundColor: "#ddd",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
