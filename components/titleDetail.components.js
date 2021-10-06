import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import config from "../config";
import { BottomSheet } from "react-native-elements";
import ModalCamera from "./ModalCamera";

var { width } = Dimensions.get("window");

const UselessTextInput = (props) => {
  return (
    <TextInput
      placeholder="Viết mô tả..."
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      style={{
        textAlignVertical: "top",
        paddingLeft: 5,
        fontSize: config.fontsize_5,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: "OpenSans_400Regular",
      }}
    />
  );
};

const titleDetail = (props) => {
  const { dispatch } = props;
  const [number, onChangeNumber] = useState(null);
  const [value, onChangeText] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img, index) => {
        return (
          <View>
            <Image
              source={{ uri: img.uri }}
              key={img.uri}
              style={styles.imgUpload}
            />
            <TouchableOpacity onPress={() => removeImage(index)} style={{position: 'absolute', right: 0, top: 0}}>
              <AntDesign name="closecircle" size={width*0.05} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  const removeImage = (index) => {
    let listImage = props.infoPost.image;
    listImage.splice(index, 1);
    dispatch({ type: "GET_IMG", image: listImage });
  };

  const handleImage = () => {
    setIsVisible(true);
  };
  const handleCamera = () => {
    setIsVisible(false);
    setIsShow(true);
  };
  const doneCamera = () => {
    setIsShow(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              fontSize: config.fontsize_3,
            }}
          >
            Tiêu đề*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              dispatch({ type: "GET_TITLE", title: text })
            }
            value={number}
            placeholder="Viết tiêu đề hoặc lời nhắn"
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              fontSize: config.fontsize_3,
            }}
          >
            Ghi chú thêm(nếu có)
          </Text>
          <View style={styles.inputDescription}>
            <UselessTextInput
              multiline
              onChangeText={(text) =>
                dispatch({ type: "GET_NOTE", note: text })
              }
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              fontSize: config.fontsize_3,
            }}
          >
            Hình ảnh (tối đa 5 hình ảnh)
          </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={styles.borderUpload}
              onPress={() => handleImage()}
            >
              <AntDesign name="clouduploado" size={70} color="#B1B1B1" />
            </TouchableOpacity>
            {renderIMG()}
          </ScrollView>
        </View>
        <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
          >
            <View style={{padding: '2%', backgroundColor: '#BCBCBC'}}>
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 10
                }}
              >
                <TouchableOpacity
                  style={styles.itemBottomSheet}
                  onPress={() => handleCamera()}
                >
                  <Text style={styles.textBottomSheet}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemBottomSheet}
                  onPress={() => {
                    setIsVisible(false);
                    props.onPress();
                  }}
                >
                  <Text style={styles.textBottomSheet}>Chọn ảnh</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={{ padding: "2%", backgroundColor: '#FFF', 
                borderRadius: 10, marginTop: '2%' }}
              >
                <Text style={[styles.textBottomSheet, { color: "#077DFF" }]}>
                  Hủy
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        <ModalCamera
          show={isShow}
          close={() => setIsShow(false)}
          doneCamera={() => doneCamera()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: "#F5F5F5",
  },
  input: {
    height: width * 0.1,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 8,
    paddingLeft: 10,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#B1B1B1",
    fontSize: config.fontsize_5,
    backgroundColor: "white",
    fontFamily: "OpenSans_400Regular",
  },
  inputDescription: {
    borderColor: "#B1B1B1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  borderUpload: {
    width: 100,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#B1B1B1",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#FFF",
  },
  imgUpload: {
    height: 100,
    width: 100,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  wrapAllImage: {
    flexDirection: "row",
  },
  itemBottomSheet: {
    padding: "2%",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  textBottomSheet: { 
    fontSize: config.fontsize_5, 
    textAlign: "center", 
    color: '#077DFF' },
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(titleDetail);
