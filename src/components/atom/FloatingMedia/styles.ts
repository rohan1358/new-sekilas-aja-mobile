import { neutralColor, primaryColor, spacing } from "@constants";
import { widthPercent } from "@helpers";
import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";

const styles = StyleSheet.create({
  play: {
    backgroundColor: neutralColor[90],
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },

  iconPlay: {
    marginLeft: 5
  },
  container: {
    backgroundColor: primaryColor.main,
    flex: 1
  },
  boxContent: {
    paddingHorizontal: 25
  },
  boxExitIos: {
    // alignItems: "flex-end",
    paddingTop: 30
  },

  boxExit: {
    // alignItems: "flex-end"
  },
  content: {
    flex: 1,
    width: widthPercent(100)
  },
  btn: {
    marginHorizontal: adjust(27),
    marginVertical: adjust(19),
    padding: adjust(5)
  }
});

export default styles;
