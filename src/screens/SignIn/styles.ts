import { StyleSheet } from "react-native";
import { spacing as sp } from "../../constants";

const styles = StyleSheet.create({
  bottomCta: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },

  centerEnd: { flexDirection: "row", alignItems: "flex-end" },
  centering: { alignItems: "center", justifyContent: "center" },
  contentContainerStyle: {
    paddingHorizontal: sp.sl,
    paddingBottom: sp.l,
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },

  underlineText: { textAlign: "center", textDecorationLine: "underline" }
});

export default styles;
