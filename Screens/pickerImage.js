// import React, { useMemo } from 'react';
// import { View, StyleSheet, SafeAreaView, Alert, StatusBar } from 'react-native';
// import { AssetsSelector } from 'expo-images-picker';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { connect } from 'react-redux'
// import { MediaType } from 'expo-media-library';
// const heightStatusBar = StatusBar.currentHeight;

// const ForceInset = {
//   top: 'never',
//   bottom: 'never',
// };

// function PickerImage(props) {
//   const { dispatch, navigation } = props
//   const onSuccess = (data) => {
//     dispatch({ type: 'GET_IMG', image: data })
//     Alert.alert(`Bạn đã chọn ${data.length} ảnh.`)
//     navigation.pop();
//   };
//   const widgetErrors = useMemo(
//     () => ({
//       errorTextColor: 'black',
//       errorMessages: {
//         hasErrorWithPermissions: 'Please Allow media gallery permissions.',
//         hasErrorWithLoading: 'There was error while loading images.',
//         hasErrorWithResizing: 'There was error while loading images.',
//         hasNoAssets: 'No images found.',
//       },
//     }),
//     []
//   );

//   const widgetSettings = useMemo(
//     () => ({
//       getImageMetaData: false, // true might perform slower results
//       initialLoad: 100,
//       assetsType: [MediaType.photo],//neu muon co ca video MediaType.video
//       minSelection: 1,
//       maxSelection: 5,
//       portraitCols: 4,
//       landscapeCols: 4,
//     }),
//     []
//   );

//   const _textStyle = {
//     color: 'white',
//   };

//   const _buttonStyle = {
//     backgroundColor: 'red',
//     borderRadius: 5,
//   };
//   const widgetNavigator = useMemo(
//     () => ({
//       Texts: {
//         finish: 'finish',
//         back: 'back',
//         selected: 'selected',
//       },
//       midTextColor: 'black',
//       minSelection: 1,
//       buttonTextStyle: _textStyle,
//       buttonStyle: _buttonStyle,
//       onBack: () => { navigation.pop() },
//       onSuccess: (e) => onSuccess(e),
//     }),
//     []
//   );

//   const widgetStyles = useMemo(
//     () => ({
//       margin: 2,
//       bgColor: 'white',
//       spinnerColor: 'blue',
//       widgetWidth: 99,
//       videoIcon: {
//         Component: Ionicons,
//         iconName: 'ios-videocam',
//         color: 'tomato',
//         size: 20,
//       },
//       selectedIcon: {
//         Component: Ionicons,
//         iconName: 'ios-checkmark-circle-outline',
//         color: 'white',
//         bg: '#0eb14970',
//         size: 26,
//       },
//     }),
//     []
//   );

//   return (
//     <SafeAreaProvider style={styles.container_0}>
//       <SafeAreaView forceInset={ForceInset} style={styles.container}>
//         <View style={styles.container}>
//           <AssetsSelector
//             Settings={widgetSettings}
//             Errors={widgetErrors}
//             Styles={widgetStyles}
//             Navigator={widgetNavigator}
//           // Resize={widgetResize} know how to use first , perform slower results.
//           />
//         </View>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   container_0: {
//     marginTop: heightStatusBar
//   }
// });
// export default connect(function (state) {
//   return { infoPost: state.infoPost }
// })(PickerImage);
import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

function PickerImage(props) {
  const _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#0580FF'} style={styles.loading} />
  );

  const imagesCallback = (callback) => {
    const { navigation, dispatch } = props;
    props.navigation.setOptions({
      headerRight: () => _getHeaderLoader()
    });

    callback.then(async (photos) => {
      const data = [];
      for (let photo of photos) {
        const pPhoto = await _processImageAsync(photo.uri);
        data.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
      dispatch({ type: 'GET_IMG', image: data })
      navigation.pop();
    })
      .catch((e) => console.log(e));
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  const _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity onPress={onSubmit} style={styles.wrap_btn_xong}>
      <Text onPress={onSubmit} style={{ color: 'white', fontSize: 18 }}>Xong</Text>
    </TouchableOpacity>
  }

  const updateHandler = (count, onSubmit) => {
    props.navigation.setOptions({
      title: `Đã chọn ${count} ảnh`,
      headerRight: () => _renderDoneButton(count, onSubmit)
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={5}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    width: 30,
    height: 30,
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  },
  wrap_btn_xong: {
    paddingRight: 10
  },
  loading: {
    marginRight: 10
  }
});


export default connect(function (state) {
  return { infoPost: state.infoPost }
})(PickerImage);