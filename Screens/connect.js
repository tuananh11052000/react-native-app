import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function Connection(props) {
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textTitle}>Tính năng này đang phát triển.....</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center'

  },
  textTitle: {
      color: '#616161'
  }
 
});
