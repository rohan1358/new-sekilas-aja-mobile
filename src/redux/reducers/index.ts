import { combineReducers } from "redux";
import sessionReducer from "./session";
import editProfile from "./editProfile";

const rootReducer = combineReducers({
  sessionReducer,
  editProfile
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
