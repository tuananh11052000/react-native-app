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
  FlatList,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import config from "../config";
export default function App(props) {
  const [show, setshow] = useState(false);
  console.log(props.dataNameProduct);
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <Text
        style={{
          fontSize: config.fontsize_2,

          paddingRight: "2%",
          paddingLeft: "2%",
          textAlign: "center",
        }}
      >
        {item.NameProduct}
      </Text>
      <Ionicons name="checkbox" size={24} color="#018786" />
    </View>
  );
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
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
            <FlatList
              data={props.dataNameProduct}
              renderItem={renderItem}
              keyExtractor={(item) => item.NameProduct}
              ItemSeparatorComponent={ItemSeparatorView}
            />
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
