import {
  ArrowLeft,
  BookmarkDetail,
  BookmarkDetailInActive,
  Download,
  HeartBook
} from "@assets";
import { neutralColor, primaryColor } from "@constants";
import { useNavigation, StackActions } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button } from "../../atom";
import styles from "./styles";

export default function HeaderBookDetail({
  navigation,
  onDownload,
  onFavorite,
  active,
  isSubscribe
}: HeaderBookDetailProps) {
  const newNavigation = useNavigation();

  const popAction = StackActions.pop(1);

  let stateNavigation = newNavigation.getState() || {};

  const { index, key, routeNames, routes, stale, type, history } =
    stateNavigation;

  let routeName = routes && routes[index].name;
  // newNavigation.dispatch(popAction)
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()}>
        <ArrowLeft color={neutralColor[90]} />
      </Button>
      <View style={styles.boxRight}>
        {/* <Button onPress={() => onDownload && onDownload()} style={styles.btn}>
          <Download color={neutralColor[90]} />
        </Button> */}
        {isSubscribe && (
          <Button
            onPress={() => onFavorite && onFavorite()}
            style={[styles.btnHeart, styles.btn]}
          >
            {active ? (
              <BookmarkDetail color={primaryColor.main} />
            ) : (
              <BookmarkDetailInActive color={primaryColor.main} />
            )}
          </Button>
        )}
      </View>
    </View>
  );
}
