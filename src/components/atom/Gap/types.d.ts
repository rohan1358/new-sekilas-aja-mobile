import { ViewStyle } from "react-native";

interface BaseProps {
  horizontal?: number | undefined;
  vertical?: number | undefined;
}

interface GapProps extends BaseProps {
  style?: ViewStyle;
}

interface StylesProps extends BaseProps {}

export type { GapProps, StylesProps };
