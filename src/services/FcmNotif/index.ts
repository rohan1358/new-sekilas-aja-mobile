import { primaryColor } from "@constants";
import notifee, { AndroidImportance } from "@notifee/react-native";

const localPushNotif = async (message: {
  notification: { title: string; body: string };
}) => {
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

export { localPushNotif };
