import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers/helper";

const TILE_WIDTH = widthPercent(38.92);
const TILE_HEIGHT = (TILE_WIDTH * 11) / 10;

const styles = StyleSheet.create({
  image: { borderRadius: 16 },
  imageContainer: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    borderRadius: 16,
  },
});

export default styles;
