import { spacing as sp } from "@constants";
import { StyleSheet } from "react-native";
import { winHeightPercent } from "../../../helpers";
import { ILLU_SIZE } from "./values";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: winHeightPercent(100) - 64 - 32 * 2,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: { paddingHorizontal: sp.sl },

  wrapper: {
    width: ILLU_SIZE,
    height: ILLU_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
