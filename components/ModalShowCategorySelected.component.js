import React, { Fragment, Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function App(props) {
  const [show, setshow] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={props.show} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={styles.wrapModel}>
          <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DDD",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft: "2%",
                paddingTop: "2%",
                paddingBottom: "2%",
              }}
            >
              <TouchableOpacity onPress={props.onPress}>
                <AntDesign name="close" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.titleModel}>Danh mục xin</Text>
            </View>
            <ScrollView>
              <View style={{ paddingLeft: "2%" }}>
                <Text style={{ fontSize: 20 }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. It is a long established fact that a
                  reader will be distracted by the readable content of a page
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look
                  like readable English. Many desktop publishing packages and
                  web page editors now use Lorem Ipsum as their default model
                  text, and a search for 'lorem ipsum' will uncover many web
                  sites still in their infancy. Various versions have evolved
                  over the years, sometimes by accident, sometimes on purpose
                  (injected humour and the like)
                </Text>
              </View>
            </ScrollView>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E2",
  },
  wrapModel: {
    backgroundColor: "#ffffff",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "40%",
    marginBottom: "40%",
    borderRadius: 10,
    flex: 1,
  },
  titleModel: {
    fontSize: 20,
    marginLeft: "5%",
    fontFamily: "OpenSans_600SemiBold",
  },
});
