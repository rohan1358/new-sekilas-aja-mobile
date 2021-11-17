import { TextInputProps } from "react-native";

interface SearchHeaderProps extends TextInputProps {
  backPress(): void;
  keyword?: string;
  closePress(): void;
}
