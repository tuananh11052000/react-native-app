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
import { Feather } from "@expo/vector-icons";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

export default function MyPost(props) {
  const menu = useRef();
  const { dispatch } = props;
  const hideMenu = async () => {
    props.onPressDel();
  };

  const showMenu = () => menu.current.show();
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 21) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  const renderCategory = () => {
    if (props.typeAuthor == "tangcongdong") {
      return (
        <View style={style.wrapTypePrice}>
          <Text style={style.type}>{renderType(props.category)}</Text>
          <Text style={style.price}>Miễn phí</Text>
        </View>
      );
    } else {
      return (
        <View style={style.wrapTypePrice}>
          <Text style={style.type}>
            Danh mục nhận tặng: {props.cateReceives}
          </Text>
        </View>
      );
    }
  };
  const currentTime = new Date();
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
  const renderTypeAuthor = () => {
    if (props.typeAuthor == "tangcongdong") {
      return "Tặng cộng đồng";
    } else {
      return "Cần hỗ trợ";
    }
  };

  const renderConfirm = () => {
    if (props.confirm == true)
      return (
        <View style={style.wrapBot}>
          <Feather
            name="eye"
            size={18}
            color="#00a2e8"
            style={{ width: 18, height: 18 }}
          />
          <Text style={style.textStatusTrue}>&ensp;Hiển thị</Text>
        </View>
      );
    else return <Text style={style.textStatusFalse}>Chờ xác thực</Text>;
  };
  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.4}
      onPress={() => props.onPress()}
    >
      <View style={style.wrapTop}>
        <Image
          style={style.tinyLogo}
          source={{
            uri: props.urlImage,
          }}
        />

        <View style={style.wrapInfoProduct}>
          <View style={style.wrapTitle}>
            <Text style={style.titlePost}>{renderTitle(props.title)}</Text>
            <View style={style.wrapMore}>
              <Menu
                style={{backgroundColor: '#FFF'}}
                ref={menu}
                button={
                  <Text onPress={showMenu}><Feather name="more-vertical" size={20} color="gray" /></Text>
                }
              >
                <MenuItem onPress={() => {hideMenu(); }}>
                  Xóa tin
                </MenuItem>
              </Menu>
            </View>
          </View>

          {renderCategory()}
          <View style={style.wrapTimeAddress}>
            <View style={style.wrapTime}>
              <Feather
                name="clock"
                size={18}
                color="gray"
                style={{ width: 18, height: 18 }}
              />
              <Text style={style.time}>
                {calculatingTime(props.time, currentTime)}
              </Text>
            </View>
            <Text style={style.address}>{renderAddress(props.address)}</Text>
          </View>
        </View>
      </View>
      <View style={style.wrapBot}>
        <Text style={style.textCate}>{renderTypeAuthor()}</Text>
        <Text style={style.textStatus}>{renderConfirm()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  wrapTop: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  tinyLogo: {
    width: 90,
    height: 90,
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
    marginLeft: "3%",
    width: "76%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  type: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
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
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#f2f2f2",
    width: "70%",
    borderRadius: 5,
  },
  optionsWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  optionWrapper: {
    backgroundColor: "white",
    marginBottom: 2,
    borderRadius: 5,
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  optionText: {
    color: "black",
    fontSize: 16,
    padding: 6,
    fontFamily: "OpenSans_400Regular",
  },
};
