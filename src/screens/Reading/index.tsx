import { ChevronLeft, ChevronRight, Headphones, Video } from "@assets";
import {
  AnimatedOverlay,
  Base,
  Button,
  ButtonIcon,
  DummyFlatList,
  Gap,
  ReadingHeader,
  TextItem,
} from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React, { useRef } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { HeaderStateProps } from "../../components/atom/Base/types";
import { heightPercent, logger, widthPercent } from "../../helpers/helper";
import styles from "./styles";
import { ReadingProps } from "./types";

const content = [
  {
    id: "foiwurasd",
    content: `Saya sering menulis bahwa keuangan pribadi adalah pribadi.`,
  },
  {
    id: "fasdfwerw",
    content: `Yang saya maksud dengan itu adalah bahwa apa yang mungkin menjadi keputusan keuangan yang baik bagi saya mungkin bukan keputusan keuangan yang baik bagi Anda. Itu tergantung pada keadaan pribadi Anda, tujuan, dan toleransi risiko.`,
  },
  {
    id: "q25afasdf",
    content: `Housel melakukan pekerjaan yang luar biasa untuk mengingatkan kita bahwa ekonomi juga bersifat pribadi.
    `,
  },
  {
    id: "fas224",
    content: `Yang saya maksud dengan itu adalah bahwa apa yang mungkin menjadi keputusan keuangan yang baik bagi saya mungkin bukan keputusan keuangan yang baik bagi Anda. Itu tergantung pada keadaan pribadi Anda, tujuan, dan toleransi risiko.`,
  },
  {
    id: "fas234saf",
    content: `Housel melakukan pekerjaan yang luar biasa untuk mengingatkan kita bahwa ekonomi juga bersifat pribadi.
    `,
  },
  {
    id: "234aas",
    content: `Yang saya maksud dengan itu adalah bahwa apa yang mungkin menjadi keputusan keuangan yang baik bagi saya mungkin bukan keputusan keuangan yang baik bagi Anda. Itu tergantung pada keadaan pribadi Anda, tujuan, dan toleransi risiko.`,
  },
  {
    id: "qwq23",
    content: `Housel melakukan pekerjaan yang luar biasa untuk mengingatkan kita bahwa ekonomi juga bersifat pribadi.
    `,
  },
];

const WIDTH = widthPercent(100);

const Reading = ({ navigation }: ReadingProps) => {
  const overlayRef = useRef<any>();
  const tipPosition = useSharedValue(-WIDTH / 2);

  const customComp = () => (
    <ReadingHeader
      title={"Bab 3: Tak Pernah Cukup Untuk Hidup Mandiri"}
      backPress={() => navigation.goBack()}
      dotPress={() => {
        tipPosition.value = withTiming(64);
        overlayRef.current?.open();
      }}
    />
  );

  const headerState: HeaderStateProps = {
    visible: true,
    type: "custom",
    customComp,
  };

  const keyExtractor = ({ id }: { id: string }) => `${id}`;

  const renderItem = ({ item }: { item: { content: string; id: string } }) => (
    <View>
      <TextItem type="r.16.nc.70">{item.content}</TextItem>
      <Gap vertical={sp.sm} />
    </View>
  );

  const tipStyle = useAnimatedStyle(() => ({ top: tipPosition.value }));

  return (
    <Base headerState={headerState}>
      <DummyFlatList contentContainerStyle={styles.contentContainerStyle}>
        <Gap vertical={sp.s} />
        <View style={styles.control}>
          <ButtonIcon>
            <ChevronLeft stroke={neutralColor[70]} />
          </ButtonIcon>
          <Gap horizontal={sp.s} />
          <TextItem type="r.16.nc.70">3 dari 20</TextItem>
          <Gap horizontal={sp.s} />
          <ButtonIcon>
            <ChevronRight stroke={neutralColor[70]} />
          </ButtonIcon>
        </View>
        <Gap vertical={36} />
        <TextItem type="b.32.nc.100">{`Bagi sebagian orang, ini adalah usia 20-an yang menderu. Bagi yang lain, ini adalah depresi hebat.`}</TextItem>
        <Gap vertical={sp.sl} />
        <FlatList
          data={content}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        <Gap vertical={sp.xxl} />
      </DummyFlatList>
      <Animated.View style={styles.actionWrapper}>
        <LinearGradient
          colors={["#fff1", "#fff8", "#fff"]}
          style={styles.linearGradient}
        ></LinearGradient>
        <View style={styles.actions}>
          <Button style={styles.button}>
            <Headphones stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem type="b.20.pc.main">{strings.listen}</TextItem>
          </Button>
          <Button style={styles.button}>
            <Video stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem type="b.20.pc.main">{strings.watch}</TextItem>
          </Button>
        </View>
        <Gap vertical={sp.sl} />
      </Animated.View>
      <AnimatedOverlay
        ref={overlayRef}
        onTap={() => (tipPosition.value = withTiming(-WIDTH / 2))}
      />
      <Animated.View style={[styles.tipContainer, tipStyle]}>
        <View style={styles.tip} />
        <View style={styles.tipContent}>
          <Button style={styles.tipButton}>
            <TextItem type="r.20.nc.90">{strings.share}</TextItem>
          </Button>
          <Button style={styles.tipButton}>
            <TextItem type="r.20.nc.90">{strings.tableOfContent}</TextItem>
          </Button>
        </View>
      </Animated.View>
    </Base>
  );
};

export default Reading;
