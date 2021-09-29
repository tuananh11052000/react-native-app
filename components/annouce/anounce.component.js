import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import config from "../../config";
import axios from "axios";
import { Badge } from "react-native-paper";
const { width } = Dimensions.get("window");
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
function AnnounceComponent(props) {
  const { dispatch } = props;
  const [dataItem, setDataItem] = useState();
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
    if (calYear() != 0) return `${calYear()} năm trước `;
    else if (calMonth() != 0) return `${calMonth()} tháng trước `;
    else if (calDay() != 0) return `${calDay()} ngày trước `;
    else if (calHour() != 0) return `${calHour()} giờ trước `;
    else return `${calMinute()} phút trước `;
  };
  const currentTime = new Date();
  useEffect(() => {
    getTrans();
  });
  const getTrans = async () => {
    let token = await SecureStore.getItemAsync("token");

    await axios({
      method: "get",
      url:
        "https://api.smai.com.vn/transaction/get-transactionID?transactionID=" +
        props.idTransaction,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setDataItem(res.data.data.data);
        // console.log(res.data.data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const updateStatus = async () => {
    let token = await SecureStore.getItemAsync("token");
    await axios({
      method: "put",
      url:
        "https://api.smai.com.vn/push/update-notification?idNotification=" +
        props.idNotification,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const handlePress = (item) => {
    if (dataItem != null) {
      updateStatus();
      if (dataItem[0].isStatus != "null") {
        console.log("2");
        if (item == "Đã nhận" || item == "Chưa nhận" || item == "Hủy nhận") {
          props.navigation.navigate("DetailConnectPost", {
            name: "Chi tiết nhận tặng",
            titlePerson: "NGƯỜI TẶNG",
            data: dataItem[0],
          }); //chuyển trang
        } else {
          props.navigation.navigate("DetailConnectPost", {
            name: "Chi tiết bạn tặng",
            titlePerson: "NGƯỜI NHẬN",
            data: dataItem[0],
          }); //chuyển trang
        }
      } else {
        dispatch({ type: "SET_XIN" });
        props.navigation.navigate("GiveFor", {
          name: "Danh sách lời nhắn",
          postId: dataItem[0].PostData._id,
        }); //chuyển trang
      }
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        handlePress(dataItem[0].typetransaction);
      }}
    >
      <View style={styles.topCard}>
        <View style={{flexDirection: 'row', maxWidth: "70%", justifyContent: 'center', alignItems: 'center'}}>
        <AntDesign name="filetext1" size={width * 0.03} color="black" />
          <Text style={[styles.textTop, {  }]}>
            {" "}
            {props.bodyNotification}
          </Text>
          <Badge
            style={props.examined ? styles.badgeActive : styles.badgeNoActive}
            size={width * 0.02}
          ></Badge>
        </View>

        <Text style={styles.textTop}>
          {calculatingTime(props.updatedAt, currentTime)}
        </Text>
      </View>
      <Text style={styles.textTitle}>{props.titleNotification}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: config.fontsize_5,
    fontFamily: "OpenSans_600SemiBold",
  },
  card: {
    borderRadius: 10,
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: "2%",
    backgroundColor: "#ffffff",
    elevation: 4,
  },
  cardNoActive: {
    borderRadius: 10,
    padding: "2%",
    margin: "2%",
    backgroundColor: "#CCCCCCaa",
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#DDD",
    borderBottomWidth: 0.5,
    paddingBottom: "1%",
  },
  textTop: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  badgeActive: { backgroundColor: "green", position: 'absolute', top: 7, right: -20 },
  badgeNoActive:{ backgroundColor: "red", position: 'absolute', top: 7, right: -20 }
});
export default connect(function (state) {
  return {
    infoPost: state.infoPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
    dataCategory: state.dataCategory,
    redirectTransaction: state.redirectTransaction,
    auth: state.auth,
  };
})(AnnounceComponent);
