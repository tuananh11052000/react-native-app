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
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Button } from "galio-framework";
import config from "../config";
import axios from "axios";
import ModelShowCategory from "../components/ModalShowCategorySelected.component";
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

const { width } = Dimensions.get("window");
const height = width * 0.5;
export default function App(props) {
  let data = props.route.params.data; // data from list
  const [isShowModelCate, setisShowModelCate] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState("");
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

  //render btn
  let button;
  if (phoneNumber != " ") {
    button = (
      <Button
        color={config.color_btn_1}
        size="large"
        onPress={() => dialCall(phoneNumber)}
      >
        <Text style={styles.textCall}>Gọi điện</Text>
      </Button>
    );
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
  //ham render danh muc
  const renderCategory = () => {
    if (data.NameProduct.length == 1) {
      return (
        <View style={styles.wrapCategory}>
          <Text style={styles.textCategory}>
            {data.NameProduct[0].NameProduct}
          </Text>
          <Text style={styles.textPrice}>Miễn phí</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapCategory}>
          <Text style={styles.textCategory}>
            Danh mục xin: {data.NameProduct.length}
          </Text>
          <TouchableOpacity onPress={() => setisShowModelCate(true)}>
            <Text style={styles.wraptManyCategories}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const renderSlideImage = () => {
    if (data.urlImage.length != 0) {
      return (
        <>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
          >
            {data.urlImage.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {data.urlImage.map((i, k) => (
              <Text
                key={k}
                style={
                  k == active ? styles.pagingActiveText : styles.pagingText
                }
              >
                ⬤
              </Text>
            ))}
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.noImageContainer}>
          <FontAwesome name="photo" size={width*0.5} color="#CCC" />
        </View>
      );
    }
  };
  //Ham render avatar
  const renderAvatar = () => {
    if (avatar != "")
      return (
        <View>
          <Avatar
            size={70}
            rounded
            source={{ uri: avatar }}
            containerStyle={styles.avatarContainer}
          ></Avatar>
        </View>
      );
    else
      return (
        <View>
          <Avatar
            size={70}
            rounded
            source={{
              uri: "https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png",
            }}
            containerStyle={styles.avatarContainer}
          ></Avatar>
        </View>
      );
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <View>{renderSlideImage()}</View>
        <View style={styles.wrapText}>
          <View>
            <Text style={styles.textTitle}>{data.title}</Text>
          </View>
          {renderCategory()}
          <View style={{ paddingLeft: "3%", paddingRight: "3%" }}>
            <Text style={styles.textAddress}>
              <Entypo name="location" size={24} color="#DDD" /> {"  "}
              {data.address}
            </Text>
          </View>
          <View style={styles.wrapInfor}>
            <View
              style={{
                paddingLeft: "3%",
                paddingRight: "3%",
                flexDirection: "row",
              }}
            >
              {/* <FontAwesome name="user-circle-o" size={60} color="#fff200" /> */}
              {renderAvatar()}
              <View style={styles.wrapName}>
                <Text style={styles.textName}>{data.NameAuthor}</Text>
                <Text style={styles.textTypeUser}>Cá nhân</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.textDescription}>{data.note}</Text>
          </View>
        </View>
      </View>
      <ModelShowCategory
        show={isShowModelCate}
        dataNameProduct={data.NameProduct}
        onPress={() => {
          setisShowModelCate(false);
        }}
      />
      <View style={styles.wrapButton}>{button}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    paddingTop: "1%",
    width,
    height,
    backgroundColor: "#FFF",
  },
  noImageContainer: {
    paddingTop: "1%",
    width,
    height,
    backgroundColor: "#FFF",
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  scroll: {
    width,
    height,
  },
  image: {
    width,
    height,
    // resizeMode: "contain",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: {
    fontSize: width / 30,
    color: "#888",
    margin: 3,
  },
  pagingActiveText: {
    fontSize: width / 30,
    color: "#fff",
    margin: 3,
  },
  wrapText: {
    paddingTop: 20,
  },
  textTitle: {
    color: "#000",
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 10,
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  wrapCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  textCategory: {
    // fontSize: 20,
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  textPrice: {
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    color: "#3DA20E",
  },
  textAddress: {
    fontSize: config.fontsize_3,
    color: "black",
    fontFamily: "OpenSans_400Regular",
    // color: "#A1A1A1",
    // fontSize: 18,
  },
  wrapInfor: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginBottom: "5%",
    marginTop: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  wrapName: {
    marginLeft: 20,
  },
  textName: {
    fontSize: config.fontsize_2,
    color: "black",
    fontFamily: "OpenSans_400Regular",
    marginBottom: "5%",
  },
  textTypeUser: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  textDescription: {
    marginBottom: 20,
    fontSize: config.fontsize_2,
    color: "black",
    fontFamily: "OpenSans_400Regular",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  wrapButton: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#e5e5e5",
  },
  textCall: {
    fontSize: config.fontsize_2,
    color: "#FFF",
    fontFamily: "OpenSans_700Bold",
  },
  wraptManyCategories: {
    color: "#039BE5",
    fontFamily: "OpenSans_400Regular",
    paddingRight: "4%",
    fontSize: config.fontsize_3,
  },
});
