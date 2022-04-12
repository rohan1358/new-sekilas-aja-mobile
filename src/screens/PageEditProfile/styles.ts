import { neutralColor, neutralColorText, primaryColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    padding: 32,
    borderTopWidth: 1,
    borderTopColor: neutralColor[60]
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 8
  },

  boxItem: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderColor: neutralColor[50],
    marginBottom: 5,
    alignItems: "center"
  },

  textInput: {
    flex: 1,
    fontSize: 16
  },

  textAlert: {
    fontSize: 14,
    color: "#CB3168",
    marginBottom: 32
  },

  boxBtnAction: {
    marginTop: 32
  },

  btnAction: {
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 16,
    height: 64,
    justifyContent: "center",
    backgroundColor: neutralColor[90]
  },

  textBtn: {
    fontSize: 24,
    fontWeight: "700",
    color: primaryColor.main
  },

  btnBatal: {
    backgroundColor: "transparent",
    borderWidth: 0
  },

  textBatal: {
    fontSize: 24,
    fontWeight: "700"
  }
});

export default styles;
