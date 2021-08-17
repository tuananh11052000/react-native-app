import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Button } from "galio-framework";
import config from "../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");
const height = width * 0.6;
export default function App(props) {
  let data = props.route.params.data; // data from list

  const [active, setActive] = useState(0);
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
  useEffect(() => {
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
  }, []);

  //get phone number author post
  useEffect(() => {
    const getPhone = async (AuthorID) => {
      try {
        await axios({
          method: "get",
          url:
            "https://smai-app-api.herokuapp.com/user/getPhonNumber?AuthorID=" +
            AuthorID,
        }).then(async (data) => {
          setPhoneNumber(data.data.PhoneNumber);
        });
      } catch (e) {
        alert(e);
      }
    };
    getPhone(data.AuthorID);
  }, []);

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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <View>
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
        </View>
        <View style={styles.wrapText}>
          <View>
            <Text style={styles.textTitle}>{data.title}</Text>
          </View>
          <View style={styles.wrapCategory}>
            <Text style={styles.textCategory}>
              {data.NameProduct[0].NameProduct}
            </Text>
            <Text style={styles.textPrice}>Miễn phí</Text>
          </View>
          <View>
            <Text style={styles.textAddress}>
              <Entypo name="location" size={24} color="black" /> {"  "}
              {data.address}
            </Text>
          </View>
          <View style={styles.wrapInfor}>
            <FontAwesome name="user-circle-o" size={70} color="#BDBDBD" />
            <View style={styles.wrapName}>
              <Text style={styles.textName}>{data.NameAuthor}</Text>
              <Text style={styles.textTypeUser}>Cá nhân</Text>
            </View>
          </View>
          <View>
            <Text style={styles.textDescription}>{data.note}</Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapButton}>{button}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width,
    height,
    backgroundColor: "#FFF",
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
    resizeMode: "contain",
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  textTitle: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wrapCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textCategory: {
    fontSize: 20,
  },
  textPrice: {
    fontSize: 20,
    color: "#3DA20E",
  },
  textAddress: {
    color: "#A1A1A1",
    fontSize: 18,
  },
  wrapInfor: {
    flexDirection: "row",
    borderTopWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapName: {
    marginLeft: 20,
  },
  textName: {
    fontSize: 25,
  },
  textTypeUser: {
    fontSize: 20,
    color: "#757575",
  },
  textDescription: {
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
  },
  wrapButton: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textCall: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
});
