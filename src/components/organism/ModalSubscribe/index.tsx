import { ArrowLeft, Check, ChevronRight, ExitSubs } from "@assets";
import { firebaseNode, neutralColor, primaryColor, strings } from "@constants";
import { fetchProfileRealtime } from "@services";
import React, { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { widthPercent } from "../../../helpers";
import { Button, TextItem } from "../../atom";
import Payment from "../ChildModalSubs/Payment";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@rux";
import { Platform } from "react-native";
import { handleCloseModalSubscribe } from "@actions";

export default function ModalSubscribe({
  modalVisible,
  ...props
}: ModalSubscribeProps) {
  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();
  const setModalVisible = (param: any) => {
    dispatch(handleCloseModalSubscribe());
  };

  const refScroll = useRef();

  const [statusBest, setBest] = useState(true);
  const [paketList, setPaketList] = useState(false);

  const [statusNormal, setNormal] = useState(false);
  const [btnBack, setBtnBack] = useState(false);

  const handlePrev = (to: any) => {
    refScroll.current?.scrollTo({
      animatde: true,
      y: 0,
      x: widthPercent(to)
    });
  };
  const handleNext = (to: any) => {
    refScroll.current?.scrollTo({
      animatde: true,
      y: 0,
      x: widthPercent(to)
    });
  };

  const exitPage = () => {
    setModalVisible(false);
  };

  const handlePressCard = async (type: any) => {
    if (type == "best") {
      await setBest(true);
      await setNormal(false);
      handleNext(200);
    } else {
      await setNormal(true);
      await setBest(false);
      handleNext(200);
    }
  };

  useEffect(() => {
    const fetchProfileRealtime = async () => {
      const fetchPricing = await firestore().collection("pricing").get();
      const arrPromise: any = fetchPricing.docChanges().map((data) => {
        return { ...data.doc.data() };
      });

      setPaketList(arrPromise);

      try {
        await firestore()
          .collection(firebaseNode.users)
          .where("email", "==", email)
          .onSnapshot((res: any) => {
            if (res.docs[0]) {
              const result = res.docs[0].data();
              if (
                [
                  "/payment-success-mobile-three",
                  "/payment-success-mobile-twelve"
                ].includes(result.last_position_web_view)
              ) {
                setBtnBack(true);
              } else {
                setBtnBack(false);
              }
            }
          });
      } catch {
        return {};
      }
    };
    fetchProfileRealtime();
  }, []);

  let {
    kilas_buku,
    membuka_semua,
    bentuk_tersedia,
    artikel_pembelajaran,
    tergabung_komunitas
  } = strings;

  const liseKeuntungan = [
    kilas_buku,
    membuka_semua,
    bentuk_tersedia,
    artikel_pembelajaran,
    tergabung_komunitas
  ];

  const CardBest = ({ item }: any) => {
    return (
      <Button onPress={() => handlePressCard(item.type)} style={styles.card}>
        <View style={[styles.headCard, styles.backBlack]}>
          <TextItem type="b.14.nc.90" style={[styles.textBestValue]}>
            {strings.best_value}
          </TextItem>
        </View>
        <View style={[styles.contentCard, styles.boxBest]}>
          <TextItem type="b.18.nc.90">
            Paket {item.month + " " + strings.bulan}
          </TextItem>
          <TextItem style={[styles.price]}>
            <TextItem style={styles.textBold}>{`${strings.rp
              }${Intl.NumberFormat()?.format(item.harga)}`}</TextItem>
            {`/${strings.bulan}`}
          </TextItem>
          <TextItem style={[styles.hemat]}>{`${strings.hemat} ${strings.rp
            }${Intl.NumberFormat()?.format(item.hemat)}`}</TextItem>
          <TextItem type="n.14.nc.70" style={[styles.note]}>
            {strings.pembayaran_langsung + item.month + strings.didepan}
          </TextItem>
        </View>
        <View style={[styles.chevronRight, styles.bgYellow]}>
          <ChevronRight stroke={neutralColor[90]} width={50} height={50} />
        </View>
      </Button>
    );
  };

  const CardNormal = ({ item }: any) => {
    return (
      <Button
        onPress={() => handlePressCard(item.type)}
        style={[styles.card, styles.bgYellow]}
      >
        {/* <View
          style={[styles.headCard, statusNormal && styles.backWhite]}
        ></View> */}
        <View style={[styles.contentCard]}>
          <TextItem type="b.18.nc.90" style={styles.colorBlack}>
            Paket {item.month + " " + strings.bulan}
          </TextItem>
          <TextItem style={[styles.price]}>
            <TextItem style={styles.textBold}>{`${strings.rp
              }${Intl.NumberFormat()?.format(item.harga)}`}</TextItem>
            {`/${strings.bulan}`}
          </TextItem>
          <TextItem type="n.14.nc.70" style={[styles.note]}>
            {strings.pembayaran_langsung + item.month + strings.didepan}
          </TextItem>
        </View>
        <View style={styles.chevronRight}>
          <ChevronRight stroke={neutralColor[90]} width={50} height={50} />
        </View>
      </Button>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
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
          <ScrollView>
            <View style={styles.content}>
              <View
                style={
                  Platform.OS === "ios" ? styles.boxExitIos : styles.boxExit
                }
              >
                <Button
                  onPress={() => {
                    exitPage();
                  }}
                  style={[styles.btn, styles.btnClose]}
                >
                  <ExitSubs
                    // color={primaryColor.main}
                    stroke={"white"}
                    strokeWidth={3}
                  />
                </Button>
              </View>
              <View style={styles.boxContent}>
                <TextItem type="b.32.nc.90">
                  {strings.dapatkan_ringkasan}
                </TextItem>
                <TextItem type="r.20.nc.90" style={styles.subTextTitle}>
                  {strings.keuntungan}
                </TextItem>
                <View style={styles.boxWhite}>
                  {/* <View style={styles.list}>
                // <Check color={neutralColor[70]} />
                <TextItem type="r.16.nc.70" style={styles.textList}>
                  {strings.akses_online}
                </TextItem>
              </View> */}

                  {liseKeuntungan.map((txt) => {
                    return (
                      <View style={styles.list}>
                        {/* <Check color={neutralColor[70]} /> */}
                        <TextItem>✔️</TextItem>

                        <TextItem type="r.16.nc.70" style={styles.textList}>
                          {txt}
                        </TextItem>
                      </View>
                    );
                  })}

                  {/* <View style={styles.list}>
                    <Check color={neutralColor[70]} />
                    <TextItem type="r.16.nc.70" style={styles.textList}>
                    ✔️ {strings.belajar_live}
                    </TextItem>
                  </View> */}

                  {/* <View style={styles.list}>
                    // <Check color={neutralColor[70]} />
                    <TextItem type="r.16.nc.70" style={styles.textList}>
                      {strings.webinar_gratis}
                    </TextItem>
                  </View> */}

                  {/* <View style={styles.list}>
                    // <Check color={neutralColor[70]} />
                    <TextItem type="r.16.nc.70" style={styles.textList}>
                      {strings.rekaman_webinar}
                    </TextItem>
                  </View> */}
                </View>
                <Button
                  onPress={() => handleNext(100)}
                  style={[styles.btnPilih, styles.bgNc90]}
                >
                  <TextItem type="b.24.pc.main">{strings.pilih_paket}</TextItem>
                </Button>
              </View>
            </View>
          </ScrollView>

          <ScrollView>
            <View style={styles.content}>
              <View
                style={
                  Platform.OS === "ios" ? styles.boxBackIos : styles.boxBack
                }
              >
                <Button onPress={() => handlePrev(0)} style={styles.btn}>
                  <ArrowLeft color={neutralColor[90]} width={30} height={25} />
                </Button>
              </View>
              <View style={[styles.boxContent, styles.flex1]}>
                <TextItem type="b.32.nc.90">
                  {strings.pilih_paket_premium}
                </TextItem>
                <TextItem type="r.20.nc.90" style={styles.subTextTitle}>
                  {strings.pilihan_paket}
                </TextItem>
                <View style={styles.boxListCard}>
                  {Array.isArray(paketList) &&
                    paketList
                      .sort((a, b) => b.month - a.month)
                      .map((item, index) => {
                        if (item.open) {
                          return item.type == "best" ? (
                            <CardBest item={item} key={index} />
                          ) : (
                            <CardNormal item={item} key={index} />
                          );
                        }
                      })}
                </View>
                <View>
                  {/* <Button onPress={() => handleNext(200)} style={styles.btnPilih}>
                <TextItem type="b.24.pc.main">
                  {strings.langganan_sekaarang}
                </TextItem>
              </Button> */}

                  <Button onPress={() => exitPage()} style={styles.btnPilih}>
                    <TextItem type="b.24.nc.90">{strings.lagi_bokek}</TextItem>
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>

          <Payment
            baseUrl={
              statusBest ? "/payment-twelve-mobile/" : "/payment-three-mobile/"
            }
            handlePrev={handlePrev}
            email={email}
            btnBack={btnBack}
            handleClose={exitPage}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}
