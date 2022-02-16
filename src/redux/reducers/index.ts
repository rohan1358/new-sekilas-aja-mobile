import { combineReducers } from "redux";
import sessionReducer from "./session";
import editProfile from "./editProfile";
import general from "./general";
import bookRedux from "./book";
import notifRedux from "./notif";
import challengeRedux from "./challenge";
import mainContext from "./main";

const rootReducer = combineReducers({
  sessionReducer,
  editProfile,
  general,
  bookRedux,
  notifRedux,
  challengeRedux,
  mainContext
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
