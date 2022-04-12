import { Appearance } from "react-native";
import { store } from "../../redux/store";
// import { darkMode } from "../../utils";
// import {Selector}from 'react-redux'

const { mode } = store.getState().mainContext;

const darkMode = () => {
  return mode === "dark";
  // return setInterval(() => {
  //   return getColorScheme() === "dark";
  // }, 1000);
};

var neutralColor = {
  10: darkMode() ? "#1F264F" : "#FBFCFC",
  20: darkMode() ? "#464B73" : "#ECF1F7",
  30: "#E3E8EF",
  40: "#D9DDDC",
  50: "#BBC0CE",
  60: "#9BA2B5",
  70: "#767C91",
  80: "#5F647E",
  90: darkMode() ? "#5F657F" : "#464D6F",
  100: "#1E264E",

  darkFocus: "#1E264E20"
};

const neutralColorNormal = {
  10: "#FBFCFC",
  20: "#ECF1F7",
  30: "#E3E8EF",
  40: "#D9DDDC",
  50: "#BBC0CE",
  60: "#9BA2B5",
  70: "#767C91",
  80: "#5F647E",
  90: "#464D6F",
  100: "#1E264E",

  darkFocus: "#1E264E20"
};

var neutralColorText = {
  10: darkMode() ? "#d2d4dc" : "#FBFCFC",
  20: darkMode() ? "#dadbe2" : "#ECF1F7",
  30: darkMode() ? "#dfe0e5" : "#E3E8EF",
  40: darkMode() ? "#e4e5e9" : "#D9DDDC",
  50: darkMode() ? "#ebecf0" : "#BBC0CE",
  60: darkMode() ? "#f1f2f5" : "#9BA2B5",
  70: darkMode() ? "#f7f8f8" : "#767C91",
  80: darkMode() ? "#f9fafc" : "#5F647E",
  90: darkMode() ? "#fbfcfd" : "#464D6F",
  100: darkMode() ? "#fefefe" : "#1E264E",

  darkFocus: "#1E264E20"
};

const primaryColor = {
  main: "#FCCF32",
  surface: "#FEFBEA",
  border: "#FEEFBB",
  hover: "#E5AC19",
  pressed: "#A3700F",
  focus: "#FBF3D4"
};

const primaryColorText = {
  main: "#FCCF32",
  surface: "#FEFBEA",
  border: "#FEEFBB",
  hover: "#E5AC19",
  pressed: "#A3700F",
  focus: "#FBF3D4"
};

const systemColor = {
  main: "#305EFF",
  surface: "#EBEEFF",
  border: "#CFD9FF",
  hover: "#1745E8",
  pressed: "#0F2B8C",
  focus: "#D2DCFD"
};

const successColor = {
  main: "#2BA67A",
  surface: "#F0F5F3",
  border: "#CFE1DB",
  hover: "#25946C",
  pressed: "#12694A",
  focus: "#D1EBE2"
};

const warningColor = {
  main: "#E27814",
  surface: "#FFF6EB",
  border: "#F5EBE1",
  hover: "#D16500",
  pressed: "#7D3D01",
  focus: "#F6E2CE"
};

const dangerColor = {
  main: "#CB3168",
  surface: "#FCF0F3",
  border: "#EEBACD",
  hover: "#B22457",
  pressed: "#731235",
  focus: "#F1D3DE"
};

var colors = {
  white: darkMode() ? "#808080" : "#FFFFFF",
  white1: darkMode() ? "#dde0e7" : "#BBC0CE",
  lightYellow: "#FDD95E",
  yellow1: darkMode() ? "#7e681a" : "#FCD033",
  yellow2: darkMode() ? "#7e6a24" : "#FBD448"
};

const handleChangeMode = (mode: any) => {
  if (mode === "dark") {
    neutralColorText = {
      10: darkMode() ? "#d2d4dc" : "#FBFCFC",
      20: darkMode() ? "#dadbe2" : "#ECF1F7",
      30: darkMode() ? "#dfe0e5" : "#E3E8EF",
      40: darkMode() ? "#e4e5e9" : "#D9DDDC",
      50: darkMode() ? "#ebecf0" : "#BBC0CE",
      60: darkMode() ? "#f1f2f5" : "#9BA2B5",
      70: darkMode() ? "#f7f8f8" : "#767C91",
      80: darkMode() ? "#f9fafc" : "#5F647E",
      90: darkMode() ? "#fbfcfd" : "#464D6F",
      100: darkMode() ? "#fefefe" : "#1E264E",

      darkFocus: "#1E264E20"
    };
    colors = {
      white: darkMode() ? "#808080" : "#FFFFFF",
      white1: darkMode() ? "#dde0e7" : "#BBC0CE",
      lightYellow: "#FDD95E",
      yellow1: darkMode() ? "#7e681a" : "#FCD033",
      yellow2: darkMode() ? "#7e6a24" : "#FBD448"
    };
    neutralColor = {
      10: darkMode() ? "#1F264F" : "#FBFCFC",
      20: darkMode() ? "#464B73" : "#ECF1F7",
      30: "#E3E8EF",
      40: "#D9DDDC",
      50: "#BBC0CE",
      60: "#9BA2B5",
      70: "#767C91",
      80: "#5F647E",
      90: darkMode() ? "#5F657F" : "#464D6F",
      100: "#1E264E",

      darkFocus: "#1E264E20"
    };
  } else {
    neutralColor = {
      10: "#FBFCFC",
      20: "#ECF1F7",
      30: "#E3E8EF",
      40: "#D9DDDC",
      50: "#BBC0CE",
      60: "#9BA2B5",
      70: "#767C91",
      80: "#5F647E",
      90: "#464D6F",
      100: "#1E264E",

      darkFocus: "#1E264E20"
    };

    colors = {
      white: "#FFFFFF",
      white1: "#BBC0CE",
      lightYellow: "#FDD95E",
      yellow1: "#FCD033",
      yellow2: "#FBD448"
    };
    neutralColorText = {
      10: "#FBFCFC",
      20: "#ECF1F7",
      30: "#E3E8EF",
      40: "#D9DDDC",
      50: "#BBC0CE",
      60: "#9BA2B5",
      70: "#767C91",
      80: "#5F647E",
      90: "#464D6F",
      100: "#1E264E",

      darkFocus: "#1E264E20"
    };
  }
};

export {
  dangerColor,
  neutralColor,
  primaryColor,
  successColor,
  colors,
  systemColor,
  warningColor,
  neutralColorText,
  primaryColorText,
  neutralColorNormal,
  handleChangeMode
};
