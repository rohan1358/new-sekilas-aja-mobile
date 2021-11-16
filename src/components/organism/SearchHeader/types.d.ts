import { TextInputProps } from "react-native";

interface SearchHeaderProps extends TextInputProps {
  keyword?: string;
  closePress(): void;
}
