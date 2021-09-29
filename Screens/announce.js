import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import config from "../config";
import AnnounceComponent from "../components/annouce/anounce.component";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
const { width } = Dimensions.get("window");
function Announce(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(true);
  const getConnectPostDS = async () => {
    if (props.auth.isLogin == true) {
      let token = await SecureStore.getItemAsync("token");
      await axios({
        method: "get",
        url: "https://api.smai.com.vn/push/get-notification",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setData(res.data.data.data);
          console.log(res.data.data.data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          setrefreshing(false);
        });
    }
  };
  useEffect(() => {
    getConnectPostDS();
  }, []);
  const onRefresh = () => {
    setData([]);
    getConnectPostDS();
  };
  const renderItem = ({ item }) => {
    return (
      <AnnounceComponent
        bodyNotification={item.bodyNotification}
        updatedAt={item.updatedAt}
        titleNotification={item.titleNotification}
        idTransaction={item.idTransaction}
        idNotification={item._id}
        examined={item.ownerID[0].examined}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {props.auth.isLogin ? (
        <>
          {refreshing ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <ActivityIndicator color="#BDBDBD" size="small" />
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </>
      ) : (
        <>
          <View style={styles.notLogin}>
            <Text style={{ color: "#4B4C4F" }}>Vui lòng đăng nhập</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  notLogin: {
    backgroundColor: "#DDD",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(function (state) {
  return {
    auth: state.auth,
    infoPost: state.infoPost,
    reloadPost: state.reloadPost,
    controlConfirmAddress: state.controlConfirmAddress,
    dataTrans: state.dataTrans,
  };
})(Announce);

/*
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

*/
