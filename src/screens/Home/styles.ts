import { Dimensions, StyleSheet } from "react-native";
import { adjust } from "../../utils";
import { neutralColor, primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers";

const { width } = Dimensions.get("screen");

const is3Inch = (num: any) => {
  return adjust(num);
  // if (width > 320) {
  //   return num;
  // } else {
  //   return num / 2;
  // }
};

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
  row: { flexDirection: "row" },
  btnNewMenu: {
    borderWidth: is3Inch(2),
    margin: is3Inch(1),
    padding: is3Inch(10),
    borderRadius: is3Inch(15),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderColor: neutralColor[50],
    width: adjust(widthPercent(40))
  },
  iconNewMenu: {
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#ECF1F7"
  },
  containerNewMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercent(100)
  },
  textNewMenu: { marginLeft: 5 }
});

export default styles;
