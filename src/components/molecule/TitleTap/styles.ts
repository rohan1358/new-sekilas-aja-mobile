import { spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  clickTitle: {
    paddingHorizontal: sp.sl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { flex: 1.25 },

  underline: { textDecorationLine: "underline" },
});

export default styles;
