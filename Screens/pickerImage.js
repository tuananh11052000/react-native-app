// import React, { useMemo } from 'react';
// import { View, StyleSheet, SafeAreaView, Alert, StatusBar } from 'react-native';
// import { AssetsSelector } from 'expo-images-picker';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { connect } from 'react-redux'
// import { MediaType } from 'expo-media-library';
// const heightStatusBar = StatusBar.currentHeight;

// const ForceInset = {
//     top: 'never',
//     bottom: 'never',
// };

// function PickerImage(props) {
//     const { dispatch, navigation } = props
//     const onSuccess = (data) => {
//         console.log(data)
//         dispatch({ type: 'GET_IMG', image: data })
//         Alert.alert('Done', data.length + 'Images selected')
//         navigation.pop();
//     };
//     const widgetErrors = useMemo(
//         () => ({
//             errorTextColor: 'black',
//             errorMessages: {
//                 hasErrorWithPermissions: 'Please Allow media gallery permissions.',
//                 hasErrorWithLoading: 'There was error while loading images.',
//                 hasErrorWithResizing: 'There was error while loading images.',
//                 hasNoAssets: 'No images found.',
//             },
//         }),
//         []
//     );

//     const widgetSettings = useMemo(
//         () => ({
//             getImageMetaData: false, // true might perform slower results
//             initialLoad: 100,
//             assetsType: [MediaType.photo],//neu muon co ca video MediaType.video
//             minSelection: 1,
//             maxSelection: 5,
//             portraitCols: 4,
//             landscapeCols: 4,
//         }),
//         []
//     );

//     const widgetResize = useMemo(
//         () => ({
//             width: 50,
//             compress: 0.7,
//             base64: false,
//             saveTo: 'jpeg',
//         }),
//         []
//     );

//     const _textStyle = {
//         color: 'white',
//     };

//     const _buttonStyle = {
//         backgroundColor: 'red',
//         borderRadius: 5,
//     };
//     const widgetNavigator = useMemo(
//         () => ({
//             Texts: {
//                 finish: 'finish',
//                 back: 'back',
//                 selected: 'selected',
//             },
//             midTextColor: 'black',
//             minSelection: 1,
//             buttonTextStyle: _textStyle,
//             buttonStyle: _buttonStyle,
//             onBack: () => { navigation.pop() },
//             onSuccess: (e) => onSuccess(e),
//         }),
//         []
//     );

//     const widgetStyles = useMemo(
//         () => ({
//             margin: 2,
//             bgColor: 'white',
//             spinnerColor: 'blue',
//             widgetWidth: 99,
//             videoIcon: {
//                 Component: Ionicons,
//                 iconName: 'ios-videocam',
//                 color: 'tomato',
//                 size: 20,
//             },
//             selectedIcon: {
//                 Component: Ionicons,
//                 iconName: 'ios-checkmark-circle-outline',
//                 color: 'white',
//                 bg: '#0eb14970',
//                 size: 26,
//             },
//         }),
//         []
//     );

//     return (
//         <SafeAreaProvider style={styles.container_0}>
//             <SafeAreaView forceInset={ForceInset} style={styles.container}>
//                 <View style={styles.container}>
//                     <AssetsSelector
//                         Settings={widgetSettings}
//                         Errors={widgetErrors}
//                         Styles={widgetStyles}
//                         Navigator={widgetNavigator}
//                     // Resize={widgetResize} know how to use first , perform slower results.
//                     />
//                 </View>
//             </SafeAreaView>
//         </SafeAreaProvider>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     container_0: {
//         marginTop: heightStatusBar
//     }
// });
// export default connect(function (state) {
//     return { infoPost: state.infoPost }
// })(PickerImage);

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PickerImage() {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>

            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});


