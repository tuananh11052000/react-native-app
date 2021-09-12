import React, { Fragment, Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions, Image
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import config from "../config";
var { width } = Dimensions.get("window");
const height = width * 0.5;
export default function App(props) {
  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const renderSlideImage = () => {
    if (props.urlImage.length != 0) {
      return (
        <>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
          >
            {props.urlImage.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {props.urlImage.map((i, k) => (
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
          <MaterialCommunityIcons
            name="home-heart"
            size={width * 0.3}
            color="#CCC"
          />
        </View>
      );
    }
  };
  const renderAvatar = () => {
    if (props.avatar != null)
      return (
        <View>
          <Avatar
            size={70}
            rounded
            source={{ uri: props.avatar }}
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
  const renderCategory = () => {
    return (
      <View style={styles.wrapCategory}>
        <Text style={styles.textCategory}>{props.NameProduct}</Text>
        <Text style={styles.textPrice}>Miễn phí</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={props.show} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={styles.wrapModel}>
            <View style={styles.insideModel}>
              <TouchableOpacity onPress={props.onPress}>
                <AntDesign name="close" size={width * 0.05} color="black" />
              </TouchableOpacity>
              <Text style={styles.titleModel}>Thông tin</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}
            >
              <View>
                <View>{renderSlideImage()}</View>
                <View style={styles.wrapText}>
                  <View style={styles.wrapCategory}>
                    <Text style={styles.textTitle}>{props.NameProduct}</Text>
                    <Text style={styles.textPrice}>Miễn phí</Text>
                  </View>
                  <View style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                    <Text style={styles.textAddress}>
                      <Entypo name="location" size={24} color="#DDD" /> {"  "}
                      {props.address}
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
                        <Text style={styles.textName}>{props.NameAuthor}</Text>
                        <Text style={styles.textTypeUser}>Cá nhân</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textDescription}>{props.note}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapModel: {
    backgroundColor: "#ffffff",
    marginLeft: "4%",
    marginRight: "4%",
    marginTop: "10%",
    marginBottom: "10%",
    borderRadius: 10,
    flex: 1,
  },
  titleModel: {
    fontSize: config.fontsize_2,
    marginLeft: "5%",
    fontFamily: "OpenSans_600SemiBold",
  },
  insideModel: {
    flexDirection: "row",
    backgroundColor: "#DDD",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: "2%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  // style detail

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
    paddingLeft: "2%",
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
});
