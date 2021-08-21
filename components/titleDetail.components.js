import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
const UselessTextInput = (props) => {
  return (
    <TextInput
      placeholder="Viết mô tả..."
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      style={{
        textAlignVertical: "top",
        paddingLeft: 5,
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: "OpenSans_400Regular",
      }}
    />
  );
};

const titleDetail = (props) => {
  const [number, onChangeNumber] = React.useState(null);
  const [value, onChangeText] = React.useState(null);
  const renderIMG = () => {
    if (props.infoPost.image) {
      return props.infoPost.image.map((img) => {
        return (
          <Image
            source={{ uri: img.uri }}
            key={img.uri}
            style={styles.imgUpload}
          />
        );
      });
    }
  };
  const { dispatch } = props;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={{ fontFamily: "OpenSans_400Regular" }}>Tiêu đề*</Text>
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
          <Text style={{ fontFamily: "OpenSans_400Regular" }}>
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
          <Text style={{ fontFamily: "OpenSans_400Regular" }}>
            Hình ảnh (tối đa 5 hình ảnh)
          </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={styles.borderUpload}
              onPress={() => props.onPress()}
            >
              <AntDesign name="clouduploado" size={70} color="#B1B1B1" />
            </TouchableOpacity>
            {renderIMG()}
          </ScrollView>
        </View>
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
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 8,
    paddingLeft: 10,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#B1B1B1",
    fontSize: 18,
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
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(titleDetail);
