import { ReactElement } from "react";

interface HeaderStateProps {
  customComp?: any;
  onBackPress?(): void;
  title?: string;
  type?: "back" | "custom" | undefined;
  visible: boolean;
}

interface SnackStateProps {
  visible: boolean;
  message: string;
  type: "fail" | "success";
}

interface BaseProps {
  backgroundColor?: string;
  barColor?: string;
  barStyle?: "dark-content" | "light-content" | "default";
  headerState?: HeaderStateProps;

  setSnackState?(arg0: SnackStateProps): void;
  snackState?: SnackStateProps;
}
