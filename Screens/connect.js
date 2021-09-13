import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import config from "../config";
import { Entypo } from "@expo/vector-icons";
import ConnectPost from "../components/connectPost.component";
import ProductTitleConnect from "../components/productTitleConnect.component";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
var { width } = Dimensions.get("window");
function Connection(props) {
  const { navigation, dispatch } = props;
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [dataGive, setdataGive] = useState(0);
  const [dataReceive, setdataReceive] = useState(0);
  useEffect(() => {
    if (props.auth.isLogin == true) {
      getConnectPost();
      getConnectPostDS();
    }
  }, [props.auth.isLogin, props.reloadPost]);
  const getConnectPost = async () => {
    if (props.auth.isLogin == true) {
      let result = await SecureStore.getItemAsync("token");
      await axios({
        method: "get",
        url: "https://smai-app-api.herokuapp.com/transaction/get-transaction",
        headers: {
          Authorization: result,
        },
      })
        .then((res) => {
          let tempList = res.data.data.data.filter((item) => {
            if (item.isStatus == null) {
              return false;
            }
            return true;
          });
          const listTempGive = tempList.filter((pr) => {
            if (pr.ReceiverUser.PhoneNumber == props.auth.PhoneNumber) {
              return true;
            } else return false;
          });
          setdataGive(listTempGive.length);
          const listTempRe = tempList.filter((pr) => {
            if (pr.ReceiverUser.PhoneNumber != props.auth.PhoneNumber) {
              return true;
            } else return false;
          });
          setdataReceive(listTempRe.length);
          dispatch({ type: "SAVE_DATA_TRANS", data: tempList });
          setData(tempList);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setrefreshing(false);
        });
    }
    dispatch({ type: "setNoReload" });
  };
  const getConnectPostDS = async () => {
    if (props.auth.isLogin == true) {
      let result = await SecureStore.getItemAsync("token");
      await axios({
        method: "get",
        url: "https://smai-app-api.herokuapp.com/transaction/transaction-success",
        headers: {
          Authorization: result,
        },
      })
        .then((res) => {})
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setrefreshing(false);
        });
    }
    dispatch({ type: "setNoReload" });
  };

  const onRefresh = () => {
    setData([]);
    getConnectPost();
    getConnectPostDS();
  };

  const _pressRow = (item) => {
    // props.navigation.navigate("DetailConnectPost", { data: item }); //chuyển trang
  };
  const _pressListGive = () => {
    props.navigation.navigate("YouGive"); //chuyển trang
  };
  const _pressListReceive = () => {
    props.navigation.navigate("YouReceive"); //chuyển trang
  };

  const renderItem = ({ item }) => {
    return (
      <ConnectPost
        urlImage={item.urlImage[0]}
        title={item.ReceiverUser._id}
        name={item.ReceiverUser.FullName}
        time={item.ReceiverUser.createdAt}
        address={item.SenderAddress}
        onPress={() => _pressRow(item)}
      />
    );
  };
  const listheader = () => {
    return (
      <>
      </>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        {props.auth.isLogin ? (
          <>
            {refreshing ? (
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
              // <FlatList
              //   data={data}
              //   renderItem={renderItem}
              //   keyExtractor={(item) => item._id}
              //   ItemSeparatorComponent={ItemSeparatorView}
              //   ListHeaderComponent={listheader}
              //   refreshControl={
              //     <RefreshControl
              //       refreshing={refreshing}
              //       onRefresh={onRefresh}
              //     />
              //   }
              // />
              <>
                <View style={{ flexDirection: "row", paddingTop: "2%" }}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.textYouGive}>Bạn tặng</Text>
                    <Text style={styles.numberPost}>{dataGive} DH</Text>
                    <TouchableOpacity onPress={() => _pressListGive()}>
                      <Text style={styles.textSeeMore}>Xem chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.textYouGive}>Nhận tặng</Text>
                    <Text style={styles.numberPost}>{dataReceive} DH</Text>
                    <TouchableOpacity onPress={() => _pressListReceive()}>
                      <Text style={styles.textSeeMore}>Xem chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.textTitle}>Đối soát</Text>
                <View>
                  <View style={styles.wrapTitleSec}>
                    <Text style={styles.titleSec}>Tháng 9 - 2021</Text>
                  </View>
                  <TouchableOpacity>
                    <View style={styles.wrapChild}>
                      <Text style={styles.textLeft}>22</Text>
                      <View style={styles.wrapRight}>
                        <View style={{ width: "90%" }}>
                          <View style={styles.titleRightTop}>
                            <Text style={styles.textRightTop}>Đã tặng</Text>
                            <Text style={styles.textCount}>12 DH</Text>
                          </View>
                          <View style={styles.titleRightBottom}>
                            <Text style={styles.textRightBottom}>Đã nhận</Text>
                            <Text style={styles.textCountRe}>0 DH</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Entypo
                            name="chevron-small-right"
                            size={width * 0.07}
                            color="black"
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "#DDD",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#4B4C4F" }}>Vui lòng đăng nhập</Text>
            </View>
          </>
        )}
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  textTitle: {
    fontSize: config.fontsize_3,
    paddingLeft: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginTop: "2%",
    color: "#7F7E85",
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    backgroundColor: "#FFF",
  },

  wrapContent: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wrapPikerA: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#BDBDBD",
    width: "57%",
    backgroundColor: "#FFF",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  wrapTitleSec: {
    backgroundColor: "#DDD",
    padding: "2%",
  },
  titleSec: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_700Bold",
    paddingLeft: "2%",
  },
  titleRightTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    paddingBottom: "2%",
    marginBottom: "2%",
  },
  titleRightBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textLeft: {
    width: "30%",
    fontFamily: "OpenSans_700Bold",
    color: "#000",
    textAlign: "center",
    fontSize: config.fontsize_5,
  },
  wrapChild: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "2%",
    paddingTop: "2%",
  },
  wrapRight: { width: "70%", flexDirection: "row" },
  textRightTop: {
    color: "#7F7E85",
    fontSize: config.fontsize_3,
  },
  textRightBottom: {
    color: "#7F7E85",
    fontSize: config.fontsize_3,
  },
  textCount: {
    color: "#000",
    fontSize: config.fontsize_3,
  },
  textCountRe: {
    color: "green",
    fontSize: config.fontsize_3,
  },
  // title box
  leftColumn: {
    width: "50%",
    alignItems: "center",
    paddingTop: "2%",
    borderRightColor: "#E0E0E0",
    borderRightWidth: 1,
  },
  rightColumn: {
    width: "50%",
    alignItems: "center",
    paddingTop: "2%",
  },
  textYouGive: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
    color: "#616161",
  },
  numberPost: {
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  textSeeMore: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_600SemiBold",
    color: "#26c6da",
  },
});

export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    reloadPost: state.reloadPost,
    controlConfirmAddress: state.controlConfirmAddress,
    dataTrans: state.dataTrans,
  };
})(Connection);
