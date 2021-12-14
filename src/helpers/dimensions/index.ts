import { Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

// BASELINE: {"height": 866.8571428571429, "width": 411.42857142857144}
const baseWidth = 411.42857142857144;
const baseHeight = 866.8571428571429;

const multiplier = 1;

const widthPercent = (percent: number) => (width * multiplier * percent) / 100;
const heightPercent = (percent: number) =>
  (height * multiplier * percent) / 100;

const winWidthPercent = (percent: number) =>
  (winWidth * multiplier * percent) / 100;
const winHeightPercent = (percent: number) =>
  (winHeight * multiplier * percent) / 100;

const widthAdapt = (value: number) => widthPercent((value / baseWidth) * 100);
const heightAdapt = (value: number) =>
  heightPercent((value / baseHeight) * 100);

export {
  widthPercent,
  heightPercent,
  widthAdapt,
  heightAdapt,
  winWidthPercent,
  winHeightPercent,
};
