import { colors, neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";
import { widthPercent } from "../../../helpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor.main,
    flex: 1
  },

  boxExit: {
    alignItems: "flex-end"
  },

  boxExitIos: {
    alignItems: "flex-end",
    paddingTop: 30
  },

  boxBack: {
    alignItems: "flex-start"
  },

  boxBackIos: {
    alignItems: "flex-start",
    paddingTop: 30
  },

  btn: {
    marginHorizontal: adjust(27),
    marginVertical: adjust(19),
    padding: adjust(5)
  },

  btnClose: {
    backgroundColor: "#CC2E71",
    borderRadius: adjust(50)
  },

  content: {
    flex: 1,
    width: widthPercent(100)
  },

  boxContent: {
    paddingHorizontal: 25
  },

  subTextTitle: {
    marginTop: 8
  },

  boxWhite: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: neutralColor[90],
    borderRadius: adjust(16),
    paddingVertical: adjust(29),
    // paddingHorizontal: adjust(10),
    marginVertical: 24
  },

  list: {
    flexDirection: "row",
    // alignItems: "center",
    marginBottom: 2,
    marginHorizontal: 10
  },

  textList: {
    marginLeft: adjust(8),
    flex: 1
  },

  btnPilih: {
    height: 64,
    // backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 5
  },

  bgNc90: {
    backgroundColor: neutralColor[90]
  },

  btnBackToHome: {
    height: 64,
    backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 20,
    margin: 10
  },

  btnCancel: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 8
  },

  boxListCard: {
    // flexDirection: "row",
    marginVertical: 24,
    width: "100%",
    justifyContent: "space-between"
  },

  card: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: neutralColor[90],
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    marginBottom: 10,
    backgroundColor: neutralColor[90],
    elevation: 50
  },

  headCard: {
    justifyContent: "center",
    margin: -20,
    padding: 0
  },

  backPrimaryColor: {
    backgroundColor: primaryColor.main
  },

  headCardActiveNormal: {
    backgroundColor: colors.white
  },

  contentCard: {
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: "100%",
    flex: 2
  },

  textBestValue: {
    color: primaryColor.main,
    transform: [{ rotate: "-90deg" }]
  },

  colorBlack: {},

  colorWhite: {
    color: colors.white
  },

  colorPrimary: {
    color: primaryColor.main
  },

  colorPink: {
    color: "#f7948d"
  },

  backBlack: {
    backgroundColor: neutralColor[90]
  },

  backWhite: {
    backgroundColor: colors.white
  },

  hemat: {
    color: "#CB3168",
    fontWeight: "700"
  },

  price: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5
  },

  textBold: {
    fontWeight: "bold"
  },

  note: {
    // textAlign: "center",
    fontSize: 12
  },
  webview: {
    height: "100%"
  },
  webView: {
    flex: 2
  },
  flex1: {
    flex: 1
  },
  chevronRight: {
    justifyContent: "center"
  },
  boxBest: {
    borderTopLeftRadius: 10,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 10,
    backgroundColor: primaryColor.main
  },
  bgYellow: {
    backgroundColor: primaryColor.main
  }
});

export default styles;
