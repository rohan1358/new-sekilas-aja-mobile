import React, { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { fetchProfile } from "../../services";
import { Base, Button, DummyFlatList, Gap, TextItem } from "../../components";
import {
  BookTile,
  HomeHeader,
  ImageBanner,
  MiniCollectionTile,
  OngoingTile,
} from "../../components/organism";
import { primaryColor, spacing as sp, strings } from "../../constants";
import { logger } from "../../helpers/helper";
import { dummyBanner } from "./dummy";
import styles from "./styles";

const Home = () => {
  const getProfile = async () => {
    await fetchProfile("fennarex@gmail.com");
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Base barColor={primaryColor.main}>
      <DummyFlatList>
        <HomeHeader
          name="Taufan"
          uri=""
          onBellPress={() => logger("bell pressed")}
        />
        <View>
          <View style={styles.dummyHeader} />
          <OngoingTile bookTitle="The Design of Everyday Thinking" bookUri="" />
        </View>
        <View style={styles.adjuster}>
          <Gap horizontal={sp.sl * 2}>
            <TextItem type="b.24.nc.90">{strings.weekNewCollection}</TextItem>
          </Gap>
          <Gap vertical={sp.sm} />
          <FlatList
            contentContainerStyle={styles.newCollectionContentContainerStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dummyBanner}
            renderItem={({ item }) => (
              <View style={styles.newCollectionContainer}>
                <ImageBanner placeholder={item.placeholder} />
                <Gap horizontal={sp.m} />
              </View>
            )}
            keyExtractor={({ id }) => `${id}`}
          />
          <Gap vertical={sp.m} />
          <Gap horizontal={sp.sl * 2}>
            <TextItem type="b.24.nc.90">{strings.bookCollections}</TextItem>
            <TextItem type="r.14.nc.70">{strings.bookCollectionsDesc}</TextItem>
          </Gap>
          <Gap vertical={sp.sm} />
          <Gap horizontal={sp.sl * 2}>
            <MiniCollectionTile
              title="10 Kilas buku"
              subtitle="Pengembangan Diri"
              bookCount={10}
            />
          </Gap>
          <Gap vertical={sp.sl} />
          <View style={styles.clickTitle}>
            <TextItem type="b.24.nc.90">{strings.recommendedBook}</TextItem>
            <Gap horizontal={20} />
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underline}>
                {strings.seeAll}
              </TextItem>
            </Button>
          </View>
          <Gap vertical={sp.sm} />
          <Gap horizontal={sp.sl * 2}>
            <BookTile
              title="Rework"
              author={`David H. H. & Jason F.`}
              duration={10}
            />
          </Gap>
          <Gap vertical={sp.sl} />
          <View style={styles.clickTitle}>
            <TextItem type="b.24.nc.90" style={{ flex: 1.25 }}>
              {strings.mostRead}
            </TextItem>
            <Gap horizontal={20} />
            <Button>
              <TextItem type="b.14.nc.90" style={styles.underline}>
                {strings.seeAll}
              </TextItem>
            </Button>
          </View>
          <Gap vertical={sp.sm} />
          <Gap horizontal={sp.sl * 2}>
            <BookTile
              title="Rework"
              author={`David H. H. & Jason F.`}
              duration={10}
            />
          </Gap>
        </View>
      </DummyFlatList>
    </Base>
  );
};

export default Home;
