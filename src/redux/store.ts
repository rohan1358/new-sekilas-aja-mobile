import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./reducers";

const persistConfig = {
  key: "iti28urcljals",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: any = createStore(persistedReducer);
const persistor = persistStore(store);

export { persistor, store };
