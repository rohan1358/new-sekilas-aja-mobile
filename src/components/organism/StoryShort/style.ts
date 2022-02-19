import { dangerColor, spacer } from "@constants";
import { widthDp, winHeightPercent, winWidthPercent } from "@helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: winWidthPercent(100),
    height: winHeightPercent(100),
    position: "absolute",
    zIndex: 1000,
    paddingHorizontal: spacer.sl,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: widthDp(40),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
