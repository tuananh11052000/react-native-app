import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
function Completed(props) {
  const { navigation, dispatch } = props;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBox}>
        <View>
          <Text style={styles.textRequired}>Đã được yêu cầu thành công</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonComplete}
          onPress={() => {
            dispatch({ type: "setReload" });
            navigation.navigate("Home")
        }}
        >
          <Text style={styles.textComplete}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  backgroundBox: {
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
  },
  textRequired: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans_600SemiBold",
  },
  buttonComplete: {
    backgroundColor: "#E53935",
    paddingVertical: 5,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    marginTop: 15,
  },
  textComplete: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
  },
});

export default connect(function (state) {
  return { reloadPost: state.reloadPost };
})(Completed);
