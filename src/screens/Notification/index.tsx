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
  neutralColorText,
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

export default function Notification({ navigation }: any) {
  const {
    notifRedux: { loading, listNotifPromo, listNotifInbox },
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const layout = useWindowDimensions();

  const Riwayat = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: neutralColor[10] }}>
      <>
        {!loading && (
          <>
            <View>
              {Array.isArray(listNotifInbox) && listNotifInbox.length > 0 ? (
                listNotifInbox.map((item: any, index: any) => (
                  <Card
                    key={index}
                    item={item}
                    type="inbox"
                    onPress={(data: any) => {
                      handleOpenNotif(data, firebaseNode.notifInbox);
                      navigation.navigate("ContentNotification", {
                        header: "Inbox",
                        ...item
                      });
                    }}
                  />
                ))
              ) : (
                <View style={styles.boxEmpty}>
                  <View style={styles.riwayatEmpty}>
                    <Image
                      style={styles.imageEmpty}
                      source={NotifEmptyPng}
                      resizeMode="contain"
                    />
                  </View>
                  <TextItem
                    style={[
                      styles.notifEmpty,
                      {
                        color: neutralColor[90]
                      }
                    ]}
                  >
                    {strings.notif_empty}
                  </TextItem>
                  <TextItem
                    style={[
                      styles.tidak_ada_notif,
                      {
                        color: neutralColor[60]
                      }
                    ]}
                  >
                    {strings.tidak_ada_notif}
                  </TextItem>
                </View>
              )}
            </View>
          </>
        )}
      </>
    </DummyFlatList>
  );

  const handleOpenNotif = (data: any, type: any) => {
    notifHasOpen(data.id, data.users, email, type);
  };

  const Promo = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: neutralColor[10] }}>
      <View>
        {loading ? (
          <></>
        ) : (
          <>
            {Array.isArray(listNotifPromo) && listNotifPromo.length > 0 ? (
              listNotifPromo.map((item: object, index: number) => (
                <Card
                  onPress={(data: any) => {
                    handleOpenNotif(data, firebaseNode.notifPromo);
                    navigation.navigate("ContentNotification", {
                      ...item,
                      header: "Promo"
                    });
                  }}
                  key={index}
                  item={item}
                  type="promo"
                />
              ))
            ) : (
              <View style={styles.boxEmpty}>
                <View style={styles.riwayatEmpty}>
                  <Image
                    style={styles.imageEmpty}
                    source={PromoEmptyPng}
                    resizeMode="contain"
                  />
                </View>
                <TextItem
                  style={[
                    styles.notifEmpty,
                    {
                      color: neutralColor[90]
                    }
                  ]}
                >
                  {strings.promo_empty}
                </TextItem>
                <TextItem
                  style={[
                    styles.tidak_ada_notif,
                    {
                      color: neutralColor[60]
                    }
                  ]}
                >
                  {strings.tidak_ada_promo}
                </TextItem>
              </View>
            )}
          </>
        )}
      </View>
    </DummyFlatList>
  );

  const renderScene = SceneMap({
    first: Riwayat,
    second: Promo
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Inbox" },
    { key: "second", title: "Promo" }
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={neutralColorText[100]}
      inactiveColor={neutralColorText[50]}
      indicatorStyle={{ backgroundColor: primaryColor.main }}
      style={{ backgroundColor: neutralColor[10] }}
      labelStyle={{
        fontSize: 20,
        fontWeight: "700",
        textTransform: "capitalize"
      }}
    />
  );

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
        <HeaderNotification navigation={navigation} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
      </SkeletonContent>
    </Base>
  );
}
