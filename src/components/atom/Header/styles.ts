import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet, ViewStyle } from "react-native";

const ICON_SIZE = 48;

const baseContainer: ViewStyle = {
  height: 64,
  borderBottomWidth: 1,
  borderBottomColor: neutralColor[50],
};

const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    paddingLeft: 20,
    paddingRight: sp.sl,
    flexDirection: "row",
    alignItems: "center",
  },
  customContainer: {
    ...baseContainer,
  },

  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
