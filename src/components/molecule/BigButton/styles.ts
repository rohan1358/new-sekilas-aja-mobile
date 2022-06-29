import { StyleSheet } from "react-native";
import { adjust } from "../../../utils";
import { neutralColor, neutralColorButton } from "../../../constants";

const styles = ({ disabled }: { disabled: boolean | null }) =>
  StyleSheet.create({
    container: {
      height: adjust(64),
      // flex: 1,
      backgroundColor: neutralColorButton[disabled ? 30 : 90],
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default styles;
