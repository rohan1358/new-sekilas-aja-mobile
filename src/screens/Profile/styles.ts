import {
  colors,
  neutralColor,
  neutralColorText,
  primaryColor
} from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  skeleton: { flex: 1 },

  content: {
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },

  boxItem: {
    borderWidth: 2,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 12,
    borderColor: neutralColor[50],
    marginBottom: 16,
    alignItems: "center"
  },

  textInput: {
    flex: 1,
    fontSize: 16
  },

  btnKeluar: {
    marginTop: 24,
    alignItems: "center",
    paddingVertical: 10
  },

  contaonerSheet: {
    marginTop: 24
  },

  titleGantiFoto: {
    marginLeft: 32,
    marginBottom: 20
  },

  btnTakeAction: {
    borderTopWidth: 1,
    borderColor: neutralColor[60],
    paddingHorizontal: 32,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  textTake: {
    fontSize: 20,
    fontWeight: "500"
  },

  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  contentModal: {
    width: "85%",
    maxHeight: "50%",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8
  },

  btnExit: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 5
  },

  textLanguage: {
    marginTop: 10,
    fontSize: 16
    // color: neutralColor[90]
  },

  boxListLanguage: {
    borderBottomWidth: 1,
    borderBottomColor: neutralColor[60],
    paddingBottom: 10,
    alignItems: "center"
  },

  language: {
    fontSize: 16,
    fontWeight: "bold"
    // color: neutralColor[90]
  },

  dropdown: {
    borderWidth: 0
  },
  containerDropdown: {
    width: 100
  },
  textDropdown: {
    fontSize: 14,
    // color: neutralColor[80],
    fontWeight: "bold"
  },
  containerList: {
    borderWidth: 0.5
    // borderColor: neutralColor[30]
  },

  boxHapusDownload: {
    alignItems: "center"
  },

  textBtnHapus: {
    color: "#CB3168"
  },

  btnUp: {
    borderBottomWidth: 0
  },

  boxTentang: {
    marginBottom: 16
  },

  contentAlert: {
    width: "85%",
    maxHeight: "50%",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8
  },

  boxContentAlert: {
    alignItems: "center"
  },

  textAlert: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 16,
    width: 250
  },

  textActionAlert: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center"
  },

  textButtonAlert: {
    fontSize: 24,
    color: primaryColor.main,
    fontWeight: "700",
    textAlign: "center"
  },

  btnAlert: {
    height: 64,
    justifyContent: "center"
  },

  btnAlertSecond: {
    backgroundColor: neutralColor[90],
    borderRadius: 16
  }
});

export default styles;
