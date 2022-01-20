import { combineReducers } from "redux";
import sessionReducer from "./session";
import editProfile from "./editProfile";
import general from "./general";
import bookRedux from "./book";
import notifRedux from "./notif";

const rootReducer = combineReducers({
  sessionReducer,
  editProfile,
  general,
  bookRedux,
  notifRedux
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
