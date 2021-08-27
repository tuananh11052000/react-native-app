import {COLOR_1,FONT_SIZE} from '@env'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, Platform, PixelRatio } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const scale= SCREEN_WIDTH / 375

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS == 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const color_1 = "#4E6E58"
const color_header_background = "#E53935"
const headerTintColor = "#fff"
const fontsize_1 = normalize(30)
const fontsize_2 = normalize(20)
const fontsize_3 = normalize(15)
const fontsize_4 = normalize(10)
const fontsize_5 = normalize(18)
const heightStatusBar = getStatusBarHeight()//Chiều cao status bar
const header = 55
const color_btn_1 = "#ff443a"




export default {
    heightStatusBar,
    fontsize_1,
    fontsize_2,
    fontsize_3,
    fontsize_4,
    fontsize_5,
    header,
    color_1,
    COLOR_1,
    FONT_SIZE,
    color_header_background,
    headerTintColor,
    color_btn_1
}