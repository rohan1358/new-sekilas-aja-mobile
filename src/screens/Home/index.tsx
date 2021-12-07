import {
  Base,
  BookTile,
  Button,
  DummyFlatList,
  Gap,
  HomeHeader,
  ImageBanner,
  MiniCollectionTile,
  ModalSubscribe,
  OngoingTile,
  TextItem,
} from "@components";
import {
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings,
} from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { logger } from "../../helpers/helper";
import { ReduxState } from "../../redux/reducers";
import {
  fetchMostBooks,
  fetchProfile,
  fetchReadingBook,
  fetchRecommendedBooks,
} from "../../services";
import { dummyBanner, dummyCollection } from "./dummy";
import styles from "./styles";

import { setProfileRedux } from "../../redux/actions";
import { SnackStateProps } from "../../components/atom/Base/types";
import { CompactBooksProps, HomeProps, ReadingBookProps } from "./types";

const Home = ({ navigation }: HomeProps) => {
  const {
    sessionReducer: { email },
  } = useSelector((state: ReduxState) => state);
  const isMounted = useRef<boolean>();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileProps>();
  const [readingBook, setReadingBook] = useState<ReadingBookProps>();
  const [mostReadBooks, setMostReadBooks] = useState<CompactBooksProps[]>();
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [modalAllPlan, setModalAllPlan] = useState(false);

  // console.log(profile)

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBanner placeholder={item.placeholder} />
      <Gap horizontal={sp.m} />
    </View>
  );

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => (
    <View>
      <BookTile
        title={item?.book_title}
        author={`${item?.author}`}
        duration={item?.read_time}
        cover={item?.book_cover}
        //@ts-ignore
        onPress={() => navigation.navigate(pages.BookDetail, { item })}
        //@ts-ignore
        navSubscrive={() => navigation.navigate(pages.Subscribe)}
        isVideoAvailable={item?.isVideoAvailable}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  const dummyMiniCollectionData = dummyCollection.map((item, index, value) => {
    if (index % 2 !== 0) {
      return;
    }
    return [item, value[index + 1]];
  });

  const dummyMiniCollectionKey = (item: any, index: number) =>
    !item ? `${item}${index}` : `${item[0].id}`;

  const dummyMiniCollectionRender = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    if (!item) {
      return null;
    }
    return (
      <View>
        {item.map((value: any) => (
          <View key={`${value.id}`}>
            <MiniCollectionTile
              key={`${value.id}${index}`}
              title={value.title}
              subtitle={value.category}
              bookCount={value.count}
              placeholder={value.placeholder}
            />
            <Gap vertical={sp.sm} />
          </View>
        ))}
      </View>
    );
  };

  const handleSub = ({ data }: any) => {
    const subsc = data?.is_subscribed;
    if (!subsc) {
      setModalAllPlan(true);
    }
  };

  const getHomeData = async () => {
    setIsLoading(true);
    try {
      const [profileData, readingData, recomData, mostBookData] =
        await Promise.all([
          fetchProfile(email),
          fetchReadingBook(email),
          fetchRecommendedBooks(),
          fetchMostBooks(),
        ]);
      if (!isMounted.current) {
        return;
      }
      if (profileData.isSuccess) {
        setProfile(profileData.data);
        dispatch(setProfileRedux(profileData.data));
        handleSub(profileData.data);
      } else {
        throw new Error("Fail on fetching profile data");
      }
      if (readingData.isSuccess) {
        setReadingBook(readingData.data);
      } else {
        throw new Error("Fail on fetching reading book data");
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data?.slice(0, 6));
      } else {
        throw new Error("Fail on fetching recommended books data");
      }
      if (mostBookData.isSuccess) {
        setMostReadBooks(mostBookData.data);
      } else {
        throw new Error("Fail on fetching most read books data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
      setIsLoading(false);
    }
  };

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  const onGoingPress = () =>
    !!readingBook?.available
      ? navigation.navigate("Reading", {
          id: readingBook?.book || "",
          page: `${parseInt(readingBook?.kilas || "1") - 1}`,
        })
      : navigation.navigate("MainBottomRoute", { screen: "Explore" });

  useEffect(() => {
    isMounted.current = true;

    getHomeData();

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
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainHome}
      >
        <DummyFlatList>
          <HomeHeader
            name={profile?.firstName}
            uri=""
            //@ts-ignore
            onBellPress={() => navigation.navigate(pages.Notification)}
            //@ts-ignore
            onPressProfile={() => navigation.navigate(pages.AccountSettings)}
          />
          <View>
            <View style={styles.dummyHeader} />
            <OngoingTile
              bookTitle={readingBook?.book}
              bookUri={readingBook?.book_cover}
              onPress={onGoingPress}
              isAvailable={!!readingBook?.available}
            />
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
              <TextItem type="r.14.nc.70">
                {strings.bookCollectionsDesc}
              </TextItem>
            </Gap>
            <Gap vertical={sp.sm} />
            <FlatList
              contentContainerStyle={styles.newCollectionContentContainerStyle}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyMiniCollectionData}
              renderItem={dummyMiniCollectionRender}
              keyExtractor={dummyMiniCollectionKey}
              listKey={"kilaslist"}
            />
            <Gap vertical={sp.sl} />
            <View style={styles.clickTitle}>
              <TextItem type="b.24.nc.90" style={{ flex: 1.25 }}>
                {strings.recommendedBook}
              </TextItem>
              <Gap horizontal={20} />
              <Button
                onPress={() =>
                  navigation.navigate("SpecialBookList", {
                    type: "recommendation",
                  })
                }
              >
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
          <Gap vertical={sp.xxl} />
        </DummyFlatList>
      </SkeletonContent>
      {/* <ModalSubscribe
        modalVisible={modalAllPlan}
        setModalVisible={setModalAllPlan}
      /> */}
    </Base>
  );
};

export default Home;
