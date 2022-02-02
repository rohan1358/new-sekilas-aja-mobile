import { StyleSheet } from "react-native";
import { neutralColor, primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  adjuster: { top: -sp.m },

  clickTitle: {
    paddingHorizontal: sp.sl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnWrapperStyle: { justifyContent: "space-between" },

  dummyHeader: {
    height: 64,
    width: widthPercent(100),
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    top: -sp.m,
  },

  longTitle: { flex: 1.25 },

  newCollectionContainer: { flexDirection: "row" },
  newCollectionContentContainerStyle: { paddingLeft: sp.sl },

  skeleton: { flex: 1 },

  underline: { textDecorationLine: "underline" },
  row: { flexDirection: "row" },
  btnNewMenu: {
    borderWidth: 2,
    margin: 5,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    maxWidth: "45%",
    alignSelf: "center",
    borderColor: neutralColor[50],
  },
  iconNewMenu: {
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#ECF1F7",
  },
  containerNewMenu: {
    flexDirection: "row",
    justifyContent: "center",
    width: widthPercent(100),
  },
  textNewMenu: { marginLeft: 10 },
});

export default styles;
