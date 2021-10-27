import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Base, Gap, TextItem } from "../../components";
import {
  HomeHeader,
  ImageBanner,
  OngoingTile,
} from "../../components/organism";
import { primaryColor, spacing as sp } from "../../constants";
import { logger, widthPercent } from "../../helpers/helper";
import styles from "./styles";

const Home = () => {
  const ListHeaderComponent = (
    <>
      <HomeHeader
        name="Taufan"
        uri=""
        onBellPress={() => logger("bell pressed")}
      />
      <View>
        <View style={styles.dummyHeader} />
        <OngoingTile bookTitle="The Design of Everyday Thinking" bookUri="" />
      </View>
      <View style={{ top: -sp.m }}>
        <Gap horizontal={sp.sl * 2}>
          <TextItem type="b.24.nc.90">Kilas Baru minggu ini!</TextItem>
        </Gap>
        <Gap vertical={sp.sm} />
        <FlatList
          contentContainerStyle={styles.newCollectionContentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]}
          renderItem={() => (
            <View style={styles.newCollectionContainer}>
              <ImageBanner />
              <Gap horizontal={sp.m} />
            </View>
          )}
          keyExtractor={(item) => `${item}`}
        />
      </View>
    </>
  );
  return (
    <Base barColor={primaryColor.main}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={ListHeaderComponent}
      />
    </Base>
  );
};

export default Home;
