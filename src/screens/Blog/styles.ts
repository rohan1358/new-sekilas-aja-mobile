import { Dimensions, StyleSheet } from "react-native";
import { neutralColor, primaryColor, spacing as sp } from "../../constants";
import { widthPercent } from "../../helpers";

const HEADER_RADIUS = 24;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  newCollectionContentContainerStyle: { paddingLeft: sp.sl },

  newCollectionContainer: { flexDirection: "row" },

  headerContainer: {
    paddingHorizontal: sp.sl,
    backgroundColor: primaryColor.main,
    borderBottomLeftRadius: HEADER_RADIUS,
    borderBottomRightRadius: HEADER_RADIUS,
  },

  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  containerList: {
    flexDirection: "row",
    paddingLeft: 25,
    marginBottom: 20,
  },

  containerImageList: {
    width: width / 3,
    height: width / 3,
    marginHorizontal: 5,
  },

  imageList: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  containerDesk: {
    width: width * 0.55,
    marginLeft: 5,
  },
});

export default styles;
