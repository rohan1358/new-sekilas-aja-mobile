import { TextInputProps } from "react-native";

interface TextFieldProps extends TextInputProps {
  message?: string;
  state?: string;
}
