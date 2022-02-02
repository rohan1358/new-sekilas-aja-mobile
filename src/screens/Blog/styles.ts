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
    borderBottomRightRadius: HEADER_RADIUS
    // flexDirection: "row"
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "space-between"
  },
  containerList: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  containerImageList: {
    width: width / 3,
    height: width / 3,
    marginHorizontal: 5
  },
  imageList: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  containerDesk: {
    width: width * 0.6,
    marginLeft: 5
  }
});

export default styles;