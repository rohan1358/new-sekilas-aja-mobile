import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingHorizontal: sp.sl,
    borderColor: neutralColor[50],
    paddingVertical: sp.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: { flex: 1 },
});

export default styles;
