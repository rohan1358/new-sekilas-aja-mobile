import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  boxes: { flexDirection: "row", width: 48 },
  boxesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ECF1F7"
  },

  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF1F7"
  },
  input: {
    height: 48,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ECF1F7"
  },
  inputStyle: { paddingLeft: 0 },
  inputContainerStyle: { flex: 1 },
  inputInnerContainerStyle: {
    borderWidth: 0,
    backgroundColor: neutralColor[10],
    borderRadius: 0
  },

  primaryIcon: {
    backgroundColor: neutralColor[90]
  }
});

export default styles;
