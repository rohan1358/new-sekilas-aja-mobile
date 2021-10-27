import { StyleSheet } from "react-native";
import { neutralColor, spacing as sp } from "../../../constants";
import { widthPercent } from "../../../helpers/helper";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: widthPercent(59.36),
  },

  detail: { justifyContent: "space-between" },

  image: { borderRadius: 12 },
  imageContainer: {
    width: 64,
    height: 68,
    borderRadius: 12,
  },

  seed: {
    paddingVertical: sp.xxs,
    paddingHorizontal: sp.xs,
    backgroundColor: neutralColor[20],
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

export default styles;
