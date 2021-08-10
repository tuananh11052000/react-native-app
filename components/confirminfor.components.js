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
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
const UselessTextInput = (props) => {
  return (
    <TextInput
      placeholder={props.note}
      editable={false} selectTextOnFocus={false}
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      style={styles.textInputDescription}

    />
  );
};

function App(props) {
  const address = props.infoPost.address.split(",")
  console.log(address)
  const renderItem = ({ item }) => (
    <Image
      style={{
        padding: 0,
        width: 160,
        height: 160,
        marginRight: 5,
        resizeMode: "contain",
      }}
      source={{
        uri: item.uri,
      }}
    />
  );
  const renderEmptyItem = () => (
    <>
      <Entypo   name="plus" size={110} color="#CCCCCC" />
      <Entypo   name="plus" size={110} color="#CCCCCC" />
      <Entypo   name="plus" size={110} color="#CCCCCC" />
      <Entypo   name="plus" size={110} color="#CCCCCC" />
      <Entypo   name="plus" size={110} color="#CCCCCC" />
    </>
  );
  return (
    <ScrollView>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN CHUNG</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Bạn là ai*</Text>
        <Text style={styles.textContent}>{props.infoPost.TypeAuthor}</Text>
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
        <TextInput style={styles.input} value={props.infoPost.title} />
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Ghi chú thêm(nếu có)</Text>
        <View style={styles.inputDescription}>
          <UselessTextInput multiline numberOfLines={4} note={props.infoPost.note} />
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
          ListEmptyComponent={renderEmptyItem}
        />
      </View>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN ĐỊA CHỈ</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.childTitle}>Tỉnh/thành phố*</Text>
          <Text style={styles.textContent}>{address[3]}</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Quận/huyện</Text>
          <Text style={styles.textContent}>{address[2]}</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Phường/xã*</Text>
          <Text style={styles.textContent}>{address[1]}</Text>
        </View>
        <View>
          <Text style={styles.childTitle}>Số nhà/ấp/thôn</Text>
          <Text style={styles.textContent}>{address[0]}</Text>
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
    color: '#000',
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
export default connect(function (state) {
  return { infoPost: state.infoPost }
})(App);