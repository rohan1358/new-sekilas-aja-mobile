import { Base, Button, DummyFlatList, TextItem } from "../../components";
import {
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  strings,
} from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Switch, Text, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import AccountSettingsHeader from "../../components/organism/AccountSettingsHeader";
import { logger } from "../../helpers";
import { ReduxState } from "../../redux/reducers";
import { fetchProfile } from "../../services";
import DropDownPicker from "react-native-dropdown-picker";

import styles from "./styles";
import {
  AlertModal,
  ChevronRight,
  Exit,
  IconFb,
  IconIg,
  IconTw,
} from "@assets";
import { loggingIn, setProfileRedux } from "../../redux/actions";
import { CommonActions } from "@react-navigation/routers";
import { SnackStateProps } from "../../components/atom/Base/types";

export default function AccountSettings({ navigation }: any) {
  const {
    sessionReducer: { email },
  } = useSelector((state: ReduxState) => state);

  const isMounted = useRef<boolean>();
  const dispatch = useDispatch();

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalAlert, setModalAlert] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileProps>();
  const [language, setLanguage] = useState<string>("Indoneisa");
  const [modeOffline, setModeOffline] = useState(false);
  const [modeGelap, setModeGelap] = useState(false);
  const [putarAudio, setPutarAudio] = useState(false);
  const [putarVideo, setPutarVideo] = useState(false);
  const [kualitasDown, setKualitasDown] = useState(false);
  const [keyAlert, setKeyAlert] = useState("");

  const [textAlert, setTextAlert] = useState({
    text: "",
    action: "",
    button: "",
  });

  const [openAudio, setOpenAudio] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const [valueAudio, setValueAudio] = useState(null);
  const [valueVideo, setValueVideo] = useState(null);

  const [itemsAudio, setItemsAudio] = useState([
    { label: "Tinggi", value: "tinggi" },
    { label: "Sedang", value: "sedang" },
    { label: "Rendah", value: "rendah" },
  ]);
  const [itemsVideo, setItemsVideo] = useState([
    { label: "Tinggi", value: "tinggi" },
    { label: "Sedang", value: "sedang" },
    { label: "Rendah", value: "rendah" },
  ]);

  const getDataAccount = async () => {
    setIsLoading(true);
    try {
      const [profileData] = await Promise.all([fetchProfile(email)]);
      if (profileData.isSuccess) {
        setProfile(profileData.data);
      } else {
        throw new Error("Fail on fetching profile data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getDataAccount();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLanguage = (lang: string) => {
    setLanguage(lang);
    setModalVisible(!modalVisible);
  };

  const handleModalAlert = (
    dataAlert = {
      text: "",
      action: "",
      button: "",
    }
  ) => {
    setModalAlert(!modalAlert);
    setTextAlert({
      text: dataAlert.text,
      action: dataAlert.action,
      button: dataAlert.button,
    });
  };

  const handlAlert = () => {
    switch (keyAlert) {
      case "logout":
        logOut();
        break;

      case "":
        setModalAlert(!modalAlert);
        break;

      default:
        break;
    }
  };

  const logOut = () => {
    setKeyAlert("");
    setModalAlert(!modalAlert);
    dispatch(loggingIn({ isLogin: false, email: "" }));
    dispatch(setProfileRedux(null));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: pages.SignIn }],
      })
    );
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
        <DummyFlatList>
          <AccountSettingsHeader
            navigation={navigation}
            uri=""
            name={profile?.firstName}
          />
          <View style={styles.sectionContent}>
            <TextItem type="b.24.nc.90" style={styles.title}>
              {strings.title_Account}
            </TextItem>

            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>
                {strings.berlangganan_Account}
              </TextItem>
              <View style={styles.list}>
                <TextItem style={styles.titleList}>
                  {strings.tipeAkun_Account}
                </TextItem>
                <TextItem style={styles.textLevel}>
                  {strings.premium_Account}
                </TextItem>
              </View>
              <View style={styles.list}>
                <TextItem style={styles.titleList}>
                  {strings.masa_Account}
                </TextItem>
                <TextItem style={styles.textContent}>28 Oktober 2022</TextItem>
              </View>
              <Button
                onPress={() =>
                  handleModalAlert({
                    text: strings.alert_text_langganan,
                    action: strings.alert_action,
                    button: strings.alert_button,
                  })
                }
                style={styles.btnAction}
              >
                <TextItem style={styles.textBtnBatal}>
                  {strings.btnBatal}
                </TextItem>
              </Button>
            </View>

            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>
                {strings.preferensi_Account}
              </TextItem>
              <View style={[styles.list, styles.listPreferens]}>
                <View>
                  <TextItem style={styles.titleList}>{strings.bahasa}</TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.pilih_bahasa}
                  </TextItem>
                </View>
                <Button onPress={() => setModalVisible(!modalVisible)}>
                  <TextItem style={styles.language}>{language}</TextItem>
                </Button>
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.mode_offline}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_mode_offline}
                  </TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={modeOffline ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setModeOffline(!modeOffline)}
                  value={modeOffline}
                />
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.mode_gelap}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.segera}
                  </TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={modeGelap ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setModeGelap(!modeGelap)}
                  value={modeGelap}
                />
              </View>
              <Button
                onPress={() => navigation.navigate("NotifSettings")}
                style={[styles.list, styles.listPreferens]}
              >
                <View>
                  <TextItem style={styles.titleList}>{strings.notif}</TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_notif}
                  </TextItem>
                </View>
                <ChevronRight color={neutralColor[50]} />
              </Button>
            </View>

            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>
                {strings.audio_Account}
              </TextItem>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>{strings.putar}</TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_putar}
                  </TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={putarAudio ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setPutarAudio(!putarAudio)}
                  value={putarAudio}
                />
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.kualitas}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_kualitas}
                  </TextItem>
                </View>
                <DropDownPicker
                  open={openAudio}
                  value={valueAudio}
                  items={itemsAudio}
                  setOpen={setOpenAudio}
                  setValue={setValueAudio}
                  setItems={setItemsAudio}
                  placeholder="Tinggi"
                  containerStyle={styles.containerDropdown}
                  style={styles.dropdown}
                  placeholderStyle={styles.textDropdown}
                  selectedItemLabelStyle={styles.textDropdown}
                  listMessageTextStyle={styles.textDropdown}
                  dropDownContainerStyle={styles.containerList}
                />
              </View>
            </View>

            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>
                {strings.video_Account}
              </TextItem>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.video_putar}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_putar_video}
                  </TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={putarVideo ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setPutarVideo(!putarVideo)}
                  value={putarVideo}
                />
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.kualitas_video}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_kualitas_video}
                  </TextItem>
                </View>
                <DropDownPicker
                  open={openVideo}
                  value={valueVideo}
                  items={itemsVideo}
                  setOpen={setOpenVideo}
                  setValue={setValueVideo}
                  setItems={setItemsVideo}
                  placeholder="Tinggi"
                  containerStyle={styles.containerDropdown}
                  style={styles.dropdown}
                  placeholderStyle={styles.textDropdown}
                  selectedItemLabelStyle={styles.textDropdown}
                  listMessageTextStyle={styles.textDropdown}
                  dropDownContainerStyle={styles.containerList}
                />
              </View>
            </View>

            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>
                {strings.download_Account}
              </TextItem>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.kualitas_download}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_kualitas_download}
                  </TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={kualitasDown ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setKualitasDown(!kualitasDown)}
                  value={kualitasDown}
                />
              </View>
              <View
                style={[
                  styles.list,
                  styles.listPreferens,
                  styles.boxHapusDownload,
                ]}
              >
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>
                    {strings.hapus_download}
                  </TextItem>
                  <TextItem style={styles.textContent}>
                    {strings.text_hapus_download}
                  </TextItem>
                </View>
                <Button
                  onPress={() =>
                    handleModalAlert({
                      text: strings.alert_text_hapus,
                      action: strings.alert_action_hapus,
                      button: strings.alert_button_hapus,
                    })
                  }
                >
                  <TextItem style={[styles.titleList, styles.textBtnHapus]}>
                    {strings.text_btn_hapus}
                  </TextItem>
                </Button>
              </View>
            </View>
            <Button
              onPress={() => {
                handleModalAlert({
                  text: strings.yakin_keluar,
                  action: strings.cacel,
                  button: strings.btn_keluar,
                });
                setKeyAlert("logout");
              }}
              style={styles.btnKeluar}
            >
              <TextItem type="b.18.nc.90">{strings.btn_keluar}</TextItem>
            </Button>
          </View>

          <View style={styles.sectionContent}>
            <TextItem type="b.24.nc.90" style={styles.title}>
              {strings.tentang}
            </TextItem>
            <Button
              style={[styles.list, styles.listPreferens, styles.boxTentang]}
            >
              <View style={styles.boxText}>
                <TextItem style={styles.titleList}>{strings.tentang}</TextItem>
                <TextItem style={styles.textContent}>
                  {strings.text_tentang}
                </TextItem>
              </View>
              <ChevronRight color={neutralColor[50]} />
            </Button>

            <Button
              onPress={() =>
                navigation.navigate(pages.About, { title: "Kebijakan Privasi" })
              }
              style={[styles.btnAction, styles.btnUp]}
            >
              <TextItem type="r.16.nc.90">{strings.btn_kebijakan}</TextItem>
            </Button>
            <Button
              onPress={() =>
                navigation.navigate(pages.About, { title: "Ketentuan Layanan" })
              }
              style={[styles.btnAction, styles.btnUp]}
            >
              <TextItem type="r.16.nc.90">{strings.btn_ketentuan}</TextItem>
            </Button>
            <Button style={styles.btnAction}>
              <TextItem type="r.16.nc.90">
                {strings.btn_berikan_ulasan}
              </TextItem>
            </Button>
          </View>

          <View style={styles.sectionContent}>
            <View style={[styles.list]}>
              <TextItem type="b.16.nc.90">{strings.textSosmed}</TextItem>
              <View style={styles.boxSosmed}>
                <IconFb />
                <IconIg />
                <IconTw />
              </View>
            </View>
          </View>
        </DummyFlatList>
      </SkeletonContent>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.btnExit}
            >
              <Exit />
            </Button>
            <TextItem>Pilih Bahasa</TextItem>
            <DummyFlatList>
              <Button
                style={styles.boxListLanguage}
                onPress={() => handleLanguage("Indonesia")}
              >
                <TextItem style={styles.textLanguage}>Indonesia</TextItem>
              </Button>
              <Button
                style={styles.boxListLanguage}
                onPress={() => handleLanguage("English")}
              >
                <TextItem style={styles.textLanguage}>English</TextItem>
              </Button>
            </DummyFlatList>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentAlert}>
            <DummyFlatList>
              <View style={styles.boxContentAlert}>
                <AlertModal />
                <TextItem style={styles.textAlert}>{textAlert.text}</TextItem>
              </View>
              <Button
                onPress={() => setModalAlert(!modalAlert)}
                style={styles.btnAlert}
              >
                <TextItem style={styles.textActionAlert}>
                  {textAlert.action}
                </TextItem>
              </Button>
              <Button
                onPress={() => handlAlert()}
                style={[styles.btnAlert, styles.btnAlertSecond]}
              >
                <TextItem style={styles.textButtonAlert}>
                  {textAlert.button}
                </TextItem>
              </Button>
            </DummyFlatList>
          </View>
        </View>
      </Modal>
    </Base>
  );
}
