import {
  Amage,
  Base,
  DummyFlatList,
  HeaderNotification,
  TextItem
} from "../../components";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import styles from "./styles";
import {
  colors,
  firebaseNode,
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings
} from "@constants";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Card } from "../../components/organism/PageNotification";
import { NotifEmptyPng, PromoEmptyPng } from "@assets";
import { Notif1, Notif2 } from "../../../assets/images";
import { notifHasOpen } from "../../services/notification";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import { ReduxState } from "@rux";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Notification({ navigation, route }: any) {
  const {
    notifRedux: { loading, listNotifPromo, listNotifInbox, contentNotif },
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenNotif = (data: any, type: any) => {
    notifHasOpen(data.id, data.users, email, type);
  };

  const { title, content } = route.params;

  console.log("params", route.params);

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainHome}
      >
        <HeaderNotification navigation={navigation} title={title} />
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
            marginHorizontal: 5
          }}
        >
          <Image style={styles.image} source={Notif2} />
          <TextItem
            type="b.20.nc.90"
            style={{
              fontSize: 25,
              textAlign: "center"
            }}
          >
            {title}
          </TextItem>

          <TextItem
            type="b.20.nc.90"
            style={{
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {content}
          </TextItem>
          <TouchableOpacity
            style={{
              backgroundColor: primaryColor.main,
              paddingVertical: 10,
              borderRadius: 10,
              marginVertical: 10,
              paddingHorizontal: 20
            }}
          >
            <TextItem type="b.20.nc.90">Perpanjang Berlangganan</TextItem>
          </TouchableOpacity>
        </View>
      </SkeletonContent>
    </Base>
  );
}
