import {
  colors,
  neutralColor,
  primaryColor,
  successColor,
  spacing as sp,
  neutralColorText
} from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  skeleton: { flex: 1 },

  sectionContent: {
    paddingTop: 24
  },

  title: {
    marginLeft: 32
  },
  subTitle: {
    marginLeft: 32
  },

  listContent: {
    marginTop: 24
  },

  list: {
    marginHorizontal: 32,
    marginVertical: 8
  },

  titleList: {
    fontWeight: "500"
  },

  textLevel: {
    fontSize: 14,
    color: "#2BA67A",
    marginTop: 4
  },
  textLevelNonSubs: {
    fontSize: 14,
    marginTop: 4
  },

  textContent: {
    fontSize: 14,
    marginTop: 4
  },

  boxText: {
    maxWidth: "65%"
  },

  btnAction: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderColor: "#BBC0CE"
  },

  textBtnBatal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CB3168"
  },

  listPreferens: {
    flexDirection: "row",
    // alignItems: "flex-end",
    justifyContent: "space-between",
    alignItems: "center"
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
    borderWidth: 0.5,
    borderColor: neutralColor[30]
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
    // maxHeight: "50%",
    padding: 20,
    borderRadius: 8,
    // height: 100
    maxHeight: "80%"
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
  },

  boxSosmed: {
    flexDirection: "row",
    width: 120,
    justifyContent: "space-around",
    marginVertical: 16
  },

  btnKeluar: {
    paddingVertical: 8,
    alignItems: "center"
  },
  btnPilih: {
    marginTop: 8
  },
  txtBtnPilih: {
    color: successColor.main
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default styles;
