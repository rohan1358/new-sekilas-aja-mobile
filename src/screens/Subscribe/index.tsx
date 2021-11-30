import { ArrowLeft, Check, Exit } from '@assets';
import { Button, Gap, TextItem } from '@components';
import { neutralColor, spacing, strings } from '@constants';
import React, { useRef } from 'react'
import { Modal, View, ScrollView } from 'react-native'
import { widthPercent } from '../../helpers/helper';
import paketList from './dummy';
import styles from './styles';

export default function Subscribe({ navigation, modalVisible, setModalVisible, ...props }: SubscribeProps) {
  
  const refScroll = useRef()


  const handlePrev = () => {
    refScroll.current?.scrollTo(
        {
            animatde: true,
            y: 0,
            x: 0,
        }
        );
  }
  const handleNext = () => {
    refScroll.current?.scrollTo(
        {
            animatde: true,
            y: 0,
            x: widthPercent(100),
        }
        );
  }

  const exitPage = () => {
    setModalVisible(!modalVisible)
  }
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //     setModalVisible(!modalVisible);
        // }}
        {...props}
      >
        <View style={styles.container}>
          <ScrollView
            ref={refScroll}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled={false}
          >

            <View style={styles.content}>
              <View style={styles.boxExit}>
                <Button onPress={()=> navigation.goBack()} style={styles.btn}>
                  <Exit />
                </Button>
              </View>
              <View style={styles.boxContent}>
                <TextItem type='b.32.nc.90'>{strings.dapatkan_ringkasan}</TextItem>
                <TextItem type='r.20.nc.70' style={styles.subTextTitle}>{strings.keuntungan}</TextItem>
                <View style={styles.boxWhite}>
                  <View style={styles.list}>
                    <Check color={neutralColor[70]} />
                    <TextItem type='r.16.nc.70' style={styles.textList}>{strings.akses_online}</TextItem>
                  </View>
                  <View style={styles.list}>
                    <Check color={neutralColor[70]} />
                    <TextItem type='r.16.nc.70' style={styles.textList}>{strings.akses_penuh}</TextItem>
                  </View>
                  <View style={styles.list}>
                    <Check color={neutralColor[70]} />
                    <TextItem type='r.16.nc.70' style={styles.textList}>{strings.membuka_semua}</TextItem>
                  </View>
                  <View style={styles.list}>
                    <Check color={neutralColor[70]} />
                    <TextItem type='r.16.nc.70' style={styles.textList}>{strings.kilas_buku}</TextItem>
                  </View>
                </View>
                <Button onPress={()=> handleNext()} style={styles.btnPilih}>
                    <TextItem type='b.24.pc.main'>{strings.pilih_paket}</TextItem>
                </Button>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.boxBack}>
                <Button onPress={()=> handlePrev()} style={styles.btn}>
                  <ArrowLeft color={neutralColor[90]} width={30} height={25} />
                </Button>
              </View>
              <View style={styles.boxContent}>
                <TextItem type='b.32.nc.90'>{strings.pilih_paket_premium}</TextItem>
                <TextItem type='r.20.nc.70' style={styles.subTextTitle}>{strings.pilihan_paket}</TextItem>
                <View style={styles.boxListCard}>
                  {
                    paketList.map((item, index) => (
                      <View key={index} style={styles.card}>
                        <View style={styles.headCard}>
                          {
                            item.type == 'best' &&
                          <TextItem type='b.14.pc.main'>{strings.best_value}</TextItem>
                          }
                          <TextItem type='b.20.c.white'>{item.mount+strings.bulan}</TextItem>
                        </View>
                        <View style={[styles.contentCard, item.type == 'normal' &&  styles.backWhite]}>
                          {
                            item.type == 'best' &&
                            <TextItem style={styles.hemat}>{`${strings.hemat} ${strings.rp} 249.000`}</TextItem>
                          }
                          <TextItem style={styles.price}><TextItem style={styles.textBold}>{`${strings.rp} ${item.harga}/ `}</TextItem>{`${strings.bulan}`}</TextItem>
                          <TextItem style={styles.note}>{strings.pembayaran_langsung+ item.mount +strings.didepan}</TextItem>
                        </View>
                      </View>
                    ))
                  }
                </View>
                <Button onPress={()=> exitPage()} style={styles.btnPilih}>
                    <TextItem type='b.24.pc.main'>{strings.langganan_sekaarang}</TextItem>
                </Button>
                <Button onPress={()=> exitPage()} style={styles.btnCancel}>
                    <TextItem type='b.24.nc.90'>{strings.lagi_bokek}</TextItem>
                </Button>
              </View>
            </View>

          </ScrollView>
        </View>
      </Modal>
    )
}
