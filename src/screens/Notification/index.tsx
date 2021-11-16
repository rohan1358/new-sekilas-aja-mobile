import { Base, DummyFlatList, HeaderNotification, TextItem } from '../../components';
import React, { useState } from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
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
import { CardRiwayat, CardPromo } from '../../components/organism/PageNotification';

const dummyRiwayat = [
  {
    id: 1,
    title: 'Kilas Baru minggu ini!',
    text: 'The Psychology of Money adalah buku tentang keuangan yang ditulis oleh Morgan Housel, buku ini baru terbit pada 8 September 2020 yang lalu!',
    time: 'Notifikasi 1 jam yang lalu.',
    status: true,
  },
  {
    id: 2,
    title: 'Buku terpopuler minggu ini!',
    text: 'Start With Why adalah buku yang paling banyak dibaca pada minggu ini!',
    time: 'Notifikasi 5 hari yang lalu.',
    status: false,
  },
]

export default function Notification({navigation}: any) {

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const layout = useWindowDimensions();

  const Riwayat = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: 'white' }} >
      <View>
        {
          dummyRiwayat.map((item, index) => (
            <CardRiwayat
              key={index}
              item={item}
            />
          ))
        }
      </View>
    </DummyFlatList>
  );

  const Promo = () => (
    <DummyFlatList style={{ flex: 1, backgroundColor: 'white' }} >
      <View>
        <CardPromo />
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
          {/* <DummyFlatList>
          </DummyFlatList> */}
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
