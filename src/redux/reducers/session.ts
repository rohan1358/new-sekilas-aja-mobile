import { LOGIN, LOGOUT } from "../actionTypes";

interface SessionReducerIfc {
  isLogin: boolean;
  email: string;
}

const initialState: SessionReducerIfc = {
  isLogin: false,
  email: "",
};

const sessionReducer = (
  state = initialState,
  action: { type: string; payload: SessionReducerIfc }
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };

    case LOGOUT:
      return { ...state, isLogin: false, email: "" };

    default:
      return state;
  }
};

export default sessionReducer;
