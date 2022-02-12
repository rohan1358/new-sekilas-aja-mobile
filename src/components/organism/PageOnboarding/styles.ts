import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../../helpers";
import { PixelRatio, Dimensions } from "react-native";
import { adjust } from "../../../utils";

const styles = StyleSheet.create({
  pageContainer: {
    width: widthPercent(100),
    height: heightPercent(80)
  },

  boxImage: {
    height: heightPercent(adjust(53)),
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  boxtitle: {
    paddingHorizontal: adjust(40),
    marginTop: 5
  },

  title: {
    textAlign: "center"
  },

  sub_title: {
    marginTop: 5,
    textAlign: "center"
  }
});

export default styles;
