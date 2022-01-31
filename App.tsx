import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import Root from "./src/Root";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { LogBox, Text } from "react-native";

const App = () => {
  LogBox.ignoreLogs(["Require cycle", "Consider refactoring to remove"]);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = () => {
    if (initializing) {
      setInitializing(false);
      SplashScreen.hide();
    }
  };
  // state loading  splash screen
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // new splash screen
    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
        {/* {loading ? <Text>Loading. . .</Text> : <Root />} */}
      </PersistGate>
    </Provider>
  );
};

export default App;
