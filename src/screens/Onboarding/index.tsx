import React, { useRef, useState } from "react";
import { StatusBar, View, Dimensions, Text } from "react-native";
import styles from "./styles";
import { pages, primaryColor, spacing as sp, strings } from "../../constants";
import { Button, PagesOnboarding, TextItem } from "@components";
import { ScrollView } from "react-native-gesture-handler";
import { Arrowright, Hero1, Hero2, Hero3, Hero4 } from "@assets";
import { widthPercent } from "../../helpers";

const dataPage = [
  {
    image: Hero1,
    title: strings.onBoard_1,
    subTitle: strings.sub_onBoard_1
  },
  {
    image: Hero2,
    title: strings.onBoard_2,
    subTitle: strings.sub_onBoard_2
  },
  {
    image: Hero3,
    title: strings.onBoard_3,
    subTitle: strings.sub_onBoard_3
  },
  {
    image: Hero4,
    title: strings.onBoard_4,
    subTitle: strings.sub_onBoard_4
  }
];

const { width } = Dimensions.get("screen");

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
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor.main} barStyle="dark-content" />
      <View style={styles.content}>
        <ScrollView
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleSetIndex}
          scrollEnabled={false}
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
        <View style={styles.boxBtn}>
          {currentIndex == 0 ? (
            <Button onPress={() => handleNext()} style={styles.button}>
              <TextItem type="b.20" style={styles.textBtn}>
                {strings.button_onBoard_1}
              </TextItem>
            </Button>
          ) : (
            <View style={styles.boxBtnAction}>
              <Button onPress={() => navToSignIn()} style={styles.buttonLewati}>
                <TextItem type="b.20" style={styles.textBtnLewati}>
                  {strings.btnLewati}
                </TextItem>
              </Button>
              <Button onPress={() => handleNext()} style={styles.buttonLanjut}>
                <TextItem type="b.20" style={styles.textBtn}>
                  {strings.btnLanjut}
                </TextItem>
                <Arrowright style={styles.iconArrow} />
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
