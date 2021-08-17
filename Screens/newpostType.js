import React, { useState } from "react";
import { FlatList, StyleSheet, View, StatusBar } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import NewPostType from "../components/newpostType.component";

// const heightStatusBar = StatusBar.currentHeight;//get status bar height

function PostType(props) {
  const { navigation } = props;
  const { dispatch } = props;
  const actionOnPressCXD = () => {
    
    dispatch({ type: "setThreadCategoryCheckBox" });
    navigation.navigate("ConfirmAddress");
 
};
  const actionOnPressTCD = () => {
    dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadTCD" });
      dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
      navigation.navigate("ConfirmAddress");
   
  };
  // onPress tặng người nghèo
  const actionOnPressGiveCaNhan = () => {
    dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCaNhan" });
      navigation.navigate("ConfirmAddress");
   
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressGiveQuy = () => {
    dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForQuy" });
      navigation.navigate("ConfirmAddress");
   
  };
  // onpress quyên góp công ích
  const actionOnPressGiveCongIch = () => {
    dispatch({ type: "setThreadCategory" });
      dispatch({ type: "setThreadGiveGroup" });
      dispatch({ type: "giveForCongIch" });
      navigation.navigate("ConfirmAddress");
   
  };

  return (
    <View style={styles.container}>
      <NewPostType
        title="Cần xin đồ"
        onPress={() => actionOnPressCXD()}
      />
      <NewPostType
        title="Tặng cộng đồng"
        onPress={() => actionOnPressTCD()}
      />
      <NewPostType
        title="Tặng người nghèo"
        onPress={() => actionOnPressGiveCaNhan()}
      />
      <NewPostType
        title="Tặng quỹ nhóm từ thiện"
        onPress={() => actionOnPressGiveQuy()}
      />
      <NewPostType
        title="Tặng quyên góp công ích"
        onPress={() => actionOnPressGiveCongIch()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: heightStatusBar,
    backgroundColor: "#f2f2f2",
  },
});
export default connect(function (state) {
  return {
    controlThreadGiveFor: state.controlThreadGiveFor,
    controlConfirmAddress: state.controlConfirmAddress,
  };
})(PostType);
