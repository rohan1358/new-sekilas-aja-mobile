import {
  AboutHeader,
  Base,
  Button,
  DummyFlatList,
  TextItem,
} from "../../components";
import React, { useState } from "react";
import { Modal, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import {
  neutralColor,
  primaryColor,
  skeleton,
  snackState as ss,
  strings,
} from "@constants";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import styles from "./styles";

export default function NotifSettings({ navigation }: any) {
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifHarian, setNotifHarian] = useState<boolean>(false);
  const [notifPromo, setNotifPromo] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [jam, setJam] = useState("00");
  const [menit, setMenit] = useState("00");

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
        <DummyFlatList>
          <AboutHeader title="Pengaturan Notifikasi" navigation={navigation} />
          <View style={styles.sectionContent}>
            {/* <TextItem type="b.16.nc.90" style={styles.subTitle}>
              {strings.notif_sistem}
            </TextItem>
            <View style={[styles.list, styles.listPreferens]}>
              <View style={styles.boxText}>
                <TextItem style={styles.titleList}>
                  {strings.pengingat}
                </TextItem>
                <TextItem style={styles.textContent}>
                  {strings.text_pengingat}
                </TextItem>
              </View>
              <Switch
                trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                thumbColor={notifHarian ? "#f5dd4b" : "#BBC0CE"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNotifHarian(!notifHarian)}
                value={notifHarian}
              />
            </View>
            <View style={[styles.list, styles.listPreferens]}>
              <View style={styles.boxText}>
                <TextItem style={styles.textContent}>
                  {strings.ingatkan}
                </TextItem>
              </View>
              <Button onPress={() => setModalVisible(!modalVisible)}>
                <TextItem style={[styles.textContent, styles.textTime]}>
                  {jam + ":" + menit} PM
                </TextItem>
              </Button>
            </View> */}
            <TextItem type="b.16.nc.90" style={styles.subTitle}>
              {strings.notif_promo}
            </TextItem>
            <View style={[styles.list, styles.listPreferens]}>
              <View style={styles.boxText}>
                <TextItem style={styles.titleList}>
                  {strings.promo_voucher}
                </TextItem>
                <TextItem style={styles.textContent}>
                  {strings.text_promo}
                </TextItem>
              </View>
              <Switch
                trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                thumbColor={notifPromo ? "#f5dd4b" : "#BBC0CE"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNotifPromo(!notifPromo)}
                value={notifPromo}
              />
            </View>
          </View>
        </DummyFlatList>
      </SkeletonContent>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setJam(jam);
          setMenit(menit);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            <View style={styles.boxHeadModal}>
              <TextItem type="b.24.nc.90">{strings.jam}</TextItem>
              <TextItem type="b.24.nc.90">{strings.menit}</TextItem>
              <TextItem type="b.24.nc.90">{strings.zona}</TextItem>
            </View>
            <View style={[styles.boxHeadModal, styles.boxTime]}>
              <TextInput
                value={jam}
                placeholder="00"
                style={styles.textInput}
                selectionColor={neutralColor[90]}
                maxLength={2}
                keyboardType="number-pad"
                onChangeText={(e) => setJam(e)}
              />
              <TextItem type="b.32.nc.90">:</TextItem>
              <TextInput
                value={menit}
                placeholder="00"
                style={styles.textInput}
                selectionColor={neutralColor[90]}
                maxLength={2}
                keyboardType="number-pad"
                onChangeText={(e) => setMenit(e)}
              />
              <TextItem type="b.32.nc.90">{strings.wib}</TextItem>
            </View>
            <View style={[styles.boxHeadModal, styles.boxAction]}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.btnAction, styles.btnSimpan]}
              >
                <TextItem type="b.18.pc.main">{strings.btn_simpan}</TextItem>
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setJam(jam);
                  setMenit(menit);
                }}
                style={styles.btnAction}
              >
                <TextItem type="b.18.nc.50">{strings.btn_batal}</TextItem>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Base>
  );
}
