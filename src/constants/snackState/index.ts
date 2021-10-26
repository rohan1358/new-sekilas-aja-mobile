const closeState: SnackStateProps = {
  visible: false,
  message: "",
  type: "success",
};

const successState = (message: string): SnackStateProps => ({
  visible: true,
  message,
  type: "success",
});

const failState = (message: string): SnackStateProps => ({
  visible: true,
  message,
  type: "fail",
});

const snackState = { closeState, failState, successState };

export { snackState };
