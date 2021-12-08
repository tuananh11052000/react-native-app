import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import calRealTime from '../../Helper/time/countHour';
import { Ionicons,MaterialIcons,AntDesign, FontAwesome } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
var { width } = Dimensions.get("window");
import axios from "axios";
import gigamall from "../../assets/gigamall.png";
import config from "../../config";
const url =
  "https://giagocchudautu.com/wp-content/uploads/2021/05/gigamall-thu-duc2-scaled.jpg";
function ProductGiveHome(props) {
  const {data, navigation} = props;
  const [avatar, setAvatar] = useState("");
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
  useEffect(() => {
    getPhone(data.AuthorID);
  }, []);
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
  const renderAvatar = () => {
    if (avatar != "")
      return (
        <View>
          <Avatar size={width * 0.09} rounded source={{ uri: avatar }}></Avatar>
        </View>
      );
    else
      return (
        <View>
          <FontAwesome name="user-circle-o" size={width * 0.09} color="#DDD"/>
        </View>
      );
  };

  const renderImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <Image
          style={styles.image}
          source={{
            uri: data.urlImage[0],
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
    navigation.navigate("DetailPostReceive", { data: item, isHistory: "no" }); //chuyển trang
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => _pressRow(data)}>
      <View style={styles.wrapInfor}>
        {/* <Avatar size={width * 0.09} rounded source={{ uri: url }}></Avatar>
         */}
         {renderAvatar()}
        <View style={{marginLeft: '4%'}}>
          <Text style={styles.titlePost} numberOfLines={1}>{data.NameAuthor}</Text>
          <View style={styles.wrapTime}>
          <AntDesign name="clockcircleo" size={width*0.03} color="#BDBDBD" />
            <Text style={styles.time}>{calculatingTime(data.updatedAt, currentTime)}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={1}>{data.title}</Text>
      <View style={{ borderRadius: 10 }}>
        {renderImage()}
      </View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: width*0.5,
    elevation: 3,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#CCC',
  },
  wrapInfor: { flexDirection: "row", margin: '4%', alignItems: 'center' },
  titlePost: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_600SemiBold",
    maxWidth: width*0.3
  },
  wrapTime: { flexDirection: "row", alignItems: 'center'},
  time: {
    fontSize: config.fontsize_3,
    marginLeft: 5,
    color: "#BDBDBD",
    fontFamily: "OpenSans_400Regular",
  },
  description: {
    fontSize: config.fontsize_3,
    marginLeft: '4%',
    color: "black",
    fontFamily: "OpenSans_400Regular",
    marginBottom: '2%',
    marginRight: '2%'
  },
  image: { width: width*0.5, height: width*0.4, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }
});

export default ProductGiveHome;
