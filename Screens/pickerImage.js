import React, { useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, StatusBar } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import { MediaType } from 'expo-media-library';
const heightStatusBar = StatusBar.currentHeight;

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

function PickerImage(props) {
  const { dispatch, navigation } = props
  const onSuccess = (data) => {
    dispatch({ type: 'GET_IMG', image: data })
    Alert.alert(`Bạn đã chọn ${data.length} ảnh.`)
    navigation.pop();
  };
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was error while loading images.',
        hasErrorWithResizing: 'There was error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo],//neu muon co ca video MediaType.video
      minSelection: 1,
      maxSelection: 5,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: 'jpeg',
    }),
    []
  );

  const _textStyle = {
    color: 'white',
  };

  const _buttonStyle = {
    backgroundColor: 'red',
    borderRadius: 5,
  };
  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'finish',
        back: 'back',
        selected: 'selected',
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => { navigation.pop() },
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#0eb14970',
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider style={styles.container_0}>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
          // Resize={widgetResize} know how to use first , perform slower results.
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container_0: {
    marginTop: heightStatusBar
  }
});
export default connect(function (state) {
  return { infoPost: state.infoPost }
})(PickerImage);

// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios'

// export default function PickerImage() {
//   let openImagePickerAsync = async () => {
//     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync();

//     const data = new FormData();
//     data.append('productImage', pickerResult);
//     const postDocument = () => {
//       const url = "http://192.168.1.7:5000/post/upload";
//       const formData = new FormData();
//       formData.append('productImage', pickerResult);
//       const options = {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       };
//       console.log(formData);

//       fetch(url, options).catch((error) => console.log(error));
//     }
//     postDocument()
//     //         try {
//     //   await axios({
//     //     method: 'POST',
//     //     url: 'http://192.168.1.7:5000/post/upload',
//     //     data,
//     //     headers: {
//     //       "idpost": "60e9cdad59830c00223acd9d",
//     //       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     //       "Content-Type": 'multipart/form-data',
//     //       "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SUQiOiI2MGU5Y2M5ZjJkMzlkYzJkMTBkOGM2OWQiLCJpYXQiOjE2Mjc5MjMzNzB9.8VukL4etrnPJezZYXTCkAum3zDuf2t_4ERP6RKNhJFk`,
//     //     }
//     //   }).then(data => {
//     //     data.idpost
//     //   })
//     //     .catch(e => console.log(e))
//     // } catch (e) {
//     //   alert(e)
//     // }
//     console.log(data);

//   };

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
//       <Text style={styles.instructions}>
//         To share a photo from your phone with a friend, just press the button below!
//       </Text>

//       <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
//         <Text style={styles.buttonText}>Pick a photo</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 305,
//     height: 159,
//     marginBottom: 20,
//   },
//   instructions: {
//     color: '#888',
//     fontSize: 18,
//     marginHorizontal: 15,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//   },
// });
// import * as React from "react";
// import {
//   ActivityIndicator,
//   Button,
//   Image,
//   Share,
//   StatusBar,
//   Text,
//   View,
// } from "react-native";
// import * as Clipboard from "expo-clipboard";
// import * as ImagePicker from "expo-image-picker";

// export default class App extends React.Component {
//   state = {
//     image: null,
//     uploading: false,
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text
//           style={{
//             fontSize: 20,
//             marginBottom: 20,
//             textAlign: "center",
//             marginHorizontal: 15,
//           }}
//         >
//           Example: Upload ImagePicker result
//         </Text>

//         {this._maybeRenderControls()}
//         {this._maybeRenderUploadingIndicator()}
//         {this._maybeRenderImage()}

//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _maybeRenderUploadingIndicator = () => {
//     if (this.state.uploading) {
//       return <ActivityIndicator animating size="large" />;
//     }
//   };

//   _maybeRenderControls = () => {
//     if (!this.state.uploading) {
//       return (
//         <View>
//           <View style={{ marginVertical: 8 }}>
//             <Button
//               onPress={this._pickImage}
//               title="Pick an image from camera roll"
//             />
//           </View>
//           <View style={{ marginVertical: 8 }}>
//             <Button onPress={this._takePhoto} title="Take a photo" />
//           </View>
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     if (this.state.image) {
//       return (
//         <View
//           style={{
//             marginTop: 30,
//             width: 250,
//             borderRadius: 3,
//             elevation: 2,
//             shadowColor: "rgba(0,0,0,1)",
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 4, height: 4 },
//             shadowRadius: 5,
//           }}
//         >
//           <View
//             style={{
//               borderTopRightRadius: 3,
//               borderTopLeftRadius: 3,
//               overflow: "hidden",
//             }}
//           >
//             <Image
//               source={{ uri: this.state.image }}
//               style={{ width: 250, height: 250 }}
//             />
//           </View>

//           <Text
//             onPress={this._copyToClipboard}
//             onLongPress={this._share}
//             style={{ paddingVertical: 10, paddingHorizontal: 10 }}
//           >
//             {this.state.image}
//           </Text>
//         </View>
//       );
//     }
//   };

//   _share = () => {
//     Share.share({
//       message: this.state.image,
//       title: "Check out this photo",
//       url: this.state.image,
//     });
//   };

//   _copyToClipboard = () => {
//     Clipboard.setString(this.state.image);
//     alert("Copied image URL to clipboard");
//   };

//   _askPermission = async (failureMessage) => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status === "denied") {
//       alert(failureMessage);
//     }
//   };
//   _askCameraPermission = async (failureMessage) => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status === "denied") {
//       alert(failureMessage);
//     }
//   };

//   _takePhoto = async () => {
//     await this._askCameraPermission(
//       "We need the camera permission to take a picture..."
//     );
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     await this._askPermission(
//       "We need the camera-roll permission to read pictures from your phone..."
//     );

//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async (pickerResult) => {
//     console.log(pickerResult)
//     let uploadResponse, uploadResult;

//     try {
//       this.setState({ uploading: true });

//       if (!pickerResult.cancelled) {
//         uploadResponse = await uploadImageAsync(pickerResult.uri);
//         uploadResult = await uploadResponse.json();
//         console.log({ uploadResult });
//         this.setState({ image: uploadResult.location });
//       }
//     } catch (e) {
//       console.log({ uploadResponse });
//       console.log({ uploadResult });
//       console.log({ e });
//       alert("Upload failed, sorry :(");
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };
// }

// async function uploadImageAsync(uri) {
//   let apiUrl =
//     "http://192.168.1.109:5000/post/upload";

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }
//   let uriArray = uri.split(".");
//   let fileType = uriArray[uriArray.length - 1];

//   let formData = new FormData();
//   formData.append("productImage", {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: "POST",
//     body: formData,
//     mode: 'cors',
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   return fetch(apiUrl, options);
// }

