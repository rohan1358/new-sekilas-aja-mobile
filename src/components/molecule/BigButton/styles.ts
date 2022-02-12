import { StyleSheet } from "react-native";
import { neutralColor } from "../../../constants";

const styles = ({ disabled }: { disabled: boolean | null }) =>
  StyleSheet.create({
    container: {
      height: 64,
      // flex: 1,
      backgroundColor: neutralColor[disabled ? 30 : 90],
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center"
    }
  });

export default styles;
