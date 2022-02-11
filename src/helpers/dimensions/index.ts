import { Dimensions, PixelRatio } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

// Figma design default screen size (MEDIUM)
const baseWidth = 411;
const baseHeight = 823;

const multiplier = 1;

const widthPercent = (percent: number) =>
  PixelRatio.roundToNearestPixel((width * multiplier * percent) / 100);
const heightPercent = (percent: number) =>
  PixelRatio.roundToNearestPixel((height * multiplier * percent) / 100);

const winWidthPercent = (percent: number) =>
  PixelRatio.roundToNearestPixel((winWidth * multiplier * percent) / 100);
const winHeightPercent = (percent: number) =>
  PixelRatio.roundToNearestPixel((winHeight * multiplier * percent) / 100);

const widthDp = (value: number) => winWidthPercent((value * 100) / baseWidth);
const heightDp = (value: number) =>
  winHeightPercent((value * 100) / baseHeight);

export {
  widthPercent,
  heightPercent,
  widthDp,
  heightDp,
  winWidthPercent,
  winHeightPercent,
};
