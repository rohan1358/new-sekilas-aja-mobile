import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../../helpers";

const styles = StyleSheet.create({
  pageContainer: {
    width: widthPercent(100),
    height: heightPercent(80)
  },

  boxImage: {
    height: "60%",
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  boxtitle: {
    paddingHorizontal: 40
    // marginTop: 20
  },

  title: {
    textAlign: "center"
  },

  sub_title: {
    marginTop: 20,
    textAlign: "center"
  }
});

export default styles;
