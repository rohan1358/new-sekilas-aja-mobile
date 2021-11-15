interface SnackStateProps {
  visible: boolean;
  message: string;
  type: "fail" | "success";
}

interface BaseProps {
  backgroundColor?: string;
  barColor?: string;
  barStyle?: "dark-content" | "light-content" | "default";

  setSnackState?(arg0: SnackStateProps): void;
  snackState?: SnackStateProps;
}
