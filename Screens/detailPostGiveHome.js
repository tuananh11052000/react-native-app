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
  TouchableOpacity, ActivityIndicator
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  EvilIcons,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import config from "../config";
import axios from "axios";
import { connect } from "react-redux";
import ModelShowCategory from "../components/ModalShowCategorySelected.component";
import ModelCallBad from '../components/ModelCallBad';
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
import { isLoading } from "expo-font";

const { width } = Dimensions.get("window");
const height = width * 0.5;
function DetailPostRecive(props) {
    const {navigation} = props;
  let data = props.route.params.data; // data from list
  let isHistory = props.route.params.isHistory;
  const [isShowModelBad, setisShowModelBad] = useState(false);
  const [isShowModelCate, setisShowModelCate] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(props.auth.PhoneNumber); //useState using for phonenumber

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
            "https://api.smai.com.vn/user/updateHistory",
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
            "https://api.smai.com.vn/user/getInfoAuthor?AuthorID=" + AuthorID,
        }).then(async (data) => {
          setPhoneNumber(data.data.PhoneNumber);
          setAvatar(data.data.ImgAuthor);
          setLoading(false);
        });
      } catch (e) {
        alert(e);
      }
    };
    getPhone(data.AuthorID);
    //Lay ra avatar
  }, []);
  const callBad = () => {
    if (props.auth.isLogin == false) {
      props.navigation.replace("Authentication");
    } else {
      setisShowModelBad(true)
    }
  }
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  const renderBtnGive = () => {
    if (
      props.auth.PhoneNumber == phoneNumber ||
      isHistory == "yes"
    ) {
      return;
    } else {
      return (
        <View style={styles.wrapBottom}>
          <TouchableOpacity onPress={() => callBad()}>
            <Text style={{ color: "red", fontSize: config.fontsize_5, marginLeft: '4%' }}>B??o x???u</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => pressGive()}>
              <Text style={styles.buttonText}>G???i t???ng</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };


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
  const renderCall = () => {
    if (loading == true) {
      return  <ActivityIndicator size="small" color="#BDBDBD" />
    } else {
      if (phoneNumber != "") {
        return (
          <TouchableOpacity onPress={() => dialCall(phoneNumber)}>
            <Feather name="phone-call" size={width * 0.06} color="#00a2e8" />
          </TouchableOpacity>
        );
      } else return;
    }
    
  };
  const pressGive = () => {
    const { dispatch } = props;
    if (props.auth.isLogin == false) {
      props.navigation.replace("Authentication");
    } else {
        dispatch({ type: "SET_GUI" });
        dispatch({ type: "SET_GUI_HOME" });
      navigation.navigate("ConfirmCategoryGive", { data: data });
    }
  };
  //ham render danh muc
  const renderCategory = () => {
    if (data.NameProduct.length == 1) {
      return (
        <View style={styles.wrapCategory}>
          <Text style={styles.textCategory}>
            {data.NameProduct[0].NameProduct}
          </Text>
          <Text style={styles.textPrice}>Mi???n ph??</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapCategory}>
          <Text style={styles.textCategory}>
            Danh m???c xin: {data.NameProduct.length}
          </Text>
          <TouchableOpacity onPress={() => setisShowModelCate(true)}>
            <Text style={styles.wraptManyCategories}>Chi ti???t</Text>
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
                ???
              </Text>
            ))}
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.noImageContainer}>
          <MaterialCommunityIcons
            name="home-heart"
            size={width * 0.3}
            color="#CCC"
          />
        </View>
      );
    }
  };
  //Ham render avatar
  const renderAvatar = () => {
    if (loading == true) {
      return <View style={{justifyContent: 'center'}}>
         <ActivityIndicator size="small" color="#BDBDBD" />
      </View>
    } else{
      if (avatar != null)
      return (
        <View>
          <Avatar
            size={width*0.12}
            rounded
            source={{ uri: avatar }}
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
    }
  };
  return (
    <View style={{flex: 1}}>
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
              <Entypo name="location" size={width*0.03} color="#DDD" /> {"  "}
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
              {renderAvatar()}
              <View style={styles.wrapName}>
                <Text style={styles.textName}>{data.NameAuthor}</Text>
                <Text style={styles.textTypeUser}>C?? nh??n</Text>
              </View>
            </View>
            {renderCall()}
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
      <ModelCallBad show={isShowModelBad}
      onPressClose={() => {
        setisShowModelBad(false)
      }}
      idPost={data._id}
      />
      
    </ScrollView>
    {renderBtnGive()}
    </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "6%",
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
  wrapBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    backgroundColor: '#DDD',
  },
  textCall: {
    fontSize: config.fontsize_2,
    color: "#FFF",
    fontFamily: "OpenSans_400Regular",
  },
  wraptManyCategories: {
    color: "#039BE5",
    fontFamily: "OpenSans_400Regular",
    paddingRight: "4%",
    fontSize: config.fontsize_3,
  },
  button: {
    backgroundColor: config.color_btn_1,
    borderRadius: 5,
    padding: '2%',
    alignItems: 'center'
},
buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
}
});
export default connect(function (state) {
  return {
    auth: state.auth,
    redirectTransaction: state.redirectTransaction,
    redirectComplete: state.redirectComplete,
    redirectCancel: state.redirectCancel,
  };
})(DetailPostRecive);
