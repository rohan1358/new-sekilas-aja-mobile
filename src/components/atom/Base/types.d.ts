interface HeaderStateProps {
  visible: boolean;
  title?: string;
  onBackPress?(): void;
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
