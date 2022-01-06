import { ArrowLeft, Check, ChevronRight, Exit } from "@assets";
import { firebaseNode, neutralColor, strings } from "@constants";
import { fetchProfileRealtime } from "@services";
import React, { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { widthPercent } from "../../../helpers";
import { Button, TextItem } from "../../atom";
import Payment from "../ChildModalSubs/Payment";
import paketList from "./dummy";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { ReduxState } from "@rux";

export default function ModalSubscribe({
  modalVisible,
  setModalVisible,
  ...props
}: ModalSubscribeProps) {
  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const refScroll = useRef();

  const [statusBest, setBest] = useState(true);
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
    setModalVisible(!modalVisible);
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
      try {
        await firestore()
          .collection(firebaseNode.users)
          .where("email", "==", email)
          .onSnapshot((res: any) => {
            if (res.docs[0]) {
              const result = res.docs[0].data();
              if (result.last_position_web_view === "/payment-success-mobile") {
                setBtnBack(true);
              } else {
                setBtnBack(false);
              }
            }

            //if(result.)
            //if(res.docs[0].data())
          });
      } catch {
        return {};
      }
    };
    fetchProfileRealtime();
  }, []);

  const CardBest = ({ item }: any) => {
    return (
      <Button onPress={() => handlePressCard(item.type)} style={styles.card}>
        <View style={[styles.headCard, styles.backBlack]}>
          <TextItem style={[styles.textBestValue]}>
            {strings.best_value}
          </TextItem>
        </View>
        <View style={[styles.contentCard, styles.boxBest]}>
          <TextItem
            type="b.20.c.white"
            style={[styles.colorBlack, styles.month12]}
          >
            {item.mount + strings.bulan}
          </TextItem>
          <TextItem style={[styles.hemat]}>{`${strings.hemat} ${
            strings.rp
          }${Intl.NumberFormat()?.format(item.hemat)}`}</TextItem>
          <TextItem style={[styles.price]}>
            <TextItem style={styles.textBold}>{`${
              strings.rp
            }${Intl.NumberFormat()?.format(item.harga)}/`}</TextItem>
            {`${strings.bulan}`}
          </TextItem>
          <TextItem style={[styles.note]}>
            {strings.pembayaran_langsung + item.mount + strings.didepan}
          </TextItem>
        </View>
        <View style={[styles.chevronRight, styles.bgYellow]}>
          <ChevronRight color={"black"} width={50} height={50} />
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
          <TextItem type="b.20.c.white" style={styles.colorBlack}>
            {item.mount + strings.bulan}
          </TextItem>
          <TextItem style={[styles.price]}>
            <TextItem style={styles.textBold}>{`${
              strings.rp
            }${Intl.NumberFormat()?.format(item.harga)}/`}</TextItem>
            {`${strings.bulan}`}
          </TextItem>
          <TextItem style={[styles.note]}>
            {strings.pembayaran_langsung + item.mount + strings.didepan}
          </TextItem>
        </View>
        <View style={styles.chevronRight}>
          <ChevronRight color={"black"} width={50} height={50} />
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
        setModalVisible(!modalVisible);
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
          <View style={styles.content}>
            <View style={styles.boxExit}>
              <Button onPress={() => exitPage()} style={styles.btn}>
                <Exit />
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
                <Check color={neutralColor[70]} />
                <TextItem type="r.16.nc.70" style={styles.textList}>
                  {strings.akses_online}
                </TextItem>
              </View> */}
                <View style={styles.list}>
                  <Check color={neutralColor[70]} />
                  <TextItem type="r.16.nc.70" style={styles.textList}>
                    {strings.kilas_buku}
                  </TextItem>
                </View>
                <View style={styles.list}>
                  <Check color={neutralColor[70]} />
                  <TextItem type="r.16.nc.70" style={styles.textList}>
                    {strings.akses_penuh}
                  </TextItem>
                </View>
                <View style={styles.list}>
                  <Check color={neutralColor[70]} />
                  <TextItem type="r.16.nc.70" style={styles.textList}>
                    {strings.membuka_semua}
                  </TextItem>
                </View>
              </View>
              <Button onPress={() => handleNext(100)} style={styles.btnPilih}>
                <TextItem type="b.24.pc.main">{strings.pilih_paket}</TextItem>
              </Button>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.boxBack}>
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
                {paketList.map((item, index) =>
                  item.type == "best" ? (
                    <CardBest item={item} key={index} />
                  ) : (
                    <CardNormal item={item} key={index} />
                  )
                )}
              </View>
              <View>
                {/* <Button onPress={() => handleNext(200)} style={styles.btnPilih}>
                <TextItem type="b.24.pc.main">
                  {strings.langganan_sekaarang}
                </TextItem>
              </Button> */}
                <Button onPress={() => exitPage()} style={styles.btnPilih}>
                  <TextItem type="b.24.pc.main">{strings.lagi_bokek}</TextItem>
                </Button>
              </View>
            </View>
          </View>

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
