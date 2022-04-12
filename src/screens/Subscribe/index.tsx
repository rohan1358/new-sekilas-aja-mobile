import { ArrowLeft, Check, Exit } from "@assets";
import { Button, Gap, TextItem } from "@components";
import { neutralColor, spacing, strings } from "@constants";
import React, { useRef, useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { widthPercent } from "../../helpers";
import paketList from "./dummy";
import styles from "./styles";

export default function Subscribe({ navigation }: SubscribeProps) {
  const refScroll = useRef();

  const [statusBest, setBest] = useState(false);
  const [statusNormal, setNormal] = useState(false);

  const handlePrev = () => {
    refScroll.current?.scrollTo({
      animatde: true,
      y: 0,
      x: 0
    });
  };
  const handleNext = () => {
    refScroll.current?.scrollTo({
      animatde: true,
      y: 0,
      x: widthPercent(100)
    });
  };

  const exitPage = () => {
    navigation.goBack();
  };

  const handlePressCard = (type) => {
    if (type == "best") {
      setBest(!statusBest);
      setNormal(false);
    } else {
      setNormal(!statusNormal);
      setBest(false);
    }
  };

  const CardBest = ({ item }: any) => {
    return (
      <Button onPress={() => handlePressCard(item.type)} style={styles.card}>
        <View style={[styles.headCard, statusBest && styles.backPrimaryColor]}>
          <TextItem
            style={[
              styles.textBestValue,
              statusBest && {
                color: neutralColor[90]
              }
            ]}
          >
            {strings.best_value}
          </TextItem>
          <TextItem
            type="b.20.c.white"
            style={
              statusBest && [
                {
                  color: neutralColor[90]
                }
              ]
            }
          >
            {item.mount + strings.bulan}
          </TextItem>
        </View>
        <View style={[styles.contentCard, statusBest && styles.backBlack]}>
          <TextItem
            style={[styles.hemat, statusBest && styles.colorPink]}
          >{`${strings.hemat} ${strings.rp} ${item.hemat}`}</TextItem>
          <TextItem
            style={[
              styles.price,
              {
                color: neutralColor[90]
              },
              statusBest && styles.colorPrimary
            ]}
          >
            <TextItem
              style={styles.textBold}
            >{`${strings.rp} ${item.harga}/ `}</TextItem>
            {`${strings.bulan}`}
          </TextItem>
          <TextItem style={[styles.note, statusBest && styles.colorWhite]}>
            {strings.pembayaran_langsung + item.mount + strings.didepan}
          </TextItem>
        </View>
      </Button>
    );
  };

  const CardNormal = ({ item }: any) => {
    return (
      <Button onPress={() => handlePressCard(item.type)} style={styles.card}>
        <View style={[styles.headCard, statusNormal && styles.backWhite]}>
          <TextItem
            type="b.20.c.white"
            style={
              statusNormal && {
                color: neutralColor[90]
              }
            }
          >
            {item.mount + strings.bulan}
          </TextItem>
        </View>
        <View
          style={[
            styles.contentCard,
            statusNormal ? styles.backBlack : styles.backWhite
          ]}
        >
          <TextItem
            style={[
              styles.price,
              {
                color: neutralColor[90]
              },
              statusNormal && styles.colorWhite
            ]}
          >
            <TextItem
              style={styles.textBold}
            >{`${strings.rp} ${item.harga}/ `}</TextItem>
            {`${strings.bulan}`}
          </TextItem>
          <TextItem style={[styles.note, statusNormal && styles.colorWhite]}>
            {strings.pembayaran_langsung + item.mount + strings.didepan}
          </TextItem>
        </View>
      </Button>
    );
  };

  return (
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
            <TextItem type="b.32.nc.90">{strings.dapatkan_ringkasan}</TextItem>
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
                  {strings.membuka_semua}
                </TextItem>
              </View>
            </View>
            <Button onPress={() => handleNext()} style={styles.btnPilih}>
              <TextItem type="b.24.pc.main">{strings.pilih_paket}</TextItem>
            </Button>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.boxBack}>
            <Button onPress={() => handlePrev()} style={styles.btn}>
              <ArrowLeft color={neutralColor[90]} width={30} height={25} />
            </Button>
          </View>
          <View style={styles.boxContent}>
            <TextItem type="b.32.nc.90">{strings.pilih_paket_premium}</TextItem>
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
            <Button onPress={() => exitPage()} style={styles.btnPilih}>
              <TextItem type="b.24.pc.main">
                {strings.langganan_sekaarang}
              </TextItem>
            </Button>
            <Button onPress={() => exitPage()} style={styles.btnCancel}>
              <TextItem type="b.24.nc.90">{strings.lagi_bokek}</TextItem>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
