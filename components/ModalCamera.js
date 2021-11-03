import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import {
  Ionicons,
  EvilIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
var { width } = Dimensions.get("window");
function ModalCamera(props) {
  const { navigation, dispatch } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [preview, setPreview] = useState(false);
  const [capturePhote, setCapturePhoto] = useState(null);
  const camref = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    // console.log(props.infoPost.image)
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const back = () => {
    navigation.pop();
  };
  const flipCame = () => {
    setPreview(false);
    setCapturePhoto(null);
    camref.current.resumePreview();
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  async function takePicture() {
    if (camref) {
      const data = await camref.current.takePictureAsync();
      setPreview(true);
      await camref.current.pausePreview();
      setCapturePhoto(data);
    }
  }
  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };
  async function cancel() {
    if (capturePhote != null) {
      setPreview(false);
      await camref.current.resumePreview();
      setCapturePhoto(null);
    }
  }
  const handlDone = async () => {
    const data = props.infoPost.image;
    if (data.length >= 5) {
      let localUri = capturePhote.uri;
      const pPhoto = await _processImageAsync(localUri);
      let newImage = [];
      newImage.push({
        uri: pPhoto.uri,
        name: pPhoto.filename,
        type: "image/jpg",
      });
      dispatch({ type: "GET_IMG", image: newImage });
      setPreview(false);
      props.doneCamera();
    }
    if (data.length < 5) {
      let localUri = capturePhote.uri;
      const pPhoto = await _processImageAsync(localUri);
      data.push({
        uri: pPhoto.uri,
        name: pPhoto.filename,
        type: "image/jpg",
      });
      dispatch({ type: "GET_IMG", image: data });
      setPreview(false);
      props.doneCamera();
    }
  };
  return (
    <Modal style={styles.container} visible={props.show}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camref}
        autoFocus={true}
        ratio="16:9"
      >
        <View style={styles.buttonContainer}>
          <View style={styles.wrapFlip}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setPreview(false)
                props.close()}}
            >
              <AntDesign name="close" size={width * 0.1} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setPreview(false)
                flipCame();
              }}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={width * 0.1}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapBottom}>
            {preview ? (
              <TouchableOpacity onPress={() => cancel()}>
                <EvilIcons name="close-o" size={width * 0.15} color="#FFF" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity onPress={() => takePicture()}>
              <FontAwesome name="circle" size={width * 0.2} color="#FFF" />
            </TouchableOpacity>
            {preview ? (
              <TouchableOpacity onPress={() => handlDone()}>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={width * 0.15}
                  color="#FFF"
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Camera>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  wrapFlip: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "4%",
  },
  wrapBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default connect(function (state) {
  return { infoPost: state.infoPost };
})(ModalCamera);
