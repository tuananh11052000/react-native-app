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
import {connect} from 'react-redux';
import InforAddress from '../components/nameAndAddress.component';
import ButtonCofirm from '../components/buttonConfirm.components';

function ConfirmGiveFor(props) {
  const {dispatch, navigation} = props;
  const pressConfirm = () => {
    dispatch({ type: "COMPLETE_GIVEFOR" });
    dispatch({ type: "RESET" });
    navigation.navigate("Completed");
  }

  return (
    <SafeAreaView style={styles.container}>
        <InforAddress onPress={() => navigation.navigate('Chọn ảnh')}/>
        <View style={{backgroundColor: '#DDD'}}>
        <ButtonCofirm textBtn="Gửi tặng" onPress={() => pressConfirm()} />
        </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
export default connect(function(state) {
  return {
    redirectComplete: state.redirectComplete,
    infoPost: state.infoPost
  };
})(ConfirmGiveFor);