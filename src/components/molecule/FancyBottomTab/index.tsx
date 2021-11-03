import {
  BookOpen,
  BookOpenFilled,
  Grid,
  GridFilled,
  Home,
  HomeFilled,
} from "@assets";
import { neutralColor, pages, primaryColor, spacing as sp } from "@constants";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Gap, TextItem } from "../../atom";
import styles from "./styles";

const activeColor = primaryColor.main;
const inactiveColor = neutralColor[50];
const ACTIVE_ICON_SIZE = 32;

const recentLabel = (
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
      }) => React.ReactNode)
) => {
  switch (label) {
    case pages.Home:
      return "Beranda";

    case pages.Explore:
      return "Eksplor";

    case pages.Library:
      return "Bukuku";

    default:
      return "Beranda";
  }
};

const Icon = ({
  label,
  isFocused,
}: {
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
      }) => React.ReactNode);
  isFocused: boolean;
}) => {
  switch (label) {
    case pages.Home:
      return isFocused ? (
        <HomeFilled
          fill={activeColor}
          width={ACTIVE_ICON_SIZE}
          height={ACTIVE_ICON_SIZE}
        />
      ) : (
        <Home stroke={inactiveColor} />
      );

    case pages.Explore:
      return isFocused ? (
        <GridFilled
          fill={activeColor}
          width={ACTIVE_ICON_SIZE}
          height={ACTIVE_ICON_SIZE}
        />
      ) : (
        <Grid stroke={inactiveColor} />
      );

    case pages.Library:
      return isFocused ? (
        <BookOpenFilled
          fill={activeColor}
          width={ACTIVE_ICON_SIZE}
          height={ACTIVE_ICON_SIZE}
        />
      ) : (
        <BookOpen stroke={inactiveColor} />
      );

    default:
      return <Home stroke={inactiveColor} />;
  }
};

const FancyBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.overlay} />
        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                // @ts-ignore
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabContainer}
              >
                <View
                  style={[
                    styles.tab,
                    {
                      top: isFocused ? sp.xxs / 2 : 0,
                    },
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <Icon {...{ label, isFocused }} />
                  </View>
                  {isFocused && (
                    <>
                      <Gap vertical={sp.xxs} />
                      <TextItem type="b.10.pc.main">
                        {recentLabel(label)}
                      </TextItem>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FancyBottomTab;
