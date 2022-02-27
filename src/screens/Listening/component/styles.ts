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
    width: adjust(40),
    height: adjust(40)
  },
  iconPlay: {
    marginLeft: 5
  },
  titleAudio: {
    flex: 1,
    marginHorizontal: adjust(5)
  }
});

export default styles;
