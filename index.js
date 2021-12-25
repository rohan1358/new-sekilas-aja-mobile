import messaging from "@react-native-firebase/messaging";
import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { name as appName } from "./app.json";
import { localPushNotif } from "./src/services";
import notifee from "@notifee/react-native";

messaging().onMessage(localPushNotif);

messaging().setBackgroundMessageHandler(async () => {});

notifee.onBackgroundEvent(async () => {});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>
  require("./src/services/trackPlayer")
);
