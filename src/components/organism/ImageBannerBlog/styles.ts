import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers";

const BANNER_WIDTH = widthPercent(84.18);
const BANNER_HEIGHT = (widthPercent(84.18) * 4) / 9;

const styles = StyleSheet.create({
  container: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  containerDesk: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT / 1.5,
    borderRadius: 16,
    overflow: "hidden",
  },
  btnBar: {
    height: 40,
    backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5,
    // width: "1%",
    bottom: 0,
    // position: "absolute"
  },

  image: { borderRadius: 16 },
});

export default styles;
