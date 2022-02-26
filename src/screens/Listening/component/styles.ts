import { neutralColor, primaryColor, spacing } from "@constants";
import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";
import { heightPercent } from "../../helpers";

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
  titleAudio: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: adjust(5)
  }
});

export default styles;
