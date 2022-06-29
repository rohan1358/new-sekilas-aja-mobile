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

var neutralColorButton = {
  10: darkMode() ? "#fef1c2" : "#FBFCFC",
  20: darkMode() ? "#feecad" : "#ECF1F7",
  30: darkMode() ? "#fee799" : "#E3E8EF",
  40: darkMode() ? "#fde284" : "#D9DDDC",
  50: darkMode() ? "#fddd70" : "#BBC0CE",
  60: darkMode() ? "#fdd95b" : "#9BA2B5",
  70: darkMode() ? "#fcd447" : "#767C91",
  80: darkMode() ? "#fccf32" : "#5F647E",
  90: darkMode() ? "#e3ba2d" : "#464D6F",
  100: darkMode() ? "#caa628" : "#1E264E",

  darkFocus: "#1E264E20"
};

var colorTextButton = {
  10: darkMode() ? "#FBFCFC" : "#fef1c2",
  20: darkMode() ? "#ECF1F7" : "#feecad",
  30: darkMode() ? "#E3E8EF" : "#fee799",
  40: darkMode() ? "#D9DDDC" : "#fde284",
  50: darkMode() ? "#BBC0CE" : "#fddd70",
  60: darkMode() ? "#9BA2B5" : "#fdd95b",
  70: darkMode() ? "#767C91" : "#fcd447",
  80: darkMode() ? "#5F647E" : "#fccf32",
  90: darkMode() ? "#464D6F" : "#e3ba2d",
  100: darkMode() ? "#1E264E" : "#caa628",

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

let neutralColorNormalKebalikan = {
  10: darkMode() ? "#1E264E" : "#FBFCFC",
  20: darkMode() ? "#464D6F" : "#ECF1F7",
  30: darkMode() ? "#5F647E" : "#E3E8EF",
  40: darkMode() ? "#767C91" : "#D9DDDC",
  50: darkMode() ? "9BA2B5" : "#BBC0CE",
  60: darkMode() ? "#BBC0CE" : "#9BA2B5",
  70: darkMode() ? "#D9DDDC" : "#767C91",
  80: darkMode() ? "#E3E8EF" : "#5F647E",
  90: darkMode() ? "#ECF1F7" : "#464D6F",
  100: darkMode() ? "#FBFCFC" : "#1E264E",

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

var neutralColorText2 = {
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
    neutralColorNormalKebalikan = {
      10: "#1E264E",
      20: "#464D6F",
      30: "#5F647E",
      40: "#767C91",
      50: "#9BA2B5",
      60: "#BBC0CE",
      70: "#D9DDDC",
      80: "#E3E8EF",
      90: "#ECF1F7",
      100: "#FBFCFC",

      darkFocus: "#1E264E20"
    };

    neutralColorText2 = {
      10: "#d2d4dc",
      20: "#dadbe2",
      30: "#dfe0e5",
      40: "#e4e5e9",
      50: "#ebecf0",
      60: "#f1f2f5",
      70: "#f7f8f8",
      80: "#f9fafc",
      90: "#fbfcfd",
      100: "#fefefe",

      darkFocus: "#1E264E20"
    };

    neutralColorText = {
      10: "#d2d4dc",
      20: "#dadbe2",
      30: "#dfe0e5",
      40: "#e4e5e9",
      50: "#ebecf0",
      60: "#f1f2f5",
      70: "#f7f8f8",
      80: "#f9fafc",
      90: "#fbfcfd",
      100: "#fefefe",

      darkFocus: "#1E264E20"
    };
    colors = {
      white: "#808080",
      white1: "#dde0e7",
      lightYellow: "#FDD95E",
      yellow1: "#7e681a",
      yellow2: "#7e6a24"
    };
    neutralColor = {
      10: "#1F264F",
      20: "#464B73",
      30: "#E3E8EF",
      40: "#D9DDDC",
      50: "#BBC0CE",
      60: "#9BA2B5",
      70: "#767C91",
      80: "#5F647E",
      90: "#5F657F",
      100: "#1E264E",

      darkFocus: "#1E264E20"
    };

    neutralColorButton = {
      10: "#fef1c2",
      20: "#feecad",
      30: "#fee799",
      40: "#fde284",
      50: "#fddd70",
      60: "#fdd95b",
      70: "#fcd447",
      80: "#fccf32",
      90: "#e3ba2d",
      100: "#caa628",

      darkFocus: "#1E264E20"
    };

    colorTextButton = {
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
  } else {
    colorTextButton = {
      10: "#fef1c2",
      20: "#feecad",
      30: "#fee799",
      40: "#fde284",
      50: "#fddd70",
      60: "#fdd95b",
      70: "#fcd447",
      80: "#fccf32",
      90: "#e3ba2d",
      100: "#caa628",

      darkFocus: "#1E264E20"
    };
    neutralColorNormalKebalikan = {
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
    neutralColorText2 = {
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

    neutralColorButton = {
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
  handleChangeMode,
  neutralColorButton,
  colorTextButton,
  neutralColorText2,
  neutralColorNormalKebalikan
};
