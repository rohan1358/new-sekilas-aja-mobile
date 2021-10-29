import { StyleProp, ViewStyle } from "react-native";

interface AmageProps {
  source?: string;
  style?: StyleProp<ViewStyle>;
  placeholder?: number;
  resizeMode?:
    | "cover"
    | "contain"
    | "stretch"
    | "repeat"
    | "center"
    | undefined;
}
