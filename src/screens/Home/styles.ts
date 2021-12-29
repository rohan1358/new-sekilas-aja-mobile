import { StyleSheet } from "react-native";
import { primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  adjuster: { top: -sp.m },

  clickTitle: {
    paddingHorizontal: sp.sl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  columnWrapperStyle: { justifyContent: "space-between" },

  dummyHeader: {
    height: 64,
    width: widthPercent(100),
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    top: -sp.m
  },

  longTitle: { flex: 1.25 },

  newCollectionContainer: { flexDirection: "row" },
  newCollectionContentContainerStyle: { paddingLeft: sp.sl },

  skeleton: { flex: 1 },

  underline: { textDecorationLine: "underline" },
  row: { flexDirection: "row" }
});

export default styles;
