import React, { useRef, useState } from "react";
import { StatusBar, View, Dimensions, Text } from "react-native";
import styles from "./styles";
import {
  colorTextButton,
  neutralColor,
  neutralColorButton,
  neutralColorText,
  pages,
  primaryColor,
  spacing as sp,
  strings
} from "../../constants";
import { Button, PagesOnboarding, TextItem } from "@components";
import { ScrollView } from "react-native-gesture-handler";
import { Arrowright, Hero1, Hero2, Hero3, Hero4 } from "@assets";
import { widthPercent } from "../../helpers";

const dataPage = [
  {
    image: Hero1,
    title: <>Aplikasi RANGKUMAN BUKU Terbaik Dunia!</>,
    subTitle: (
      <>
        Dapatkan <TextItem type="b.16.nct2.90">100+ RANGKUMAN BUKU</TextItem>{" "}
        terbaik dunia dalam versi{" "}
        <TextItem type="b.16.nct2.90">VIDEO, AUDIO, & TEKS.</TextItem>
      </>
    )
  },
  {
    image: Hero2,
    title: <>MEMBACA adalah {"\n"} habit orang sukses!</>,
    subTitle: (
      <>
        <TextItem type="b.16.nct2.90">CEO TERSUKSES</TextItem> di dunia,
        rata-rata membaca kurang lebih{" "}
        <TextItem type="b.16.nct2.90">60 BUKU</TextItem> dalam setahun.
      </>
    )
  },
  {
    image: Hero3,
    title: <>Solusi untuk kamu yang MALAS BACA!</>,
    subTitle: (
      <>
        Belajar rangkuman buku bisnis, investasi, kesehatan, dan pengembangan
        diri terbaik dunia hanya dalam{" "}
        <TextItem type="b.16.nct2.90">15 MENIT.</TextItem>
      </>
    )
  },
  {
    image: Hero4,
    title: <>Saatnya INVESTASI ILMU kepada dirimu!</>,
    subTitle: (
      <>
        Jadilah <TextItem type="b.16.nct2.90">VERSI TERBAIK</TextItem> dirimu
        dengan belajar{" "}
        <TextItem type="b.16.nct2.90">DI MANA PUN & KAPAN PUN</TextItem>
      </>
    )
  }
];

const { width } = Dimensions.get("window");

export default function Onboarding({ navigation }: any) {
  const scrollRef = useRef();
  const [currentIndex, setIndex] = useState(0);

  const handleSetIndex = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(contentOffset / widthPercent(100));
    setIndex(selectedIndex);
  };

  const handleNext = () => {
    if (currentIndex + 1 === dataPage.length) {
      navToSignIn();
    } else {
      setIndex(currentIndex + 1 === dataPage.length ? 0 : currentIndex + 1);
      scrollRef.current?.scrollTo({
        animatde: true,
        y: 0,
        x: currentIndex + 1 === dataPage.length ? 0 : width * (currentIndex + 1)
      });
    }
  };

  const navToSignIn = () => {
    navigation.replace(pages.SignIn);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: neutralColor[10]
        }
      ]}
    >
      <StatusBar backgroundColor={primaryColor.main} barStyle="dark-content" />
      <View style={styles.content}>
        <ScrollView
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleSetIndex}
          // scrollEnabled={false}
        >
          {dataPage.map((item, index) => {
            return (
              <PagesOnboarding
                key={index}
                image={item.image}
                title={item.title}
                subTitle={item.subTitle}
              />
            );
          })}
        </ScrollView>

        <View style={styles.boxBtn}>
          <View style={styles.boxCircle}>
            {dataPage.map((_, index) => {
              return (
                <View
                  key={index}
                  style={
                    currentIndex == index ? styles.circleActive : styles.circle
                  }
                />
              );
            })}
          </View>
          {currentIndex == 0 ? (
            <Button
              onPress={() => handleNext()}
              style={[
                styles.button,
                {
                  backgroundColor: neutralColorButton[80]
                }
              ]}
            >
              <TextItem
                type="b.20"
                style={{
                  color: colorTextButton[90]
                }}
              >
                {strings.button_onBoard_1}
              </TextItem>
            </Button>
          ) : (
            <View style={styles.boxBtnAction}>
              <Button onPress={() => navToSignIn()} style={styles.buttonLewati}>
                <TextItem type="b.20.cn.90" style={[styles.textBtnLewati]}>
                  {strings.btnLewati}
                </TextItem>
              </Button>
              <Button
                onPress={() => handleNext()}
                style={[
                  styles.buttonLanjut,
                  {
                    backgroundColor: neutralColorButton[80]
                  }
                ]}
              >
                <TextItem type="b.20.ncbtn.90">{strings.btnLanjut}</TextItem>
                <Arrowright
                  stroke={colorTextButton[90]}
                  // color={"black"}
                  // style={[styles.iconArrow]}
                />
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
