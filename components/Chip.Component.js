import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
var { width } = Dimensions.get("window");
function MyComponent(props) {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={() => props.onPress()}>
        {props.active ? (<View style={styles.triangleCorner} />) : (<></>)}
        <Text style={props.textStyle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: width*0.035,
    borderTopWidth: width*0.035,
    borderTopLeftRadius: 10,
    position: "absolute",
    top: -1,
    left: -1,
    borderRightColor: "transparent",
    borderTopColor: "#EF1A26",
  },
});
export default MyComponent;
