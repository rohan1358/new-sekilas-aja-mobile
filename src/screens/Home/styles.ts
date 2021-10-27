import { StyleSheet } from "react-native";
import { primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers/helper";

const styles = StyleSheet.create({
  dummyHeader: {
    height: 64,
    width: widthPercent(100),
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    top: -sp.m,
  },

  newCollectionContainer: { flexDirection: "row" },
  newCollectionContentContainerStyle: { paddingLeft: sp.m },
});

export default styles;
