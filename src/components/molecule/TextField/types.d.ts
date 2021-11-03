import { ReactElement } from "react";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

interface TextFieldProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;

  Icon?: ReactElement;
  iconDisbabled?: boolean;
  iconPress?(): void;
  innerContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;

  message?: string;

  noBottomGap?: boolean;

  state?: string;
}
