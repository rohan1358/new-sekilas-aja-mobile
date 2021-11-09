import { Base, Button, DummyFlatList, ProfileHeader, TextItem } from '../../components'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { pages, primaryColor, skeleton, snackState as ss, strings } from '@constants';
import styles from './styles'
import { EditGray } from '@assets';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducers';

export default function Profile({ navigation }: any) {
  
  const {
    editProfile: { nama, email, password },
  } = useSelector((state: ReduxState) => state);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(nama)

  // const [name, setname] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

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
    </Base>
  )
}