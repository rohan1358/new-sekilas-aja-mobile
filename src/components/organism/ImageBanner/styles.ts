import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers/helper";

const BANNER_WIDTH = widthPercent(84.18);
const BANNER_HEIGHT = (widthPercent(84.18) * 4) / 9;

const styles = StyleSheet.create({
  container: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
  },

  image: { borderRadius: 16 },
});

export default styles;
