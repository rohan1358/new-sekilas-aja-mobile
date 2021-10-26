import { combineReducers } from "redux";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  sessionReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;

export { rootReducer };
