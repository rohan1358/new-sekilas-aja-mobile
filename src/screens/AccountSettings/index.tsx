import { Base, Button, DummyFlatList, TextItem } from '../../components'
import { primaryColor, skeleton, snackState as ss, strings } from '@constants'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, StyleSheet, Switch, Text, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useSelector } from 'react-redux';
import AccountSettingsHeader from '../../components/organism/AccountSettingsHeader';
import { logger } from '../../helpers/helper';
import { ReduxState } from '../../redux/reducers';
import { fetchProfile } from '../../services';

import styles from './styles';
import { ChevronRight, Exit } from '@assets';

export default function AccountSettings({
  navigation
}: any) {

  const {
    sessionReducer: { email },
  } = useSelector((state: ReduxState) => state);

  const isMounted = useRef<boolean>();

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileProps>();
  const [language, setLanguage] = useState<string>('Indoneisa');
  const [modeOffline, setModeOffline] = useState(false);
  const [modeGelap, setModeGelap] = useState(false);
  
  const getDataAccount = async () => {
    setIsLoading(true)
    try {
      const [profileData] =
        await Promise.all([
          fetchProfile(email)
        ]);
      if (profileData.isSuccess) {
        setProfile(profileData.data);
        // console.log(profileData)
      } else {
        throw new Error("Fail on fetching profile data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isMounted.current = true
    getDataAccount();

    return () => {
      isMounted.current = false
    }

  },[])

  const handleLanguage = (lang :string) => {
    setLanguage(lang)
    setModalVisible(!modalVisible)
  }


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
            <TextItem type="b.24.nc.90" style={styles.title}>{strings.title_Account}</TextItem>
            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>{strings.berlangganan_Account}</TextItem>
              <View style={styles.list}>
                <TextItem style={styles.titleList}>{strings.tipeAkun_Account}</TextItem>
                <TextItem style={styles.textLevel}>{strings.premium_Account}</TextItem>
              </View>
              <View style={styles.list}>
                <TextItem style={styles.titleList}>{strings.masa_Account}</TextItem>
                <TextItem style={styles.textContent}>28 Oktober 2022</TextItem>
              </View>
              <Button style={styles.btnAction}>
                <TextItem type="r.16">{strings.btnBatal}</TextItem>
              </Button>
            </View>
            <View style={styles.listContent}>
              <TextItem type="b.16.nc.90" style={styles.subTitle}>{strings.preferensi_Account}</TextItem>
              <View style={[styles.list, styles.listPreferens]}>
                <View>
                  <TextItem style={styles.titleList}>{strings.bahasa}</TextItem>
                  <TextItem style={styles.textContent}>{strings.pilih_bahasa}</TextItem>
                </View>
                <Button onPress={()=> setModalVisible(!modalVisible)}>
                  <TextItem style={styles.language}>{language}</TextItem>
                </Button>
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>{strings.mode_offline}</TextItem>
                  <TextItem style={styles.textContent}>{strings.text_mode_offline}</TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={modeOffline ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>setModeOffline(!modeOffline)}
                  value={modeOffline}
                />
              </View>
              <View style={[styles.list, styles.listPreferens]}>
                <View style={styles.boxText}>
                  <TextItem style={styles.titleList}>{strings.mode_gelap}</TextItem>
                  <TextItem style={styles.textContent}>{strings.text_mode_gelap}</TextItem>
                </View>
                <Switch
                  trackColor={{ false: "#E3E8EF", true: "#464D6F" }}
                  thumbColor={modeGelap ? "#f5dd4b" : "#BBC0CE"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=> setModeGelap(!modeGelap)}
                  value={modeGelap}
                />
              </View>
              <Button style={[styles.list, styles.listPreferens]}>
                <View>
                  <TextItem style={styles.titleList}>{strings.notif}</TextItem>
                  <TextItem style={styles.textContent}>{strings.text_notif}</TextItem>
                </View>
                <ChevronRight/>
              </Button>
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
            <Button onPress={()=> setModalVisible(!modalVisible)} style={styles.btnExit}>
              <Exit />
            </Button>
            <TextItem>Pilih Bahasa</TextItem>
            <DummyFlatList>
              <TextItem style={styles.textLanguage} onPress={()=> handleLanguage('Indonesia')}>Indonesia</TextItem>
              <TextItem style={styles.textLanguage} onPress={()=> handleLanguage('English')}>English</TextItem>
            </DummyFlatList>
          </View>
        </View>
      </Modal>
    </Base>
  )
}