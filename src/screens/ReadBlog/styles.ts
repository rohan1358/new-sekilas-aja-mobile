import { Dimensions, StyleSheet } from "react-native";
import { neutralColor, primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers";
const HEADER_RADIUS = 24;
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: sp.sl,
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: HEADER_RADIUS,
    borderBottomRightRadius: HEADER_RADIUS
    // flexDirection: "row"
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "space-between"
  }
});

export default styles;
