import { neutralColor, spacer } from "@constants";
import { heightDp, widthDp, winHeightPercent, winWidthPercent } from "@helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  box: {
    width: widthDp(40),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: winWidthPercent(100),
    height: winHeightPercent(100),
    position: "absolute",
    zIndex: 1000,
    paddingHorizontal: spacer.sl,
    justifyContent: "space-between",
  },
  content: {
    paddingVertical: spacer.m,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    justifyContent: "flex-end",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: neutralColor.darkFocus,
    paddingVertical: spacer.xxs,
    paddingHorizontal: spacer.xs,
    borderRadius: spacer.xs,
  },
  footerGap: {
    width: "100%",
    height: heightDp(102) - spacer.m,
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

  tile: {
    alignItems: "center",
    paddingVertical: heightDp(12),
    width: "100%",
    backgroundColor: neutralColor["10"],
    paddingHorizontal: heightDp(12),
    flexDirection: "row",
    borderRadius: widthDp(12),
  },
});

export default styles;
