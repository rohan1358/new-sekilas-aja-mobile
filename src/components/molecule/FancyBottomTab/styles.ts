import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers/helper";

const TAB_HEIGHT = 64;
const TAB_BOTTOM_GAP = sp.m;
const TAB_HORIZONTAL_GAP = sp.sl;
const RADIUS = 16;
const ICON_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "red",
  },

  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: TAB_HEIGHT,
    width: widthPercent(100) - TAB_HORIZONTAL_GAP * 2,
    borderRadius: RADIUS,
    position: "absolute",
    bottom: TAB_BOTTOM_GAP,
  },

  overlay: {
    width: widthPercent(100),
    position: "absolute",
    height: TAB_HEIGHT,
    backgroundColor: `${neutralColor[10]}99`,
    left: -TAB_HORIZONTAL_GAP,
    top: TAB_BOTTOM_GAP,
  },

  tab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: neutralColor[90],
  },
  tabsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: neutralColor[90],
    borderRadius: RADIUS,
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default styles;
