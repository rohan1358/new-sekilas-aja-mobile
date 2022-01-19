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
import { formatDate } from "../../utils";
import ModalSubscribe from "./../../components/organism/ModalSubscribe/index";

export default function Notification({ navigation, route }: any) {
  const {
    notifRedux: { loading, listNotifPromo, listNotifInbox, contentNotif },
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenNotif = (data: any, type: any) => {
    notifHasOpen(data.id, data.users, email, type);
  };

  const { title, content, button, header, timestamp } = route.params;

  const { text, show, type, navigate } = button || {};

  const changeActionButton = () => {
    if (type === "modal") {
      setModalVisible(true);
    } else if (type === "navigate") {
      const { to, param } = navigate;
      navigation.navigate(to, param);
    }
  };

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
        <HeaderNotification navigation={navigation} title={header} />
        <View
          style={{
            flex: 1,
            marginTop: 10
          }}
        >
          <View
            style={{
              width: "90%",
              alignSelf: "center"
            }}
          >
            <Image style={styles.image} source={Notif2} />
            <TextItem type="i.15.nc.90" style={{ marginTop: 20 }}>
              {formatDate(timestamp.toDate(), "d-m-y")}
            </TextItem>

            <TextItem type="b.32.nc.90">{title}</TextItem>
            <TextItem type="r.20.nc.90" style={{ marginTop: 8 }}>
              {content}
            </TextItem>
            {show && (
              <TouchableOpacity
                onPress={() => changeActionButton()}
                style={styles.btnSubs}
              >
                <TextItem
                  type="b.24.nc.90"
                  style={{ color: "#FBCF32", fontWeight: "bold" }}
                >
                  {text}
                </TextItem>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SkeletonContent>
      <ModalSubscribe
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Base>
  );
}
