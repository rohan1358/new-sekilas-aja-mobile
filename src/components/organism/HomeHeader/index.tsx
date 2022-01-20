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

const HomeHeader = ({
  name = "",
  uri,
  onBellPress,
  onPressProfile
}: HomeHeaderProps) => {
  const isFocus = useIsFocused();

  const {
    notifRedux: { listNotifInbox, listNotifPromo },
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const checkingNotif = () => {
    let all = [...listNotifInbox, ...listNotifPromo];

    const checked = all.find((data) => {
      return !data.users.includes(email);
    });
    return checked;
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
              type="r.14.nc.80"
            >
              {strings.happyReading}
            </TextItem>
            <TextItem
              onPress={() => {
                name && onPressProfile();
              }}
              type="b.24.nc.90.c"
            >
              {name}
            </TextItem>
          </View>
          <Button
            style={styles.iconContainer}
            onPress={() => {
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
