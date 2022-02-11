import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../../helpers";

const BANNER_WIDTH = widthPercent(80);
const BANNER_HEIGHT = (widthPercent(84.18) * 4) / 9 + 20;

const styles = StyleSheet.create({
  container: {
    width: BANNER_WIDTH,
    height: BANNER_WIDTH / 1.5,
    borderRadius: 16,
    overflow: "hidden"
  },
  containerDesk: {
    width: BANNER_WIDTH,
    // height: BANNER_WIDTH / 1.5,
    borderRadius: 16,
    overflow: "hidden"
  },
  btnBar: {
    // position: "absolute",
    height: 40,
    backgroundColor: neutralColor[90],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "95%",
    marginTop: 5
    // marginBottom: 0
    // bottom: 0
    // alignSelf: "center"
    // marginLeft: -10

    // position: "absolute"
  },

  image: { borderRadius: 16 }
});

export default styles;
