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
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Feather, FontAwesome, MaterialIcons  } from "@expo/vector-icons";
import config from "../config";
var { width } = Dimensions.get("window");
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
function ProductComponent(props) {
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

  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 28) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].NameProduct + ", ...";
    else return pr[0].NameProduct;
  };
  const renderCategory = () => {
    if (props.typeAuthor == "tangcongdong") {
      return (
        <View style={styles.wrapTypePrice}>
          <Text style={styles.type}>{renderType(props.category)}</Text>
          <Text style={styles.price}>Miễn phí</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapTypePrice}>
          <Text style={styles.type}>
            Danh mục nhận tặng: {props.cateReceives}
          </Text>
        </View>
      );
    }
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
  const renderImage = () => {
    if (props.urlImage != null) {
      return (
        <Image
          style={styles.tinyLogo}
          source={{
            uri: props.urlImage,
          }}
        />
      );
    } else {
      return (
        <MaterialIcons name="volunteer-activism" size={width*0.1} color="#CCCCCC" />
      );
    }
  };
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item, isHistory: props.isHistory }); //chuyển trang
  };

  const currentTime = new Date();

  return (
    <TouchableOpacity style={styles.containter} onPress={() => _pressRow(props.item)}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.wrapImage}>{renderImage()}</View>
        <View style={styles.wrapInfoProduct}>
          <View>
            <Text style={styles.titlePost}>{renderTitle(props.title)}</Text>
          </View>
          {renderCategory()}
          <View style={styles.wrapTimeAddress}>
            <View style={styles.wrapTime}>
              <Feather
                name="clock"
                size={18}
                color="gray"
                style={{ width: 18, height: 18 }}
              />
              <Text style={styles.time}>
                {calculatingTime(props.time, currentTime)}
              </Text>
            </View>
            <Text style={styles.address}>{renderAddress(props.address)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: "1%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  wrapImage: {
    width: "30%",
    alignItems: "center",
    justifyContent: 'center'
  },
  tinyLogo: {
    width: width * 0.22,
    height: width * 0.22,
  },
  titlePost: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapInfoProduct: {
    marginLeft: "1%",
    width: "70%",
    justifyContent: "center",
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2%",
    marginTop: "2%",
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
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  address: {
    color: "black",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
});

export default connect(function (state) {
  return { newestPost: state.newestPost };
})(ProductComponent);
