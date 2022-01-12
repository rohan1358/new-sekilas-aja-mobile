import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./reducers";

const persistConfig = {
  key: "iti28urcljals",
  storage: AsyncStorage
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

const mostBookStorage = {
  set: async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("mostBook", jsonValue);
    } catch (e) {
      return false;
    }
  },
  get: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mostBook");
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      return false;
    }
  }
};

const bookRecomendedStorage = {
  set: async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("recomendedBook", jsonValue);
    } catch (e) {
      return false;
    }
  },
  get: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recomendedBook");
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      return false;
    }
  }
};

export { persistor, store, mostBookStorage, bookRecomendedStorage };
