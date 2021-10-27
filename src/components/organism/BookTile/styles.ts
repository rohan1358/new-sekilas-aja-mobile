import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers/helper";

const TILE_WIDTH = widthPercent(38.92);
const TILE_HEIGHT = (TILE_WIDTH * 11) / 10;

const styles = StyleSheet.create({
  container: { width: TILE_WIDTH },

  image: { borderRadius: 16 },
  imageContainer: {
    width: "100%",
    height: TILE_HEIGHT,
    borderRadius: 16,
  },
});

export default styles;
