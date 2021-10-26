import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import Root from "./src/Root";
import auth from "@react-native-firebase/auth";

const App = () => {
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged() {
    if (initializing) {
      setInitializing(false);
      SplashScreen.hide();
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <Root />;
};

export default App;
