import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";

import VerifyOtp from "../components/verifyOpt.component";

const heightStatusBar = StatusBar.currentHeight; //lay ra chieu cao cua thanh trang thai

function VerifyOtps(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <VerifyOtp navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: heightStatusBar * 2,
  },
});
export default connect(function (state) {
  return { register: state.register };
})(VerifyOtps);
