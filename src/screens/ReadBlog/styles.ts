import { StyleSheet } from "react-native";
import { primaryColor, spacing as sp } from "../../constants";
const HEADER_RADIUS = 24;
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
