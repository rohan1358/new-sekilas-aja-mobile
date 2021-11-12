import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  boxes: { flexDirection: "row", width: 48 },
  boxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
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
});

export default styles;
