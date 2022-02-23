import { colors, neutralColor, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";
import { widthPercent } from "../../../helpers";

const TILE_WIDTH = adjust(widthPercent(38.92));
const TILE_HEIGHT = adjust((TILE_WIDTH * 11) / 10);

const styles = StyleSheet.create({
  background: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    position: "absolute",
    backgroundColor: primaryColor.main,
    borderRadius: adjust(16),
    overflow: "hidden"
  },

  container: { width: TILE_WIDTH - 20, marginRight: sp.s },

  detail: { flex: 1 },

  image: { borderRadius: adjust(16) },
  imageContainer: {
    width: "100%",
    height: TILE_HEIGHT,
    borderRadius: adjust(16),
    paddingTop: sp.m,
    overflow: "hidden"
  },
  innerBackgorund: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    borderRadius: TILE_WIDTH,
    backgroundColor: colors.lightYellow,
    position: "absolute",
    top: adjust(-TILE_WIDTH / 8),
    left: adjust(-TILE_WIDTH / 8)
  },

  seeds: { flexDirection: "row", flexWrap: "wrap" },

  title: {
    flex: 1
  },

  lock: {},

  boxTitle: {
    flexDirection: "row"
  },
  btn: {
    // height: 64,
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: adjust(10),
    margin: 2,
    flex: 1,
    padding: 10
  },
  btnRead: {
    backgroundColor: neutralColor[90]
  },
  btnDone: {
    backgroundColor: neutralColor[30]
  },
  containerButton: {
    flexDirection: "row",
    // position: "absolute",
    bottom: adjust(10)
  }
});

export { TILE_WIDTH, TILE_HEIGHT };

export default styles;
