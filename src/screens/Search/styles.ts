import { neutralColor, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const CONTAINER_RADIUS = 24;

const styles = StyleSheet.create({
  boxes: { flexDirection: "row", width: 48 },
  boxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
  },

  columnWrapperStyle: { justifyContent: "space-between" },
  container: {
    backgroundColor: primaryColor.main,
    paddingHorizontal: sp.sl,
    borderBottomLeftRadius: CONTAINER_RADIUS,
    borderBottomRightRadius: CONTAINER_RADIUS,
    zIndex: 2,
  },

  iconContainer: {
    backgroundColor: neutralColor[10],
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: { paddingLeft: 0 },
  inputContainerStyle: { flex: 1 },
  inputInnerContainerStyle: {
    borderWidth: 0,
    backgroundColor: neutralColor[10],
    borderRadius: 0,
  },

  primaryIcon: {
    backgroundColor: neutralColor[90],
  },

  row: { flexDirection: "row" },

  skeleton: { flex: 1 },
});

export default styles;
