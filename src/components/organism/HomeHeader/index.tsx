import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Amage, Button, Gap, TextItem } from "../../atom";
import { Bell, UserPlaceholder } from "../../../../assets";
import { neutralColor, spacing as sp, strings } from "../../../constants";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";

const HomeHeader = ({
  name = "",
  uri,
  onBellPress,
  onPressProfile
}: HomeHeaderProps) => {
  const isFocus = useIsFocused();

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
          </Button>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default HomeHeader;
