import { ChevronLeft, ChevronRight } from "@assets";
import {
  Base,
  ButtonIcon,
  DummyFlatList,
  Gap,
  ReadingHeader,
  TextItem,
} from "@components";
import { neutralColor, spacing as sp } from "@constants";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderStateProps } from "../../components/atom/Base/types";
import { logger } from "../../helpers/helper";
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
];

const Reading = ({ navigation }: ReadingProps) => {
  const customComp = () => (
    <ReadingHeader
      title={"Bab 3: Tak Pernah Cukup Untuk Hidup Mandiri"}
      backPress={() => navigation.goBack()}
      dotPress={() => logger("Reading, dotPress")}
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
      </DummyFlatList>
    </Base>
  );
};

export default Reading;
