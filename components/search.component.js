import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import bgrImage from "../assets/background.jpg";
import bell from "../assets/bell1.png";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Gift from "./gift.component";
import smaiportain from "../assets/iconhome.png";
import { connect } from "react-redux";
import config from '../config';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
function SearchComponent(props) {
  const {navigation, dispatch} = props;
   // onPress tặng cộng đồng
   const actionOnPressTCD = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "setThreadCategory" }); // redirect address giữa tặng cộng đồng và cần xin đồ ở home và createPost
      dispatch({ type: "setThreadTCD" });
      dispatch({ type: "SET_TYPE_AUTHOR", TypeAuthor: "tangcongdong" });
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onPress tặng người nghèo
  const actionOnPressCXD = () => {
    if (props.auth.isLogin == true) {
      dispatch({ type: "COMPLETE_CXD" });
      dispatch({ type: "setThreadCXD" }); // redirect address giữa tặng cộng đồng và cần xin đồ ở home và createPost
      navigation.navigate("ConfirmAddress");
    } else navigation.replace("Authentication");
  };
  // onpress tặng quỹ từ thiện
  const actionOnPressMedicalAdvise = () => {
    if (props.auth.isLogin == true) {
      navigation.navigate("MedicalAdvise");
    } else navigation.replace("Authentication");
  };
  return (
    <View style={style.wrapSearchBgr}>
      <Image source={bgrImage} style={style.bgr_style} resizeMode='stretch'/>
    
      <View style={style.wrapSearchBox}>
        <View style={{ backgroundColor: "#FFF",width: '80%', borderRadius: 10, padding: '1%',
        borderColor: '#BDBDBD', borderWidth: 1 }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <View  style={{width: SCREEN_WIDTH*0.06, height:  SCREEN_WIDTH*0.06}}>
              <Image source={smaiportain} resizeMode="center" style={{ width: '100%', height: '100%'}} />
              </View>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: config.fontsize_3, marginLeft: '1%'}}>Smai</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginBottom: '1%'}}>
              <TouchableOpacity onPress={() => props.onPress()}>
                <EvilIcons name="search" size={SCREEN_WIDTH*0.07} color="black" />
              </TouchableOpacity>
              <View style={{backgroundColor: '#CCC', width: '1%', height: SCREEN_WIDTH*0.06, marginLeft: '2%', marginRight: '1%'}}/>
              <TouchableOpacity             
                onPress={() => props.pressAnnounce()}
              >
                <Image source={bell} style={style.bellImage} resizeMode='contain'/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 0.5, borderColor: '#CCC', marginLeft: '1%', marginRight: '1%', marginBottom: '2%'}}/>
          <Gift   onPressTCD={() => actionOnPressTCD()}
          onPressCXD={() => actionOnPressCXD()}
          onPressMedicalAdvise={() => actionOnPressMedicalAdvise()}/>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  wrapSearchBgr: {
    flexDirection: "column",
    height: SCREEN_WIDTH * 0.45, 
    backgroundColor: '#DDD',
    position: 'relative', 
    marginBottom: '20%',
    marginTop: '-4%'
  },
  wrapSearchBox: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -62,

   
  },
  wrapSearch: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchInput: {
    minWidth: "70%",
    maxWidth: "70%",
    height: 50,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    paddingLeft: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#847B80",
  },
  bellImage: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  wrapBell: {
    height: 50,
    backgroundColor: "#EBEBEB",
    borderTopRightRadius: 8,
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomRightRadius: 8,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#847B80",
  },
  bgr_style: {
    height: SCREEN_WIDTH * 0.5,
    width: "100%",
    marginTop: '-2%'
  },
});
export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    newestPost: state.newestPost,
    controlThreadGiveFor: state.controlThreadGiveFor,
    profile: state.profile,
    controlConfirmAddress: state.controlConfirmAddress,
    reloadPost: state.reloadPost,
    redirectComplete: state.redirectComplete,
  };
})(SearchComponent);