import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from "react-native";
import ModelShowCategory from './ModalShowCategorySelected.component';
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import config from '../config';
const UselessTextInput = (props) => {
  return (
    <TextInput
      value={props.note}
      placeholder="Không có mô tả"
      editable={false}
      selectTextOnFocus={false}
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      style={styles.textInputDescription}
    />
  );
};

function App(props) {
  const [isShowModelCate, setisShowModelCate] = useState(false);
  const address = props.infoPost.address.split(",");
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
      <Entypo name="plus" size={110} color="#CCCCCC" />
      <Entypo name="plus" size={110} color="#CCCCCC" />
      <Entypo name="plus" size={110} color="#CCCCCC" />
      <Entypo name="plus" size={110} color="#CCCCCC" />
      <Entypo name="plus" size={110} color="#CCCCCC" />
    </>
  );
  const getTypeAuthor = () => {
    if (props.infoPost.TypeAuthor == "tangcongdong") return "Tặng cộng đồng";
    if (props.infoPost.TypeAuthor == "cá nhân")
      return "Người nghèo/ Hoàn cảnh khó khăn";
    else return props.infoPost.TypeAuthor;
  };


  const renderCategory = () => {
    if (props.infoPost.NameProduct.length == 1) {
      return (
        <Text style={styles.textContent}>
          {props.infoPost.NameProduct[0].NameProduct}
        </Text>
      );
    } else {
      return (
        <View style={styles.wraptCategory}>
          <Text style={styles.textContent}>
            Danh mục xin: {props.infoPost.NameProduct.length}
          </Text>
          <TouchableOpacity onPress={() => setisShowModelCate(true)}>
            <Text style={styles.wraptManyCategories}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <ScrollView>
      <ModelShowCategory show={isShowModelCate} onPress={() => {setisShowModelCate(false)}} dataNameProduct={props.infoPost.NameProduct}/>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN CHUNG</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Dịch vụ*</Text>
        <Text style={styles.textContent}>{getTypeAuthor()}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Danh mục*</Text>
        {renderCategory()}
      </View>
      <View style={styles.backgroundTitle}>
        <Text style={styles.textTitle}>THÔNG TIN MÔ TẢ</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Tiêu đề*</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={props.infoPost.title}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Mô tả thêm</Text>
        <View style={styles.inputDescription}>
          <UselessTextInput
            multiline
            numberOfLines={4}
            note={props.infoPost.note}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.childTitle}>Hình kèm theo(tối đa 5)</Text>

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
        <Text style={styles.textTitle}>ĐỊA CHỈ CỦA BẠN</Text>
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
    backgroundColor: "#F5F5F5",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: config.fontsize_5,
    paddingTop: 8,
    paddingLeft: 10,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 10,
    color: "#000",
    borderColor: "#B1B1B1",
    backgroundColor: "#FFF",
    fontFamily: "OpenSans_400Regular",
  },
  inputDescription: {
    borderColor: "#B1B1B1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#FFF",
    marginTop: 10,
    marginBottom: 10,
  },
  textInputDescription: {
    fontSize: config.fontsize_5,
    color: "#000",
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: "OpenSans_400Regular",
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
    backgroundColor: "#E1E1E1",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  textTitle: {
    color: "#999999",
    fontSize: config.fontsize_5,
    // fontWeight: "bold",
    fontFamily: "OpenSans_700Bold",
  },
  childTitle: {
    color: "#A1A1A1",
    fontSize: config.fontsize_3,
    marginBottom: 10,
    fontFamily: "OpenSans_400Regular",
  },
  textContent: {
    color: "#000",
    fontSize: config.fontsize_5,
    marginBottom: 10,
    fontFamily: "OpenSans_400Regular",
  },
  wraptCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wraptManyCategories: {
    color: "#039BE5",
    fontFamily: "OpenSans_400Regular",
    paddingRight: "4%",
    fontSize: config.fontsize_3,
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(App);
