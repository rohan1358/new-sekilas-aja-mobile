/**
 * @format
 */

import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { name as appName } from "./app.json";
import { primaryColor } from "./src/constants/colors";

const onMessageReceived = async (message) => {
  const {
    notification: { title, body },
  } = message;
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
    lights: true,
  });
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      color: primaryColor.main,
      largeIcon: "logo",
      circularLargeIcon: true,
    },
  });
};

messaging().onMessage(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>
  require("./src/services/trackPlayer")
);
