import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./reducers";

const persistConfig = {
  key: "iti28urcljals",
  storage: AsyncStorage,
};

let middlewaresToApply = [];

if (__DEV__) {
  const createFlipperDebugger = require("redux-flipper").default;
  middlewaresToApply.push(createFlipperDebugger());
}

const middleware = applyMiddleware(...middlewaresToApply);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: any = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
