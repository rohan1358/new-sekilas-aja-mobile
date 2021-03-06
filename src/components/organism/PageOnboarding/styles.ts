import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../../helpers";
import { PixelRatio, Dimensions } from "react-native";
import { adjust, adjustLetterSpace } from "../../../utils";
import { neutralColor, NotoSans } from "@constants";
const styles = StyleSheet.create({
  pageContainer: {
    width: widthPercent(100),
    height: heightPercent(80)
  },

  boxImage: {
    height: heightPercent(adjust(55)),
    overflow: "hidden",
    alignItems: "center"
  },

  image: {
    width: widthPercent(100),
    height: "100%",
    resizeMode: "stretch"
    // resizeMode: "contain"
  },

  boxtitle: {
    paddingHorizontal: adjust(25),
    marginTop: 16
  },

  title: {
    textAlign: "center",
    fontFamily: NotoSans.black
  },

  sub_title: {
    marginTop: 5,
    textAlign: "center"
  }
});

export default styles;
