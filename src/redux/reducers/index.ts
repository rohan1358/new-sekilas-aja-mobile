import { combineReducers } from "redux";
import sessionReducer from "./session";
import editProfile from "./editProfile";
import general from "./general";
import bookRedux from "./book";
import notifRedux from "./notif";
import challengeRedux from "./challenge";
import mainContext from "./main";
import progressContext from "./progress";
import shortsCOntext from "./shorts";
import audioRedux from "./floatingMedia";

const rootReducer = combineReducers({
  sessionReducer,
  editProfile,
  general,
  bookRedux,
  notifRedux,
  challengeRedux,
  mainContext,
  progressContext,
  shortsCOntext,
  audioRedux
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
