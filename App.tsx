import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import Root from "./src/Root";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { LogBox } from "react-native";

const App = () => {
  LogBox.ignoreLogs(["Require cycle", "Consider refactoring to remove"]);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = () => {
    if (initializing) {
      setInitializing(false);
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
