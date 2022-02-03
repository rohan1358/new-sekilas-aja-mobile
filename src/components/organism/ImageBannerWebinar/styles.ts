import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers";

const BANNER_WIDTH = widthPercent(74.18);
const BANNER_HEIGHT = (widthPercent(84.18) * 4) / 9 + 20;

const styles = StyleSheet.create({
  container: {
    width: BANNER_WIDTH,
    height: BANNER_WIDTH / 1.5,
    borderRadius: 16,
    overflow: "hidden"
  },
  btnBar: {
    height: 40,
    backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5,
    width: "95%"
    // bottom: 0
    // alignSelf: "center",
    // marginLeft: -10

    // position: "absolute"
  },

  image: { borderRadius: 16 }
});

export default styles;
