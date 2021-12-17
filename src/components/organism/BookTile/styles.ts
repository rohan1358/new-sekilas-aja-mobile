import { colors, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers";

const TILE_WIDTH = widthPercent(38.92);
const TILE_HEIGHT = (TILE_WIDTH * 11) / 10;

const styles = StyleSheet.create({
  background: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    position: "absolute",
    backgroundColor: primaryColor.main,
    borderRadius: 16,
    overflow: "hidden",
  },

  container: { width: TILE_WIDTH },

  image: { borderRadius: 16 },
  imageContainer: {
    width: "100%",
    height: TILE_HEIGHT,
    borderRadius: 16,
    paddingTop: sp.m,
    overflow: "hidden",
  },
  innerBackgorund: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    borderRadius: TILE_WIDTH,
    backgroundColor: colors.lightYellow,
    position: "absolute",
    top: -TILE_WIDTH / 8,
    left: -TILE_WIDTH / 8,
  },

  title: {
    flex: 1,
  },

  lock: {},

  boxTitle: {
    flexDirection: "row",
  },
});

export { TILE_WIDTH, TILE_HEIGHT };

export default styles;
