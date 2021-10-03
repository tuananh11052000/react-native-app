import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
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
import { connect } from "react-redux";
import ModalDetailPost from "../components/ModalDetailPost.component";
import ModalGiveFor from "../components/ModalGiveFor.component";
import AppLoading from "expo-app-loading";
import { Avatar } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
const { width } = Dimensions.get("window");
const height = width * 0.5;

import * as SecureStore from "expo-secure-store";
import NoteMessage from "../components/DetailConnectPost/noteFollow";
function DetailConnectPost(props) {
  const { navigation } = props;
  let data = props.route.params.data; // data from list
  // console.log(data)
  let titlePerson = props.route.params.titlePerson;
  const [isShowModel, setisShowModel] = useState(false);
  const [isShow, setIsShow] = useState(false); // model xác nhận xong
  const [isShowCancel, setIsShowCancel] = useState(false); // model xác nhận hủy
  const [typePost, setTypePost] = useState("gui");
  const [isloading, setIsLoading] = useState(false);
  //update history
  //get phone number author post
  useEffect(() => {
    if (
      data.typetransaction == "Đã nhận" ||
      data.typetransaction == "Chưa nhận" ||
      data.typetransaction == "Hủy nhận"
    ) {
      setTypePost("nhan");
    } else {
      setTypePost("gui");
    }
  }, [typePost]);

  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderName = () => {
    let nameReceive = data.SenderUser[0].FullName;
    let nameGive = data.PostData.NameAuthor;
    if (
      (typePost == "gui" && data.PostData.TypeAuthor == "tangcongdong") ||
      (typePost == "nhan" && data.PostData.TypeAuthor != "tangcongdong")
    ) {
      return nameReceive;
    }
    if (
      (typePost == "gui" && data.PostData.TypeAuthor != "tangcongdong") ||
      (typePost == "nhan" && data.PostData.TypeAuthor == "tangcongdong")
    ) {
      return nameGive;
    }
  };
  const renderAddress = () => {
    if (typePost == "gui") {
      return data.SenderAddress;
    }
    if (typePost == "nhan") {
      return data.PostData.address;
    }
  };
  //url phonenumber
  const dialCall = (number) => {
    var number_temp = "0" + number;
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  const checkPhone = () => {
    let numberSend = "0" + data.SenderUser[0].PhoneNumber;
    let numberRecei = "0" + data.ReceiverUser[0].PhoneNumber;
    if (props.auth.PhoneNumber == numberSend) {
      dialCall(numberRecei)
    } else {
      dialCall(numberSend)
    }
  }
  //Ham render avatar
  const renderAvatar = () => {
    let avatar;
    if (typePost == "nhan") {
      avatar = data.ReceiverUser[0].urlIamge;
    } else {
      avatar = data.SenderUser[0].urlIamge;
    }
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
            color="#757575"
          />
        </View>
      );
  };
  const renderId = () => {
    let id = data._id;
    return id.slice(0, 13) + "...";
  };

  const renderTime = (timeUTC) => {
    let time1 = new Date(timeUTC);
    let hour = time1.getHours();
    let minute = time1.getMinutes();
    let day = time1.getUTCDate();
    let month1 = time1.getUTCMonth() + 1;
    let year1 = time1.getUTCFullYear();
    let title = hour + ":" + minute + " - " + day + "/" + month1 + "/" + year1;
    return title;
  };

  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 28) return item.slice(0, 28) + "...";
    else return item;
  };
  

  const checkAvatar = (note) => {
    let avatar;
    if (note != null) {
      if (note.id == data.SenderUser[0].AccountID) {
        avatar = data.SenderUser[0].urlIamge;
        return avatar;
      }
      if (note.id == data.ReceiverUser[0].AccountID) {
        avatar = data.ReceiverUser[0].urlIamge;
        return avatar;
      }
    }
    return avatar;
  };
  const renderNote = () => {
    if (
      data.typetransaction == "Chưa nhận" ||
      data.typetransaction == "Chưa tặng"
    ) {
      if (data.NoteReceiver == null) {
        return <Text style={{ textAlign: "center" }}>Không có</Text>;
      } else {
        let avatarRe = checkAvatar(data.NoteReceiver);
        let avatarFi = checkAvatar(data.NoteFinish);
        return (
          <NoteMessage
            noteReceiver={data.NoteReceiver}
            noteFinish={data.NoteFinish}
            avatarRece={avatarRe}
            avatarFin={avatarFi}
          />
        );
      }
    } else {
      if (data.NoteReceiver == null && data.NoteFinish == null) {
        return <Text style={{ textAlign: "center" }}>Không có</Text>;
      } else {
        let avatarRe = checkAvatar(data.NoteReceiver);
        let avatarFi = checkAvatar(data.NoteFinish);
        return (
          <NoteMessage
            noteReceiver={data.NoteReceiver}
            noteFinish={data.NoteFinish}
            avatarRece={avatarRe}
            avatarFin={avatarFi}
          />
        );
      }
    }
  };
  const renderBottom = () => {
    if (data.isStatus == "cancel") return;
    if (data.isStatus != "done") {
      return (
        <View style={styles.wrapButton}>
          <TouchableOpacity
            style={styles.wrapCancel}
            onPress={() => setIsShowCancel(true)}
          >
            <Text style={styles.textCancel}>Hủy</Text>
          </TouchableOpacity>
          <Button
            color={config.color_btn_1}
            // size="large"
            onPress={() => setIsShow(true)}
          >
            <Text style={styles.textCall}>Xác nhận xong</Text>
          </Button>
        </View>
      );
    }
  };
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
      <Spinner
        visible={isloading}
        textContent={"Đang hủy..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.wrapTop}>
        <View style={styles.wrapTopLeft}>
          <Text style={styles.textId}>Mã số:</Text>
          <Text style={styles.styleId}>&ensp;{renderId()}</Text>
        </View>
        <Text style={styles.textCopy}>Sao chép</Text>
      </View>

      <View style={styles.wrapPerson}>
        <Text style={styles.textTitle}>{titlePerson}</Text>
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
              <View style={{ borderBottomWidth: 1, borderBottomColor: "#DDD" }}>
                <Text style={styles.textName}>{renderName()}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "2%",
                  }}
                >
                  <Text style={styles.textTypeUser}>Cá nhân</Text>
                  <TouchableOpacity
                    onPress={() => checkPhone()}
                  >
                    <Feather
                      name="phone-call"
                      size={width * 0.05}
                      color="#00a2e8"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wrapAddress}>
                <Text style={styles.textAddress}>
                  <Entypo name="location" size={width * 0.05} color="white" />{" "}
                  {"  "}
                  {renderAddress()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.wrapInfoPost}>
        <View style={styles.wrapTopInfo}>
          <Text style={styles.textTitle}>Thông tin tặng</Text>
          <Text style={styles.giveStatus}>{data.typetransaction}</Text>
        </View>
        <View style={styles.wrapProduct}>
          <TouchableOpacity
            style={styles.product}
            onPress={() => setisShowModel(true)}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.wrapImage}>
                {renderImage(data.PostData.urlImage[0])}
              </View>
              <View style={styles.wrapInfoProduct}>
                <View>
                  <Text style={styles.titlePost}>
                    {renderTitle(data.PostData.NameProduct[0].NameProduct)}
                  </Text>
                </View>

                <View style={styles.wrapTypePrice}>
                  <Text style={styles.type}>
                    {renderTitle(data.PostData.title)}
                  </Text>
                  <Text style={styles.price}>Miễn phí</Text>
                </View>
                <View style={styles.wrapTimeAddress}>
                  <View style={styles.wrapTime}>
                    <Feather name="clock" size={width * 0.04} color="gray" />
                    <Text style={styles.time}>
                      {renderTime(data.PostData.updatedAt)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapNote}>
          <Text style={styles.textTitle}>Ghi chú</Text>
          <Text style={styles.note}>{data.note}</Text>
          <Text style={styles.time2}>{renderTime(data.updatedAt)}</Text>
        </View>
      </View>
      <View style={styles.wrapFollow}>
        <Text style={styles.textTitle}>THEO DÕI</Text>
        {renderNote()}
      </View>
      <ModalDetailPost
        show={isShowModel}
        urlImage={data.PostData.urlImage}
        avatar={data.ReceiverUser.urlIamge}
        NameProduct={data.PostData.title}
        NameAuthor={data.PostData.NameAuthor}
        note={data.PostData.note}
        address={data.PostData.address}
        onPress={() => {
          setisShowModel(false);
        }}
      />
      <ModalGiveFor
        show={isShow}
        onPressClose={() => setIsShow(false)}
        idTrans={data._id}
        navigation={navigation}
        titleModal="Xác nhận xong"
        titleBtn="Xong"
        nameNote="notefinish"
        status="done"
      />
      <ModalGiveFor
        show={isShowCancel}
        onPressClose={() => setIsShow(false)}
        idTrans={data._id}
        navigation={navigation}
        titleModal="Xác nhận hủy"
        titleBtn="Hủy"
        nameNote="notefinish"
        status="cancel"
      />
      {renderBottom()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  spinnerTextStyle: {
    color: "#FFF",
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
    width: "80%",
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
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    paddingLeft: "4%",
    paddingRight: "2%",
  },
  note: {
    fontSize: config.fontsize_3,
    color: "black",
    fontFamily: "OpenSans_400Regular",
    marginLeft: "4%",
  },
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
    fontSize: config.fontsize_3,
    color: "gray",
  },
  styleId: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
  },
  textCopy: {
    fontSize: config.fontsize_3,
    color: "#26c6da",
  },
  wrapPerson: {
    backgroundColor: "#e5e5e5",
    marginTop: 5,
    paddingBottom: 10,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
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
    paddingRight: "2%",
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
    paddingBottom: "4%",
  },
  wrapTopInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  giveStatus: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: config.fontsize_3,
    backgroundColor: "#C3C3C3",
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
    borderRadius: 10,
  },
  // style product
  product: {
    backgroundColor: "#FFF",
    paddingLeft: "1%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 10,
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
  time2: {
    fontSize: config.fontsize_3,
    color: "#757575",
    fontFamily: "OpenSans_400Regular",
    textAlign: "right",
    marginRight: "2%",
  },
  address: {
    color: "black",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
});
export default connect(function (state) {
  return {
    auth: state.auth,
  };
})(DetailConnectPost);
