import { colors, neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor.main,
    flex: 1
  },

  boxExit: {
    alignItems: "flex-end"
  },

  boxBack: {
    alignItems: "flex-start"
  },

  btn: {
    marginHorizontal: 27,
    marginVertical: 19,
    padding: 5
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
    borderRadius: 16,
    paddingVertical: 29,
    paddingHorizontal: 16,
    marginVertical: 24
  },

  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },

  textList: {
    marginLeft: 8
  },

  btnPilih: {
    height: 64,
    backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 5
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

  colorBlack: {
    color: neutralColor[90]
  },

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
    color: neutralColor[90],
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
    backgroundColor: "#FCCF32"
  },
  bgYellow: {
    backgroundColor: "#FCCF32"
  }
});

export default styles;
