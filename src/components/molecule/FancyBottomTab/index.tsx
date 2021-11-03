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
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { widthPercent } from "../../../helpers/helper";
import { TextItem, Gap } from "../../atom";

const activeColor = primaryColor.main;
const inactiveColor = neutralColor[50];

const FancyBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <View
        style={{
          height: 64,
          width: widthPercent(100) - sp.sl * 2,
          borderRadius: 16,
          position: "absolute",
          bottom: sp.m,
        }}
      >
        <View
          style={{
            width: widthPercent(100),
            position: "absolute",
            height: 64,
            backgroundColor: `${neutralColor[10]}99`,
            left: -sp.sl,
            top: sp.m,
          }}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: neutralColor[90],
            borderRadius: 16,
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const Icon = () => {
              switch (label) {
                case pages.Home:
                  return isFocused ? (
                    <HomeFilled fill={activeColor} width={32} height={32} />
                  ) : (
                    <Home stroke={inactiveColor} />
                  );

                case pages.Explore:
                  return isFocused ? (
                    <GridFilled fill={activeColor} width={32} height={32} />
                  ) : (
                    <Grid stroke={inactiveColor} />
                  );

                case pages.Library:
                  return isFocused ? (
                    <BookOpenFilled fill={activeColor} width={32} height={32} />
                  ) : (
                    <BookOpen stroke={inactiveColor} />
                  );

                default:
                  return <Home stroke={inactiveColor} />;
              }
            };

            const recentLabel = () => {
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
                style={{
                  flex: 1,
                  backgroundColor: neutralColor[90],
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    top: isFocused ? sp.xxs / 2 : 0,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon />
                  </View>
                  {isFocused && (
                    <>
                      <Gap vertical={sp.xxs} />
                      <TextItem type="b.10.pc.main">{recentLabel()}</TextItem>
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
