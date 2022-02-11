import { colors, neutralColor, spacer } from "@constants";
import { widthDp } from "@helpers";
import { StyleSheet } from "react-native";

const TILE_SIZE = 162;
const IMAGE_WIDTH = 80;
const IMAGE_RATIO = 3 / 2;
const CIRCLE_MULTIPLIER = 1.5;

const styles = StyleSheet.create({
  circle: {
    width: widthDp(TILE_SIZE * CIRCLE_MULTIPLIER),
    height: widthDp(TILE_SIZE * CIRCLE_MULTIPLIER),
    backgroundColor: colors.yellow2,
    borderRadius: widthDp(TILE_SIZE * CIRCLE_MULTIPLIER),
    position: "absolute",
    top: widthDp(TILE_SIZE / 2),
  },
  container: {
    width: widthDp(TILE_SIZE),
    aspectRatio: 81 / 113,
    backgroundColor: colors.yellow1,
    borderRadius: spacer.sm,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: widthDp(IMAGE_WIDTH),
    height: widthDp(IMAGE_WIDTH * IMAGE_RATIO),
  },

  smallCircle: {
    width: "100%",
    paddingHorizontal: spacer.sm,
    justifyContent: "center",
    alignItems: "center",
  },

  title: { textAlign: "center", color: neutralColor["90"] },

  wrapper: { flexDirection: "row" },
});

export default styles;
