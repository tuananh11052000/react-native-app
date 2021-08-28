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
import { Feather } from "@expo/vector-icons";
import config from "../config";
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
  const [loading, setloading] = useState(true);
  const [dataRender, setData] = useState([]);
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
    getDataHistory();
    return () => {};
  }, []);
  const getDataHistory = async () => {
    let result = await SecureStore.getItemAsync("token");
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/user/getHistoryPost",
      headers: {
        Authorization: result,
      },
    })
      .then((data) => {
        setloading(false);
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
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
  //get post

  // useEffect(() => {
  //   // const getDataHome = async () => {
  //   //   let temp = await axios({
  //   //     method: "get",
  //   //     url: "https://smai-app-api.herokuapp.com/post/getNewPost",
  //   //   }).finally(() => setloading(false));
  //   //   setData(temp.data);
  //   // };
  //   const getDataHistory = async () => {
  //     let result = await SecureStore.getItemAsync("token");
  //     await axios({
  //       method: "get",
  //       url: "https://smai-app-api.herokuapp.com/user/getHistoryPost",
  //       headers: {
  //         Authorization: result,
  //       },
  //     }).then((data) => {
  //       setloading(false);
  //       setData(data.data);
  //     });
  //   };
  //   if (props.type == "history") {
  //     getDataHistory();
  //   } else getDataHome();
  // }, [props.data_]);
  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 28) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  // render address
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
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
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={style.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

      <Image
        style={style.tinyLogo}
        source={{
          uri: item.urlImage[0],
        }}
      />
      <View style={style.wrapInfoProduct}>
        <Text style={style.titlePost}>{renderTitle(item.title)}</Text>
        <View style={style.wrapTypePrice}>
          <Text style={style.type}>{renderType(item.NameProduct)}</Text>
          <Text style={style.price}>Miễn phí</Text>
        </View>
        <View style={style.wrapTimeAddress}>
          <View style={style.wrapTime}>
            <Feather name="clock" size={20} color="gray" />
            <Text style={style.time}>
              {calculatingTime(item.createdAt, currentTime)}
            </Text>
          </View>
          <Text style={style.address}>{renderAddress(item.address)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  return (
    <View style={style.containerr}>
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#BDBDBD" size="small" />
        </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  containterLoading: {
    flex: 1,
    justifyContent: "center",
  },
  // style search
  searchFilterContainer: {
    height: 60,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapFilterButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "55%",
    maxWidth: "55%",
    height: "70%",
    paddingLeft: "1%",
    borderWidth: 2,
    borderColor: "#EEEEEE",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "3%",
  },
  searchText: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 20,
    maxWidth: "90%",
  },

  // style product
  wrapCategory: {
    padding: 15,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    // justifyContent: "space-around",
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapTime: {
    display: "flex",
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
});

export default connect(function (state) {
  return { newestPost: state.newestPost };
})(ProductComponent);
