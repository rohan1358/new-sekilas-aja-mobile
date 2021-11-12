import { Base, Button, DummyFlatList, ProfileHeader, TextItem } from '../../components'
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { pages, primaryColor, skeleton, snackState as ss, strings } from '@constants';
import styles from './styles'
import { ChevronRight, EditGray } from '@assets';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducers';
import RBSheet from "react-native-raw-bottom-sheet";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export default function Profile({ navigation }: any) {

  const refRBSheet = useRef();
  
  const {
    editProfile: { nama, email, password },
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log(nama)

  const [imageUrl, setImageUrl] = useState(null);
  // const [name, setname] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');


  const handleImagePicker = (type: string) => {
    if (type == 'camera') {
      launchCamera({
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: true
      }, (callback) => {
        if (callback.errorCode === 'camera_unavailable') {
          setSnackState(ss.failState(strings.camera_unavailable));
          return;
        } else if (callback.errorCode === 'permission') {
          setSnackState(ss.failState(strings.permission));
          return;
        } else if (callback.errorCode === 'others') {
          setSnackState(ss.failState(strings.other));
          return;
        } else if (callback.didCancel) {
          console.log('camera cancel')
        } else {
          const base64 = { uri: 'data:image/jpeg;base64,' + callback.assets[0].base64 };
          setImageUrl(base64.uri)
          refRBSheet.current.close()
        }
      });
    } else {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: true
      }, (callback) => {
        if (callback.errorCode === 'camera_unavailable') {
          setSnackState(ss.failState(strings.camera_unavailable));
          return;
        } else if (callback.errorCode === 'permission') {
          setSnackState(ss.failState(strings.permission));
          return;
        } else if (callback.errorCode === 'others') {
          setSnackState(ss.failState(strings.other));
          return;
        } else if (callback.didCancel) {
          console.log('camera cancel')
        } else {
          const base64 = { uri: 'data:image/jpeg;base64,' + callback.assets[0].base64 };
          setImageUrl(base64.uri)
          refRBSheet.current.close()
        }
      })
    }
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
          <ProfileHeader
            navigation={navigation}
            onPress={() => refRBSheet.current.open()}
            uri={imageUrl}
          />
          <View style={styles.content}>
            <TextItem style={styles.title}>{strings.nama}</TextItem>
            <Button onPress={()=> navigation.navigate(pages.PageEditProfile, {type: 'nama', title: 'Ubah Nama'})} style={styles.boxItem}>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={nama}
              />
              <EditGray />
            </Button>
            <TextItem style={styles.title}>{strings.alamat}</TextItem>
            <Button onPress={()=> navigation.navigate(pages.PageEditProfile, {type: 'email', title: 'Ubah Email'})} style={styles.boxItem}>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={email}
                keyboardType='email-address'
              />
              <EditGray />
            </Button>
            <TextItem style={styles.title}>{strings.password}</TextItem>
            <Button onPress={()=> navigation.navigate(pages.PageEditProfile, {type: 'password', title: 'Ubah Password'})} style={styles.boxItem}>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={password}
                secureTextEntry={true}
              />
              <EditGray />
            </Button>
            <Button style={styles.btnKeluar}>
              <TextItem style={styles.title}>{strings.btn_keluar}</TextItem>
            </Button>
          </View>
        </DummyFlatList>
      </SkeletonContent>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }
        }}
        height={165}
      >
        <View style={styles.contaonerSheet}>
          <TextItem style={[styles.title, styles.titleGantiFoto]}>{strings.ganti_foto}</TextItem>
          <Button onPress={()=> handleImagePicker('camera')} style={styles.btnTakeAction}>
            <TextItem style={styles.textTake}>{strings.ambil_langsung}</TextItem>
            <ChevronRight />
          </Button>
          <Button onPress={()=> handleImagePicker('galery')} style={styles.btnTakeAction}>
            <TextItem style={styles.textTake}>{strings.ambil_galery}</TextItem>
            <ChevronRight />
          </Button>
        </View>
      </RBSheet>
    </Base>
  )
}