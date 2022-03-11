import { neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../../helpers";

const stylesFooter = StyleSheet.create({
  backgroundVideoFooter: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
    // height: "100%"
    // width: widthPercent(30)
  },

  backgroundVideoIosFooter: {
    // position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: widthPercent(100),
    width: widthPercent(30)
  },
  playFooter: {
    backgroundColor: neutralColor[90],
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  }
});

export default stylesFooter;
