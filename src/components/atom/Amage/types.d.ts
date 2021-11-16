import { ImageProps, ImageStyle, StyleProp, ViewStyle } from "react-native";

type AmageImage = Omit<ImageProps, "source">;

interface AmageProps extends AmageImage {
  source?: string;
  style?: StyleProp<ImageStyle>;
  placeholder?: number;
}
