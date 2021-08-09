import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
const dataa = [
  {
    imageUrl:
      "https://images.pexels.com/photos/8959553/pexels-photo-8959553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "something",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/8906445/pexels-photo-8906445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "something two",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/6562811/pexels-photo-6562811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "something three",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/6731324/pexels-photo-6731324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "something four",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/4207788/pexels-photo-4207788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "something five",
  },
];
const UselessTextInput = (props) => {
  return (
    <TextInput
      placeholder="Mô tả hoặc ghi chú"
      editable={false} selectTextOnFocus={false}
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      style={styles.textInputDescription}
      
    />
  );
};

export default function App(props) {
  const [data, setdata] = useState(dataa);

  const renderItem = ({ item }) => (
      <Image
        style={{padding: 0,
            width: 160,
            height: 160,
            marginRight: 5,
            resizeMode: "contain",}}
        source={{
          uri: item.uri,
        }}
      />
  );

  return (
    <ScrollView>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN CHUNG</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Bạn là ai*</Text>
        <Text style={styles.textContent}>Người nghèo/ hoàn cảnh khó khăn</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Danh mục*</Text>
        <Text style={styles.textContent}>Danh mục nhận tặng</Text>
      </View>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN MÔ TẢ</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Tiêu đề*</Text>
        <TextInput style={styles.input} placeholder="Lời nhắn" />
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Ghi chú thêm(nếu có)</Text>
        <View style={styles.inputDescription}>
          <UselessTextInput multiline numberOfLines={4} />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Hình ảnh(tối đa 5 hình ảnh)</Text>

        <FlatList
          horizontal
          data={props.dataImage}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 10 }}
        />
      </View>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN ĐỊA CHỈ</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.childTitle}>Tỉnh/thành phố*</Text>
          <Text style={styles.textContent}>Thành phố Hồ Chí Minh</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Quận/huyện</Text>
          <Text style={styles.textContent}>Quận 1</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Phường/xã*</Text>
          <Text style={styles.textContent}>Phường Đa kao</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Số nhà/ấp/thôn</Text>
          <Text style={styles.textContent}>89 Điện Biên Phủ</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#B1B1B1",
  },
  inputDescription: {
    borderColor: "#B1B1B1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,

    marginTop: 10,
    marginBottom: 10,
  },
  textInputDescription: {
    fontSize: 20,
    color: "#000",
    textAlignVertical: "top",
    paddingLeft: 10, paddingTop: 10,
  },
  borderUpload: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#B1B1B1",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
  },
  backgroundTitle: {
    backgroundColor: "#EBEBEB",
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  textTitle: {
    color: "#999999",
    fontSize: 23,
    fontWeight: "bold",
  },
  childTitle: {
    color: "#A1A1A1",
    fontSize: 15,
    marginBottom: 10,
  },
  textContent: {
    color: "#000",
    fontSize: 20,
    marginBottom: 10,
  },
});
