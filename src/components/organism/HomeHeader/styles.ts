import { StyleSheet } from "react-native";
import { primaryColor, spacing as sp } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: sp.m,
    paddingHorizontal: sp.sl,
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  detailContainer: { flex: 1 },

  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  profileContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 48,
    overflow: "hidden",
  },
});

export default styles;
