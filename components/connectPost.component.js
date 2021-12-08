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
  const { dispatch } = props;
  const [typePost, setTypePost] = useState("gui");

  useEffect(() => {
    if (props.statusType == "Đã nhận" || props.statusType == "Chưa nhận"
      || props.statusType == "Hủy nhận") {
      setTypePost("nhan")
    } else {
      setTypePost("gui");
    }
  }, [typePost]);
  const renderId = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 10) + "...";
    else return item;
  };
  //Function handling type product
  const renderName = () => {
    let nameReceive = props.nameAuthorMess
    let nameGive = props.nameAuthorPost
    if ((typePost == "gui" && props.typeAuthor == "tangcongdong")
      || (typePost == "nhan" && props.typeAuthor != "tangcongdong")) {
      return nameReceive;
    }
    if ((typePost == "gui" && props.typeAuthor != "tangcongdong")
      || (typePost == "nhan" && props.typeAuthor == "tangcongdong")) {
      return nameGive;
    }
  };
  const renderStatusDone = () => {

    if (props.status == "done") {
      return (
        <View style={style.wrapMoreDone}>
          <Text style={style.giveStatusDone}>{props.statusType}</Text>
        </View>

      )
    }
    if (props.status == "waiting") {
      return (
        <View style={style.wrapMore}>
          <Text style={style.giveStatus}>{props.statusType}</Text>
        </View>

      )
    }
    if (props.status == "cancel") {
      return (
        <View style={style.wrapMoreCancel}>
          <Text style={style.giveStatusCancel}>{props.statusType}</Text>
        </View>

      )
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
  const renderTime = (timeUTC) => {
    let time1 = new Date(timeUTC);
    let hour = time1.getHours();
    let minute = time1.getMinutes();
    let day = time1.getDate();
    let month1 = time1.getMonth() + 1;
    let year1 = time1.getFullYear();
    let title = hour + ":" + minute + " - " + day + "/" + month1 + "/" + year1;
    return title;
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
            {renderStatusDone()}
          </View>

          {/* {renderName()} */}
          <View style={style.wrapTypePrice}>
            <MaterialIcons
              name="person-outline"
              size={width * 0.05}
              color="gray"
            />
            <Text style={style.name}>&ensp;{renderName()}</Text>
          </View>
          <View style={style.wrapTimeAddress}>
            <View style={{ flexDirection: 'row' }}>
              <Feather
                name="clock"
                size={width * 0.04}
                color="gray"
              />
              <Text style={style.textCate}>{renderTime(props.time)}</Text>
            </View>
            <Text style={style.textStatusTrue}>Hiện vật</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: "2%",
    paddingRight: "4%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  wrapTop: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  wrapImage: {
    width: "25%",
    alignItems: "center",
  },
  tinyLogo: {
    width: width * 0.2,
    height: width * 0.2,
  },
  wrapTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  wrapInfoProduct: {
    marginLeft: "1%",
    width: "75%",
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
    fontSize: config.fontsize_3,
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
    marginLeft: '3%'
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
  wrapMore: {
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundColor: '#ddd',
    borderRadius: 20
  },
  wrapMoreDone: {
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundColor: '#43A047',
    borderRadius: 20
  },
  wrapMoreCancel: {
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundColor: '#E53935',
    borderRadius: 20
  },
  giveStatus: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#000'
  },
  giveStatusDone: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#FFF'
  },
  giveStatusCancel: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#FFF'
  },
});