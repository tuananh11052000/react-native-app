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
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { Button } from "galio-framework";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import ModalDetailPost from '../components/ModalDetailPost.component';
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
  const [isShowModel, setisShowModel] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(" ");
  const [phoneNumber, setPhoneNumber] = useState(" "); //useState using for phonenumber
  
  //update history
  //get phone number author post
  useEffect(() => {}, []);
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
  const renderAvatar = (avatar) => {
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

  const currentTime = new Date();
  const renderTime = (time) => {
    var t1 = time.format("YYYY-MM-DD HH:MM:SS");
    return t1;
  };
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 28) + "...";
    else return item;
  };
  const closeModel = () => {
    setisShowModel(false)
  }
  const renderImage = (urlImage) => {
    if (urlImage != null) {
      return (
        <Image
          style={styles.tinyLogo}
          source={{
            uri: urlImage,
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
              paddingRight: "3%",
              flexDirection: "row",
            }}
          >
            {renderAvatar(data.SenderUser.urlIamge)}
            <View style={styles.wrapName}>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#DDD',}}>
                <Text style={styles.textName}>{data.SenderUser.FullName}</Text>
                <Text style={styles.textTypeUser}>Cá nhân</Text>
              </View>
              <View style={styles.wrapAddress}>
                <Text style={styles.textAddress}>
                  <Entypo name="location" size={24} color="white" /> {"  "}
                  {data.SenderAddress}
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
          <TouchableOpacity style={styles.product} onPress={() => setisShowModel(true)}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.wrapImage}>
                {renderImage(data.PostData.urlImage[0])}
              </View>
              <View style={styles.wrapInfoProduct}>
                <View>
                  <Text style={styles.titlePost}>
                    {renderTitle(data.PostData.NameProduct[0].Category)}
                  </Text>
                </View>

                <View style={styles.wrapTypePrice}>
                  <Text style={styles.type}>
                    {" "}
                    {renderTitle(data.PostData.title)}
                  </Text>
                  <Text style={styles.price}>Miễn phí</Text>
                </View>
                <View style={styles.wrapTimeAddress}>
                  <View style={styles.wrapTime}>
                    <Feather
                      name="clock"
                      size={18}
                      color="gray"
                      style={{ width: 18, height: 18 }}
                    />
                    <Text style={styles.time}>9:30 - 22/07/2021</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapFollow}>
        <Text style={styles.textTitle}>THEO DÕI</Text>
        <Text style={{ marginLeft: "10%" }}>Không có</Text>
      </View>
      <ModalDetailPost
        show={isShowModel}
        onPress={() => {
          setisShowModel(false);
        }}
      />
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
    paddingHorizontal: "5%",
  },
  wrapCancel: {},
  textCancel: {
    fontSize: config.fontsize_5,
    color: "red",
    fontFamily: "OpenSans_400Regular",
  },
  textCall: {
    fontSize: config.fontsize_2,
    color: "#FFF",
    fontFamily: "OpenSans_400Regular",
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
    borderBottomColor: '#DDD',
    borderBottomWidth: 1
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
  // style product
  product: {
    backgroundColor: "#FFF",
    paddingLeft: "1%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  wrapImage: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
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
