import { Amage, Base, DummyFlatList, HeaderNotification, TextItem } from '../../components';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import styles from './styles';
import {
  colors,
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings,
} from "@constants";
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Card } from '../../components/organism/PageNotification';
import { NotifEmptyPng, PromoEmptyPng } from '@assets';
import {Notif1, Notif2} from '../../../assets/images'

// const dummyRiwayat = [
//   {
//     id: 1,
//     title: 'Kilas Baru minggu ini!',
//     text: 'The Psychology of Money adalah buku tentang keuangan yang ditulis oleh Morgan Housel, buku ini baru terbit pada 8 September 2020 yang lalu!',
//     time: 'Notifikasi 1 jam yang lalu.',
//     status: true,
//   },
//   {
//     id: 2,
//     title: 'Buku terpopuler minggu ini!',
//     text: 'Start With Why adalah buku yang paling banyak dibaca pada minggu ini!',
//     time: 'Notifikasi 5 hari yang lalu.',
//     status: false,
//   },
// ]

// const dummyPromo = [
//   {
//     id: 1,
//     title: 'DISKON AKHIR BULAN!!!',
//     text: 'Dapetin diskon sebesar 20% untuk berlangganan paket 1 Tahun di SekilasAja dengan menggunakan kode voucher ini, #BACAITUBAIK',
//     time: 'Notifikasi 15 menit yang lalu.',
//     status: true,
//     image: Notif1
//   },
//   {
//     id: 2,
//     title: 'Baca semua ringkasan buku dalam satu aplikasi!',
//     text: 'Dengan berlangganan hanya Rp25.000/Bulan  di SekilasAja kamu akan mendapatkan beragam pengetahuan!',
//     time: 'Notifikasi 7 hari yang lalu.',
//     status: false,
//     image: Notif2
//   },
// ]

const dummyRiwayat = []
const dummyPromo = []

export default function Notification({navigation}: any) {

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const layout = useWindowDimensions();

  const Riwayat = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: 'white' }} >
      <View>
        {
          dummyRiwayat.length > 0 ?
          dummyRiwayat.map((item, index) => (
            <Card
                key={index}
                item={item}
              />
            ))
            :
            <View style={styles.boxEmpty}>
              <View style={styles.riwayatEmpty}>
                <Image style={styles.imageEmpty} source={NotifEmptyPng} resizeMode="contain" />
              </View>
              <TextItem style={styles.notifEmpty}>{strings.notif_empty}</TextItem>
              <TextItem style={styles.tidak_ada_notif}>{strings.tidak_ada_notif}</TextItem>
            </View>
        }
      </View>
    </DummyFlatList>
  );

  const Promo = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: 'white' }} >
      <View>
        {
          dummyPromo.length > 0 ?
            dummyPromo.map((item, index) => (
              <Card
                key={index}
                item={item}
              />
            ))
            :
            <View style={styles.boxEmpty}>
              <View style={styles.riwayatEmpty}>
                <Image style={styles.imageEmpty} source={PromoEmptyPng} resizeMode="contain" />
              </View>
              <TextItem style={styles.notifEmpty}>{strings.promo_empty}</TextItem>
              <TextItem style={styles.tidak_ada_notif}>{strings.tidak_ada_promo}</TextItem>
            </View>
        }
      </View>
    </DummyFlatList>
  );

  const renderScene = SceneMap({
    first: Riwayat,
    second: Promo,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Riwayat' },
    { key: 'second', title: 'Promo' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={neutralColor[90]}
      inactiveColor={neutralColor[50]}
      indicatorStyle={{ backgroundColor: primaryColor.main }}
      style={{ backgroundColor: colors.white}}
      labelStyle={{ fontSize: 20, fontWeight: '700', textTransform:'capitalize' }}
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
          <HeaderNotification
            navigation={navigation}
          />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
          />
        </SkeletonContent>
      </Base>
    )
}
