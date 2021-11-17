import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const ICON_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingLeft: 20,
    paddingRight: sp.sl,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: neutralColor[50],
  },

  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
