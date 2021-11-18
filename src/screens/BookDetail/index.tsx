import { Amage, Base, Button, CardComent, DummyFlatList, HeaderBookDetail, TextItem } from '../../components';
import { neutralColor, primaryColor, snackState as ss, strings } from '@constants';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { Bank, ChevronRight, Clock, File, Headphones, Sunrise, Video } from '@assets';
import { comentList, daftarIsi } from './dummy';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducers';

export default function BookDetail({ navigation, route }: any) {

  const {
    editProfile: { profile },
  } = useSelector((state: ReduxState) => state);
    
  const { item } = route.params
    
    // console.log(profile)

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [allInfo, setAllInfo] = useState(false)
  const [ratingCount, setRatingCount] = useState(4.5)

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
            </View>

            {
              allInfo &&
              <>
                <View style={styles.boxRelease}>
                  <TextItem style={styles.texttglRelease}>{strings.tgl_release}</TextItem>
                  <TextItem style={styles.tgl}>{'8 September 2020'}</TextItem>
                  <TextItem style={styles.textpublikasi}>{strings.publikasi}{'Amerika Serikat'}</TextItem>
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
                  
                  <View style={styles.containerRating}>
                    <View style={styles.boxRating}>
                      <TextItem style={styles.textRating}>{ratingCount.toString()}</TextItem>
                      <AirbnbRating
                        count={5}
                        defaultRating={ratingCount}
                        size={25}
                        showRating={false}
                        isDisabled={true}
                        selectedColor="#E27814"
                      />
                    </View>
                    <TextItem style={styles.textUlasanDari}>{strings.ulasan_dari + '183'+ strings.pembaca}</TextItem>
                  </View>
                  
                  <View style={styles.boxKomentar}>
                    <TextItem style={styles.textKomentar}>{strings.komentar}</TextItem>
                    {
                      comentList.map((item, index) => (
                        <CardComent
                          key={index}
                          name={item.name}
                          time={item.time}
                          text={item.text}
                          rating={item.rating}
                        />
                      ))
                    }
                  </View>
                </View>

                <View style={styles.sectionList}>
                  <TextItem style={styles.titleSection}>{strings.beri_ulasan}</TextItem>
                  <AirbnbRating
                    count={5}
                    defaultRating={0}
                    size={25}
                    showRating={false}
                    selectedColor="#E27814"
                    ratingContainerStyle={styles.containerRatingChange}
                    starContainerStyle={styles.starContainer}
                  />
                  <TextInput
                    placeholder='Isi ulasan di sini..'
                    style={styles.multipelTextInput}
                    multiline
                    textAlignVertical='top'
                  />
                  <Button style={styles.btnKirim}>
                    <TextItem style={styles.textBtn}>{strings.kirim}</TextItem>
                  </Button>
                </View>
              </>
            }

            <View style={styles.boxLihatLebih}>
              <Button onPress={()=> setAllInfo(!allInfo)}>
                <TextItem style={styles.texttglRelease}>{allInfo ? strings.lebih_sedikit : strings.lebih_banyak}</TextItem>
              </Button>
            </View>

          </View>
        </DummyFlatList>
      </Base>
    )
}
