import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import Root from "./src/Root";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { LogBox, Text, Appearance } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { decrypt } from "./src/utils";

const App = () => {
  LogBox.ignoreLogs([
    "Require cycle",
    "Consider refactoring to remove",
    "Seems like you're using an old API with gesture components"
  ]);

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
    // const dec = decrypt("U2FsdGVkX19sYU7CpVclqo7l7/9sm5Xh1rwO8Q90eqM=");

    // console.log("dec", dec);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // new splash screen
    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);

    // firestore()
    //   .collection("users")
    //   .get()
    //   .then((res) => {
    //     res.docs.map((data) => {
    //       let { id } = data;
    //       firestore()
    //         .collection("users")
    //         .doc(id)
    //         .set({ ...data.data(), owned_books: ["GRIT"] }, { merge: true });
    //     });
    //   });

    return subscriber; // unsubscribe on unmount
  }, []);

  // zzQJOIvNesVsQsIz6rlMH1QdfgB3

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
