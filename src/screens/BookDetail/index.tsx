import { Amage, Base, Button, DummyFlatList, HeaderBookDetail, Rating, TextItem } from '../../components';
import { neutralColor, primaryColor, snackState as ss, strings } from '@constants';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import { Bank, ChevronRight, Clock, File, Headphones, Sunrise, Video } from '@assets';
import { daftarIsi } from './dummy';

export default function BookDetail({ navigation, route }: any) {
    
  const { item } = route.params
    
    // console.log(item)

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [allInfo, setAllInfo] = useState(false)

    return (
      <Base
        barColor={primaryColor.main}
        snackState={snackState}
        setSnackState={setSnackState}
      >
        <HeaderBookDetail
          navigation={navigation}
        />
        <DummyFlatList>
          <View style={styles.layer}>
            <View style={styles.head}>
              <View style={styles.boxImage}>
                <Amage style={styles.image} source={item.book_cover} resizeMode="contain" />
              </View>
            </View>
          </View>
          <View style={styles.boxSelect}>
            <View style={styles.SelectBar}>
              <Button style={styles.btnBar}>
                <File />
                <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
              </Button>
              <Button style={styles.btnBar}>
                <Headphones />
                <TextItem style={styles.titleSelect}>{strings.dengar}</TextItem>
              </Button>
              <Button style={styles.btnBar}>
                <Video />
                <TextItem style={styles.titleSelect}>{strings.tonton}</TextItem>
              </Button>
            </View>
          </View>
          <View style={styles.sectionDetail}>
            <View style={styles.boxTitle}>
              <TextItem style={styles.titleBook}>{item.book_title}</TextItem>
              <TextItem style={styles.titleOuthor}>{item.author}</TextItem>
              <View style={styles.info}>
                <Clock style={styles.iconInfo} />
                <View style={styles.boxTextInfo}>
                  <TextItem style={styles.textInfo}>{'17 mnt'}</TextItem>
                </View>
                <Sunrise style={styles.iconInfo} />
                <View style={styles.boxTextInfo}>
                  <TextItem style={styles.textInfo}>{'20 wawasan'}</TextItem>
                </View>
              </View>
            </View>

            <View style={styles.sectionList}>
              <TextItem style={styles.titleSection}>{strings.kategori}</TextItem>
              <View style={{flexDirection:'row'}}>
                <View style={styles.boxTextKategori}>
                  <TextItem style={styles.textKategori}>{'Keuangan & Investasi '}</TextItem>
                  <Bank />
                </View>
              </View>
            </View>

            <View style={styles.sectionList}>
              <TextItem style={styles.titleSection}>{strings.tentang_buku}</TextItem>
              <View style={styles.boxTextTentang}>
                <TextItem style={styles.textTentang}>{'The Psychology of Money adalah buku tentang psikologi dan perilaku manusia ketika berhadapan dengan uang, buku ini menyoroti mindset manusia saat mengelola keuangannya.'}</TextItem>
              </View>
              
              <View style={styles.boxTextTentang}>
                <Button onPress={()=> setAllInfo(!allInfo)}>
                  <TextItem style={styles.texttglRelease}>{allInfo ? strings.lebih_sedikit : strings.lebih_banyak}</TextItem>
                </Button>
              </View>
            </View>

            {
              allInfo &&
              <>
                <View style={styles.boxRelease}>
                  <View style={styles.boxTextTentang}>
                    <TextItem style={styles.texttglRelease}>{strings.tgl_release}</TextItem>
                    <TextItem style={styles.tgl}>{'8 September 2020'}</TextItem>
                    <TextItem style={styles.textpublikasi}>{strings.publikasi}{'Amerika Serikat'}</TextItem>
                  </View>
                  <View style={styles.listTentang}>
                    <TextItem style={styles.texttglRelease}>{strings.penulis}</TextItem>
                    <View style={styles.boxAvatar}>
                      <View style={styles.boxImageAvatar}>
                        <Amage style={styles.imageAvatar} resizeMode="contain" />
                      </View>
                      <View>
                        <TextItem style={styles.tgl}>{'Morgan Housel '}</TextItem>
                        <TextItem style={styles.textpublikasi}>{'Mitra di The Collaborative Fund'}</TextItem>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.boxDaftarIsi}>
                  <TextItem style={[styles.titleSection, styles.textDaftarIsi]}>{strings.daftar_isi}</TextItem>
                  <View style={styles.boxListDaftar}>
                    {
                      daftarIsi.map((item, index) => (
                        <Button key={index} style={styles.listDaftar}>
                          <TextItem style={styles.textDfatar}>{item.title}</TextItem>
                          <ChevronRight color={neutralColor[50]} />
                        </Button>
                      ))
                    }
                  </View>
                </View>

                <View>
                  <View style={styles.boxTitleUlasan}>
                    <TextItem style={styles.titleSection}>{strings.ulasan}</TextItem>
                    <Button>
                      <TextItem style={styles.textLihatSemua}>{strings.lihat_semua}</TextItem>
                    </Button>
                  </View>

                  <View style={styles.boxRating}>
                    <TextItem style={styles.textRating}>{'4,7'}</TextItem>
                    <Rating />
                  </View>
                </View>

              </>
            }

          </View>
        </DummyFlatList>
      </Base>
    )
}
