import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import config from "../config";
import { Feather } from "@expo/vector-icons";
import {
  MenuProvider,
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";

async function getToken() {
  let result = await SecureStore.getItemAsync("token");
  // console.log(result);
  if (result) {
    return await result;
  } else {
    return await "Null";
  }
}

// const { width, height } = Dimensions.get('window')

function MyProductComponent(props) {
  const [token, setToken] = useState("Null"); //token
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });
  // console.log(token);
  const { dispatch } = props;
  useEffect(() => {
    getToken().then(
      (profile) => {
        setToken(profile);
      },
      (error) => {
        console.log("An error has occur: ", error);
      }
    );
  }, []);
  if (props.auth.isLogin == false) {
    return <Text style={style.textFalse}>Đăng nhập để xem tin của bạn</Text>;
  } else {
    const getData = async () => {
      let temp = await axios({
        method: "get",
        headers: {
          Authorization: `${token}`,
        },
        url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
      });
      dispatch({ type: "UP", data: temp.data });
      // console.log(temp);
    };
    getData();

    if (!fontsLoaded) {
      return <AppLoading />;
    }
    //Function handling title post
    const calculatingTime = (d1, d2) => {
      d1 = new Date(d1);
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
      else if (calMonth() != 0) return `${calMonth()}m `;
      else if (calDay() != 0) return `${calDay()}d `;
      else return `${calHour()}h `;
    };
    //Function handling title post
    const renderTitle = (item) => {
      item = item.charAt(0).toUpperCase() + item.slice(1);
      if (item.length > 20) return item.slice(0, 20) + "...";
      else return item;
    };
    //Function handling type product
    const renderType = (pr) => {
      if (pr.length > 1) return pr[0].Category + ", ...";
      else return pr[0].Category;
    };
    const renderAuthor = (item) => {
      if (item == "tangcongdong") return "Tặng cộng đồng";
      else return "Cần hỗ trợ";
    };

    const renderConfirm = (item) => {
      if (item)
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

    //sang trang detail
    const _pressRow = (item) => {
      props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
    };
    const currentTime = new Date();
    //Ham xoa bai dang
    const deletePost = (id) => {
      let url =
        "https://smai-app-api.herokuapp.com/post/deletePostbyUser?_id=" + id;
      console.log(url);
      axios({
        method: "delete",
        url: url,
        headers: {
          Authorization: `${token}`,
        },
      }).then((res) => {
        if (res.status == 201) {
          // alert("Xoá bài thành công.");
          Alert.alert("Thông báo", "Xóa bài thành công", [{ text: "OK" }]);
        }
      });
    };
    return (
      <View style={style.constainer}>
        {props.myPost.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              style={style.wrapCategory}
              activeOpacity={0.8}
              onPress={() => _pressRow(item)}
            >
              {/* //dùng onStartShouldSetResponder để click vào view */}
              <View style={style.wrapTop}>
                <Image
                  style={style.tinyLogo}
                  source={{
                    uri: item.urlImage[0],
                  }}
                />
                <View style={style.wrapInfoProduct}>
                  <MenuProvider style={{}}>
                    <View style={style.wrapTitle}>
                      <Text style={style.titlePost}>
                        {renderTitle(item.title)}
                      </Text>
                      <View style={style.wrapMore}>
                        {/* <MenuContext style={{}}> */}
                        <View style={{ alignItems: "flex-end" }}>
                          <Menu>
                            <MenuTrigger>
                              <Feather
                                name="more-vertical"
                                size={20}
                                color="gray"
                              />
                            </MenuTrigger>
                            <MenuOptions
                              customStyles={optionsStyles}
                              onSelect={false}
                            >
                              <MenuOption
                                value="Delete"
                                text="Xóa tin"
                                onSelect={() => deletePost(item._id)}
                              />
                            </MenuOptions>
                          </Menu>
                        </View>
                        {/* </MenuContext> */}
                      </View>
                    </View>

                    <View style={style.wrapTypePrice}>
                      <Text style={style.type}>
                        {renderType(item.NameProduct)}
                      </Text>
                      <Text style={style.price}>Miễn phí</Text>
                    </View>
                    <View style={style.wrapTimeAddress}>
                      <View style={style.wrapTime}>
                        <Feather
                          name="clock"
                          size={18}
                          color="gray"
                          style={{ width: 18, height: 18 }}
                        />
                        <Text style={style.time}>
                          {calculatingTime(item.createdAt, currentTime)}
                        </Text>
                      </View>
                      <Text style={style.address}>
                        {item.address.slice(0, 15) + "..."}
                      </Text>
                    </View>
                  </MenuProvider>
                </View>
              </View>
              <View style={style.wrapBot}>
                <Text style={style.textCate}>
                  {renderAuthor(item.TypeAuthor)}
                </Text>
                <Text style={style.textStatus}>
                  {renderConfirm(item.confirm)}
                </Text>
                {/* {confirmStatus} */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const style = StyleSheet.create({
  constainer: {
    backgroundColor: "#e5e5e5",
  },
  wrapCategory: {
    padding: 15,
    paddingBottom: 10,
    marginBottom: 10,
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  wrapTop: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: 5,
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  wrapTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapMore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
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
  wrapBot: {
    // flex: 1,
    flexDirection: "row",
    // alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  textCate: {
    fontSize: config.fontsize_3,
    // fontSize: 20,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusTrue: {
    fontSize: config.fontsize_3,
    // fontSize: 20,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusFalse: {
    fontSize: config.fontsize_3,
    // fontSize: 20,
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

export default connect(function (state) {
  return {
    num: state.countNumber,
    auth: state.auth,
    myPost: state.myPost,
  };
})(MyProductComponent);
