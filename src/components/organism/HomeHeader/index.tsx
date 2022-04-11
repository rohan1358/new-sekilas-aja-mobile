import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Amage, Button, Gap, TextItem } from "../../atom";
import { Bell, NotifyActive, UserPlaceholder } from "../../../../assets";
import { neutralColor, spacing as sp, strings } from "../../../constants";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { primaryColor } from "@constants";
import { useSelector } from "react-redux";
import { ReduxState } from "@rux";
import messaging from "@react-native-firebase/messaging";

const HomeHeader = ({
  name = "",
  uri,
  onBellPress,
  onPressProfile
}: HomeHeaderProps) => {
  const isFocus = useIsFocused();

  const {
    notifRedux: { listNotifInbox, listNotifPromo },
    sessionReducer: { email, isLogin },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const checkingNotif = () => {
    let all = [...listNotifInbox, ...listNotifPromo];

    const checked = all.find((data) => {
      return !data.users.includes(email);
    });
    return checked;
  };

  const pushNotification = () => {
    const message = {
      data: {
        content: "New updates are available!"
      },
      condition:
        "'weather' in topics && ('news' in topics || 'traffic' in topics)"
    };

    fetch(
      "https://fcm.googleapis.com/v1/projects/sekilasaja-999fd/messages:send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer AIzaSyDBJWkmZN2Lg3Y1nyT1rTSy0A6ae71GcBk"
        },
        body: JSON.stringify({
          message: {
            token:
              "fXgVqXNTTxW_SiERmwYwa7:APA91bEnSyGAwk9X3R1FuYxtL8qiyjaTNXFFZCXelVgQeofMGMVA_GAYhmoPbHphQlnXMsktr4mhpWXi_Rnpuw6457m8WjwyUfeHHeRYMDmuDsm6Vy598uiRjp0OmHZc10kaY5wCFvZH",
            data: {},
            notification: {
              body: "This is an FCM notification message!",
              title: "FCM Message"
            }
          }
        })
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <View style={styles.container}>
      {isFocus ? (
        <>
          <Button
            onPress={() => {
              name && onPressProfile();
            }}
            style={styles.profileContainer}
          >
            {!!uri ? (
              <Amage source={uri} />
            ) : (
              <Amage placeholder={UserPlaceholder} />
            )}
          </Button>
          <Gap horizontal={sp.xs} />
          <View style={styles.detailContainer}>
            <TextItem
              onPress={() => {
                name && onPressProfile();
              }}
              type="r.14.ncb.80"
            >
              {/* string selamat membaca */}
              Selamat membaca
            </TextItem>
            <TextItem
              onPress={() => {
                name && onPressProfile();
              }}
              type="b.24.ncb.90.c"
            >
              {name}
            </TextItem>
          </View>
          <Button
            style={styles.iconContainer}
            onPress={() => {
              // pushNotification();
              name && onBellPress();
            }}
          >
            <Bell stroke={neutralColor[90]} />
            {checkingNotif() && (
              <NotifyActive
                style={{ position: "absolute", bottom: 10, right: 10 }}
                color={"green"}
              />
            )}
          </Button>
        </>
      ) : (
        <ActivityIndicator color={primaryColor.main} />
      )}
    </View>
  );
};

export default HomeHeader;
