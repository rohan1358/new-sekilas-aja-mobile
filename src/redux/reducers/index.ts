import { combineReducers } from "redux";
import sessionReducer from "./session";
import editProfile from "./editProfile";
import general from "./general";

const rootReducer = combineReducers({
  sessionReducer,
  editProfile,
  general,
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
