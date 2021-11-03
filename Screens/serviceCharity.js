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
import NewPostType from "../components/newpostType.component";
import config from '../config';
// const heightStatusBar = StatusBar.currentHeight;//get status bar height

function ServiceCharity(props) {
  const { navigation } = props;
  const { dispatch } = props;

  const actionOnPressTCD = () => {
    dispatch({ type: "COMPLETE_TCD" }); // redirect màn hình complete
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadTCD" });// chia luồn cateogorynocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
    navigation.navigate("Category");
  };
  // onPress tặng người nghèo
  const actionOnPressGiveCaNhan = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" });// chia luồn cateogorynocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForCaNhan" });
    navigation.navigate("ListNeedSupport");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressGiveQuy = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" });// chia luồn cateogorynocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForQuy" });
    navigation.navigate("ListNeedSupport");
  };
  // onpress quyên góp công ích
  const actionOnPressGiveCongIch = () => {
    dispatch({ type: "setThreadCategory" });
    dispatch({ type: "setThreadGiveGroup" });// chia luồn cateogorynocheckbox giữa givefor và tặng cộng đồng
    dispatch({ type: "giveForCongIch" });
    navigation.navigate("ListNeedSupport");
  };

  return (
    <View style={styles.container}>
      <NewPostType title="Tặng cộng đồng" onPress={() => actionOnPressTCD()} />
      <NewPostType
        title="Tặng hoàn cảnh khó khăn"
        onPress={() => actionOnPressGiveCaNhan()}
      />
      <NewPostType
        title="Tặng Quỹ/Nhóm từ thiện"
        onPress={() => actionOnPressGiveQuy()}
      />
      <NewPostType
        title="Đóng góp công ích"
        onPress={() => actionOnPressGiveCongIch()}
      />

      <Text style={styles.textContent}>
        <Text style={{ textDecorationLine: "underline" }}>Tặng cộng đồng</Text>{" "}
        : Tin đăng được hiển thị cho mọi người ai cần sẽ trực tiếp liên hệ với
        bạn.
      </Text>
      <Text style={styles.textContent}>
        <Text style={{ textDecorationLine: "underline" }}>Góp công ích</Text> :
        Góp cho trùng tu, xây dựng cầu đường, bệnh viện, trường học,... do các
        tổ chức "UBND, Hội chữ thập đỏ, trường học, bệnh viện, nhà chùa, nhà
        thờ,..." chủ trì
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
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_400Regular",
  },
  textContent: {
    marginTop: '5%',
    marginLeft: '4%', 
    marginRight: '4%',
    textAlign: "justify",
    fontFamily: "OpenSans_400Regular",
  },
});
export default connect(function (state) {
  return {
    controlThreadGiveFor: state.controlThreadGiveFor,
    controlConfirmAddress: state.controlConfirmAddress,
    controlThreadTCD: state.controlThreadTCD,
    redirectComplete: state.redirectComplete,
  };
})(ServiceCharity);
