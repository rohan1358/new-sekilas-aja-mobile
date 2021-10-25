import "react-native-gesture-handler";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Root from "./src/Root";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Root />;
};

export default App;
