import React, { useEffect, useRef, useState } from "react";
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
import {
  primaryColor,
  spacing as sp,
  strings,
  snackState as ss,
} from "../../constants";
import { logger } from "../../helpers/helper";
import { dummyBanner } from "./dummy";
import styles from "./styles";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import {
  fetchMostBooks,
  fetchReadingBook,
  fetchRecommendedBooks,
} from "../../services/books";

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
            <FlatList
              data={recommendedBooks}
              keyExtractor={({ id }) => `${id}`}
              numColumns={2}
              renderItem={({ item }) => (
                <BookTile
                  title={item?.book_title}
                  author={`${item?.author}`}
                  duration={item?.read_time}
                />
              )}
              columnWrapperStyle={{ justifyContent: "space-between" }}
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
              keyExtractor={({ id }) => `${id}`}
              numColumns={2}
              renderItem={({ item }) => (
                <BookTile
                  title={item?.book_title}
                  author={`${item?.author}`}
                  duration={item?.read_time}
                />
              )}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </Gap>
        </View>
      </DummyFlatList>
    </Base>
  );
};

export default Home;
