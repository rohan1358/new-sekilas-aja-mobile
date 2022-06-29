import { neutralColor, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const CONTAINER_RADIUS = 24;

const styles = StyleSheet.create({
  boxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    flex: 1
  },

  container: {
    flexDirection: "row",
    paddingRight: sp.sl,
    paddingLeft: sp.sm,
    paddingVertical: 10,
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: CONTAINER_RADIUS,
    borderBottomRightRadius: CONTAINER_RADIUS
  },

  iconContainer: {
    backgroundColor: neutralColor[10],
    width: 48,
    height: 45.5,
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: { paddingLeft: 0 },
  inputContainerStyle: { flex: 1 },
  inputInnerContainerStyle: {
    borderWidth: 0,
    backgroundColor: neutralColor[10],
    borderRadius: 0
  },

  primaryIcon: { backgroundColor: primaryColor.main }
});

export default styles;
