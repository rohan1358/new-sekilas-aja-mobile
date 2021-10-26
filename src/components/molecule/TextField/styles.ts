import { StyleSheet } from "react-native";
import {
  colors,
  dangerColor,
  defaultValue,
  primaryColor,
  spacing,
  successColor,
} from "../../../constants";

const FIELD_HEIGHT = 48;

const styles = ({ state }: { state: string }) => {
  const { none, warn, success, fail } = defaultValue.textFieldState;
  const borderColor =
    state === none
      ? colors.white1
      : state === warn
      ? primaryColor.main
      : state === success
      ? successColor.main
      : state === fail
      ? dangerColor.main
      : colors.white1;
  return StyleSheet.create({
    container: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor,
      height: FIELD_HEIGHT,
      flexDirection: "row",
      alignItems: "center",
    },

    iconContainer: {
      width: FIELD_HEIGHT - 8,
      height: FIELD_HEIGHT - 8,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      flex: 1,
      paddingHorizontal: spacing.sm,
    },
  });
};

export default styles;
