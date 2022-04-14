import { colors, neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";
import { widthPercent } from "../../../helpers";

const styles = StyleSheet.create({
  btnBackToHome: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 20,
    margin: 10
  }
});

export default styles;
