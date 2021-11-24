import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actions: {
    backgroundColor: neutralColor[90],
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  actionWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: sp.xs,
    paddingHorizontal: sp.sm,
  },

  contentContainerStyle: { paddingHorizontal: sp.sl },
  control: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  linearGradient: {
    width: "100%",
    height: "100%",
    paddingVertical: sp.sl,
    position: "absolute",
  },
});

export default styles;
