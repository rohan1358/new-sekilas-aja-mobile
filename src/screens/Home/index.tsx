import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Base, Button, DummyFlatList, Gap, TextItem } from "../../components";
import {
  BookTile,
  HomeHeader,
  ImageBanner,
  MiniCollectionTile,
  OngoingTile,
} from "../../components/organism";
import {
  primaryColor,
  snackState as ss,
  spacing as sp,
  strings,
} from "../../constants";
import { logger } from "../../helpers/helper";
import { ReduxState } from "../../redux/reducers";
import { fetchProfile } from "../../services";
import {
  fetchMostBooks,
  fetchReadingBook,
  fetchRecommendedBooks,
} from "../../services/books";
import { dummyBanner } from "./dummy";
import styles from "./styles";

const Home = () => {
  const {
    sessionReducer: { email },
  } = useSelector((state: ReduxState) => state);
  const isMounted = useRef<boolean>();

  const [profile, setProfile] = useState<ProfileProps>();
  const [readingBook, setReadingBook] = useState<string>();
  const [mostReadBooks, setMostReadBooks] = useState<CompactBooksProps[]>();
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBanner placeholder={item.placeholder} />
      <Gap horizontal={sp.m} />
    </View>
  );

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => (
    <BookTile
      title={item?.book_title}
      author={`${item?.author}`}
      duration={item?.read_time}
    />
  );

  const getProfile = async () => {
    try {
      const { data } = await fetchProfile(email);
      if (!isMounted.current) {
        return;
      }
      setProfile(data);
    } catch (error) {
      setSnackState(ss.failState("Kesalahan dalam mendapatkan profil"));
      logger("Home, getProfile", error);
    }
  };

  const getReadingBook = async () => {
    try {
      const { data } = await fetchReadingBook(email);
      if (!isMounted.current) {
        return;
      }
      setReadingBook(data);
    } catch (error) {
      setSnackState(
        ss.failState("Kesalahan dalam mendapatkan buku yang dibaca")
      );
      logger("Home, getReadingBook", error);
    }
  };

  const getRecommendedBooks = async () => {
    try {
      const { data } = await fetchRecommendedBooks();
      if (!isMounted.current) {
        return;
      }

      setRecommendedBooks(data);
    } catch (error) {
      logger("Home, getRecommendedBooks", error);
    }
  };

  const getMostReadBooks = async () => {
    try {
      const { data } = await fetchMostBooks();
      if (!isMounted.current) {
        return;
      }

      setMostReadBooks(data);
    } catch (error) {
      logger("Home, getMostReadBooks", error);
    }
  };

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  useEffect(() => {
    isMounted.current = true;

    getProfile();
    getReadingBook();
    getRecommendedBooks();
    getMostReadBooks();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <DummyFlatList>
        <HomeHeader
          name={profile?.firstName}
          uri=""
          onBellPress={() => logger("bell pressed")}
        />
        <View>
          <View style={styles.dummyHeader} />
          <OngoingTile bookTitle={readingBook} bookUri="" />
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
            renderItem={bannerRenderItem}
            keyExtractor={idKeyExtractor}
            listKey={"bannerlist"}
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
            <FlatList
              data={recommendedBooks}
              keyExtractor={idKeyExtractor}
              numColumns={2}
              renderItem={booksRenderItem}
              columnWrapperStyle={styles.columnWrapperStyle}
              listKey={"recommendedbooklist"}
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
            <FlatList
              data={mostReadBooks}
              keyExtractor={idKeyExtractor}
              numColumns={2}
              renderItem={booksRenderItem}
              columnWrapperStyle={styles.columnWrapperStyle}
              listKey="mostreadbooklist"
            />
          </Gap>
        </View>
      </DummyFlatList>
    </Base>
  );
};

export default Home;
