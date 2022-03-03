import { handleOpenModalSubscribe } from "@actions";
import {
  BookOpen,
  BookOpenFilled,
  Grid,
  GridFilled,
  Home,
  HomeFilled,
  Mentor,
  SubscribeCard
} from "@assets";
import {
  neutralColor,
  pages,
  primaryColor,
  spacing as sp,
  strings
} from "@constants";
import { ModalSubscribe } from "@organism";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { ReduxState } from "@rux";
import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, TextItem } from "../../atom";
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
      return strings.home;

    case pages.Explore:
      return strings.explore;

    case pages.Library:
      return strings.library;
    case pages.Mentoring:
      return strings.Mentoring;

    default:
      return strings.home;
  }
};

const Icon = ({
  label,
  isFocused
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
    case pages.Mentoring:
      return isFocused ? (
        <Mentor
          stroke={"none"}
          fill={activeColor}
          width={ACTIVE_ICON_SIZE}
          height={ACTIVE_ICON_SIZE}
        />
      ) : (
        <Mentor stroke={inactiveColor} />
      );

    default:
      return <Home stroke={inactiveColor} />;
  }
};

const TAB_HEIGHT = 64;
const TAB_BOTTOM_GAP = sp.m;

const FancyBottomTab = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) => {
  const navPosition = useSharedValue(TAB_BOTTOM_GAP);

  const containerStyle = useAnimatedStyle(() => ({
    bottom: navPosition.value
  }));

  const {
    editProfile: { profile },
    general: { isBottomTabHidden },
    mainContext: { modalSubscribeRedux }
  } = useSelector((state: ReduxState) => state);
  const [toggleTab, setToggleTab] = useState(false);

  useEffect(() => {
    detectKeyboard();
  }, []);

  useEffect(() => {
    setToggleTab(isBottomTabHidden);
  }, [isBottomTabHidden]);

  useEffect(() => {
    detectBottomTab();
  }, [toggleTab]);

  const detectBottomTab = () => {
    if (toggleTab) {
      navPosition.value = withTiming(-TAB_HEIGHT - TAB_BOTTOM_GAP * 2);
      return;
    }
    navPosition.value = withTiming(TAB_BOTTOM_GAP);
  };

  const detectKeyboard = () => {
    Keyboard.addListener(
      "keyboardDidShow",
      () =>
        (navPosition.value = withDelay(
          400,
          withTiming(-TAB_HEIGHT - TAB_BOTTOM_GAP * 2)
        ))
    );
    Keyboard.addListener(
      "keyboardDidHide",
      () => (navPosition.value = withDelay(400, withTiming(TAB_BOTTOM_GAP)))
    );
  };

  const dispatch = useDispatch();

  const modalVisible = modalSubscribeRedux;

  const setModalVisible = () => {
    // done
    dispatch(handleOpenModalSubscribe());
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.innerContainer, containerStyle]}>
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
                  canPreventDefault: true
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
                  target: route.key
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
                  key={`${label}`}
                >
                  <View
                    style={[
                      styles.tab,
                      {
                        top: isFocused ? sp.xxs / 2 : 0
                      }
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      <Icon {...{ label, isFocused }} />
                    </View>
                    {isFocused && (
                      <>
                        <Gap vertical={sp.xxs} />
                        <TextItem numberOfLines={1} type="b.10.pc.main">
                          {recentLabel(label)}
                        </TextItem>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
            {!profile?.is_subscribed && (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => setModalVisible(true)}
                style={styles.tabContainer}
              >
                <View
                  style={[
                    styles.tab,
                    {
                      top: modalVisible ? sp.xxs / 2 : 0
                    }
                  ]}
                >
                  <View style={styles.iconContainer}>
                    {modalVisible ? (
                      <SubscribeCard
                        color={activeColor}
                        width={ACTIVE_ICON_SIZE}
                        height={ACTIVE_ICON_SIZE}
                      />
                    ) : (
                      <SubscribeCard color={inactiveColor} />
                    )}
                  </View>
                  {modalVisible && (
                    <>
                      <Gap vertical={sp.xxs} />
                      <TextItem type="b.10.pc.main">Berlangganan</TextItem>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
      {/* <ModalSubscribe
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
    </>
  );
};

export default FancyBottomTab;
