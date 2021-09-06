import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  EvilIcons,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Button } from "galio-framework";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AppLoading from "expo-app-loading";
import { Avatar } from "react-native-elements";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import ProductComponent from "../components/product.component";
const { width } = Dimensions.get("window");
const height = width * 0.5;
export default function DetailConnectPost(props) {
  let data = props.route.params.data; // data from list
  const [isShowModelCate, setisShowModelCate] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(" ");
  const [phoneNumber, setPhoneNumber] = useState(" "); //useState using for phonenumber

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  //update history
  //get phone number author post
  useEffect(() => {
    //kiem tra dang nhap tren thiet bi
    const checkTokenLocal = async () => {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        axios
          .put(
            "https://smai-app-api.herokuapp.com/user/updateHistory",
            { IdPost: [data._id] },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            alert(error.message);
          });
      } else {
        return await null;
      }
    };
    // console.log(data);
    checkTokenLocal();
    //Lay ra so dien thoai nguoi dang bai
    const getPhone = async (AuthorID) => {
      try {
        await axios({
          method: "get",
          url:
            "https://smai-app-api.herokuapp.com/user/getInfoAuthor?AuthorID=" +
            AuthorID,
        }).then(async (data) => {
          setPhoneNumber(data.data.PhoneNumber);
          setAvatar(data.data.ImgAuthor);
        });
      } catch (e) {
        alert(e);
      }
    };
    getPhone(data.AuthorID);
    //Lay ra avatar
  }, []);
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //url phonenumber
  const dialCall = (number) => {
    var number_temp = "0" + number;
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number_temp}`;
    } else {
      phoneNumber = `telprompt:${number_temp}`;
    }

    Linking.openURL(phoneNumber);
  };
  //Ham render avatar
  const renderAvatar = () => {
    if (avatar != null)
      return (
        <View>
          <Avatar
            size={50}
            rounded
            source={{ uri: avatar }}
            containerStyle={styles.avatarContainer}
          ></Avatar>
        </View>
      );
    else
      return (
        <View>
          <Ionicons
            name="person-circle-outline"
            size={width * 0.12}
            color="#DDD"
          />
        </View>
      );
  };
  const renderId = () => {
    let id = data._id;
    return id.slice(0, 13) + "...";
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.wrapTop}>
        <View style={styles.wrapTopLeft}>
          <Text style={styles.textId}>Mã số:</Text>
          <Text style={styles.styleId}>&ensp;{renderId()}</Text>
        </View>
        <Text style={styles.textCopy}>Sao chép</Text>
      </View>

      <View style={styles.wrapPerson}>
        <Text style={styles.textTitle}>NGƯỜI NHẬN</Text>
        <View style={styles.wrapInfor}>
          <View
            style={{
              paddingLeft: "3%",
              flexDirection: "row",
            }}
          >
            {renderAvatar()}
            <View style={styles.wrapName}>
              <View>
                <Text style={styles.textName}>{data.NameAuthor}</Text>
                <Text style={styles.textTypeUser}>Cá nhân</Text>
              </View>
              <View style={styles.wrapAddress}>
                <Text style={styles.textAddress}>
                  <Entypo name="location" size={24} color="white" /> {"  "}
                  {data.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.wrapInfoPost}>
        <View style={styles.wrapTopInfo}>
          <Text style={styles.textTitle}>Thông tin tặng</Text>
          <Text style={styles.giveStatus}>Chưa Tặng</Text>
        </View>
        <View style={styles.wrapProduct}>
          <ProductComponent
            // item={data}
            urlImage={data.urlImage[0]}
            title={data.title}
            category={data.NameProduct}
            time={data.createdAt}
            address={data.address}
            confirm={data.confirm}
            typeAuthor={data.TypeAuthor}
            cateReceives={data.NameProduct.length}
            // navigation={navigation}
          />
        </View>
      </View>
      <View style={styles.wrapFollow}>
        <Text style={styles.textTitle}>THEO DÕI</Text>
        <Text style={{ marginLeft: "10%" }}>Không có</Text>
      </View>
      <View style={styles.wrapButton}>
        <TouchableOpacity style={styles.wrapCancel}> 
          <Text style={styles.textCancel}>Hủy</Text>
        </TouchableOpacity>
        <Button
          color={config.color_btn_1}
          // size="large"
          onPress={() => dialCall(phoneNumber)}
        >
          <Text style={styles.textCall}>Xác nhận xong</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  textAddress: {
    fontSize: config.fontsize_3,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  wrapInfor: {
    borderColor: "#DDD",
  },
  wrapName: {
    marginLeft: 20,
  },
  textName: {
    fontSize: config.fontsize_2,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  textTypeUser: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
    marginBottom: "2%",
  },
  wrapButton: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    paddingHorizontal: "5%"
  },
  wrapCancel: {
    
  },
  textCancel: {
    fontSize: config.fontsize_2,
    color: "red",
    fontFamily: "OpenSans_600SemiBold",
  },
  textCall: {
    fontSize: config.fontsize_2,
    color: "#FFF",
    fontFamily: "OpenSans_700Bold",
  },
  wrapTop: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 0,
  },
  wrapTopLeft: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
  },
  textId: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_5,
    color: "gray",
  },
  styleId: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_2,
  },
  textCopy: {
    fontSize: config.fontsize_5,
    color: "#26c6da",
  },
  wrapPerson: {
    backgroundColor: "#e5e5e5",
    marginTop: 5,
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: config.fontsize_5,
    marginLeft: "4%",
    marginTop: "2%",
    marginBottom: "2%",
    color: "#7F7E85",
    fontFamily: "OpenSans_700Bold",
  },
  wrapAddress: {
    paddingRight: "15%",
    borderTopWidth: 0.2,
    borderColor: "gray",
    paddingTop: "2%",
  },
  wrapInfoPost: {
    backgroundColor: "#e5e5e5",
    borderTopWidth: 0.2,
    borderColor: "gray",
    paddingVertical: "2%",
  },
  wrapFollow: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "gray",
  },
  wrapTopInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  giveStatus: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    backgroundColor: "gray",
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    marginRight: "3%",
  },
  wrapProduct: {
    borderWidth: 2,
    borderColor: "#bab6b6",
    margin: "3%",
  },
});
