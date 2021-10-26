import { LOGIN, LOGOUT } from "../actionTypes";

const loggingIn = (payload: any) => ({
  type: LOGIN,
  payload,
});

const loggingOut = () => ({
  type: LOGOUT,
});

export { loggingIn, loggingOut };
