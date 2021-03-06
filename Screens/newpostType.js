import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import NewPostType from "../components/newpostType.component";
import PriorityImg from "../assets/priority_preview.png";

// const heightStatusBar = StatusBar.currentHeight;//get status bar height

function PostType(props) {
  const { navigation } = props;
  const { dispatch } = props;
  const actionOnPressCXD = () => {
    dispatch({ type: "COMPLETE_CXD" }); //redirect màn hình complete
    dispatch({ type: "setThreadCategoryCheckBox" });
    navigation.navigate("WhoConfirm");
  };
  const actionOnPressTCD = () => {
    dispatch({ type: "COMPLETE_TCD" }); //redirect màn hình complete
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadTCD" });// chia luồn cateogorynocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
    navigation.navigate("Category");
  };
  // onPress tặng người nghèo
  const actionOnPressGiveCaNhan = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" }); // chia luồn cateogory nocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForCaNhan" });
    navigation.navigate("ListNeedSupport");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressGiveQuy = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" });// chia luồn cateogory nocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForQuy" });
    navigation.navigate("ListNeedSupport");
  };
  // onpress quyên góp công ích
  const actionOnPressGiveCongIch = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" });// chia luồn cateogory nocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForCongIch" });
    navigation.navigate("ListNeedSupport");
  };

  return (
    <View style={styles.container}>
      <NewPostType title="Tôi cần hỗ trợ" onPress={() => actionOnPressCXD()} />
      <NewPostType title="Tặng cộng đồng" onPress={() => actionOnPressTCD()} />
      <NewPostType
        title="Tặng người khó khăn"
        onPress={() => actionOnPressGiveCaNhan()}
      />
      <NewPostType
        title="Tặng quỹ từ thiện"
        onPress={() => actionOnPressGiveQuy()}
      />
      <NewPostType
        title="Quyên góp công ích"
        onPress={() => actionOnPressGiveCongIch()}
      />
      <View style={styles.row}>
        <Image source={PriorityImg} style={{ width: 26, height: 26 }} />
        <Text style={styles.textNote}> Lưu ý</Text>
      </View>
      <Text style={styles.textContent}>
        Tổ chức công ích bao gồm: Trường học, bệnh viện, UBND, Hội Chữ Thập Đỏ,
        Nhà thờ, ... cần quyên góp xây dựng "đường, cầu cống, nhà tình thương".
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: heightStatusBar,
    backgroundColor: "#e5e5e5",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  textNote: {
    fontSize: 20,
    fontFamily: "OpenSans_400Regular",
  },
  textContent: {
    padding: 16,
    textAlign: "justify",
    fontFamily: "OpenSans_400Regular",
  },
});
export default connect(function (state) {
  return {
    controlThreadGiveFor: state.controlThreadGiveFor,
    controlConfirmAddress: state.controlConfirmAddress,
    redirectComplete: state.redirectComplete,
  };
})(PostType);
