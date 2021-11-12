import { primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const HEADER_RADIUS = 24;
const ICON_SIZE = 48;

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: sp.sl, paddingTop: sp.sl },

  headerContainer: {
    paddingHorizontal: sp.sl,
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: HEADER_RADIUS,
    borderBottomRightRadius: HEADER_RADIUS,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
