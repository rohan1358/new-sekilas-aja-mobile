import {
  setBookRecomended,
  setListCategory,
  setMostReadBook,
  setProfileRedux
} from "@actions";
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
  TextItem
} from "@components";
import {
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings
} from "@constants";
import { logger, useMounted, widthPercent } from "@helpers";
import messaging from "@react-native-firebase/messaging";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReduxState } from "@rux";
import {
  fetchListCategory,
  fetchMostBooks,
  fetchProfile,
  fetchReadingBook,
  fetchRecommendedBooks,
  modifyToken
} from "@services";
import { fetchCarousel } from "../../services/bookContent";
import { newCategories } from "../../../assets/dummy";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import CategoryChips from "../../../src/components/organism/CategoryChips";
import { RootStackParamList } from "../../../src/types";
import { SnackStateProps } from "../../components/atom/Base/types";
import { dummyBanner } from "./dummy";
import { dummyMiniCollectionData, pageParser } from "./helper";
import styles from "./styles";
import { HORIZONTAL_GAP } from "./values";
import { store, persistor, mostBookStorage } from "../../redux/store";
import { getLastReading } from "../../services/trackReading";
import { checkData } from "../../utils";
import { useCallback } from "react";
import firestore from "@react-native-firebase/firestore";

const Home = () => {
  const profileStore = store.getState().editProfile.profile;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isMounted = useMounted();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    sessionReducer: { email },
    bookRedux: { bookRecomended, mostReadBook, listCategory },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [profiles, setProfile] = useState<ProfileProps>();
  const [readingBook, setReadingBook] = useState<ReadingBookProps>();

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [modalAllPlan, setModalAllPlan] = useState(true);
  const [lastReading, setLastReading] = useState({ book: false });
  const [loading, setLoading] = useState(false);
  const [carousel, setCarousel] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    if (profileStore && profileStore.is_subscribed) {
      setModalAllPlan(false);
    }

    if (!profiles?.id) return;
    messaging()
      .getToken()
      .then((FcmToken) => {
        return modifyToken({ FcmToken, id: profiles?.id });
      });

    return messaging().onTokenRefresh((FcmToken) => {
      modifyToken({ FcmToken, id: profiles?.id });
    });
  }, [profiles]);

  // useEffect(() => {
  //   getHomeData(false);
  // }, []);

  useEffect(() => {
    if (isFocused) {
      getReadingBook();
      getHomeData(false);
      fetchCategory();
    }
  }, [isFocused]);

  const fetchCategory = async () => {
    try {
      const list = await fetchListCategory();
      dispatch(setListCategory(list?.list));
    } catch {
      dispatch(setListCategory(false));
    }
  };

  useEffect(() => {
    fetchCarousel().then((res: any) => {
      setCarousel(res.data);
    });
  }, []);

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBanner
        data={item}
        placeholder={item.coverImageLink}
        source={item.coverImageLink}
      />
      <Gap horizontal={sp.m} />
    </View>
  );

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => {
    return (
      <View>
        <BookTile
          title={item?.book_title}
          author={`${item?.author}`}
          duration={item?.read_time}
          cover={item?.book_cover}
          //@ts-ignore
          onPress={(id) => {
            navigation.navigate("BookDetail", { id });
          }}
          //@ts-ignore
          navSubscrive={() => navigation.navigate("Subscribe")}
          isVideoAvailable={item?.isVideoAvailable}
        />

        <Gap vertical={sp.sl} />
      </View>
    );
  };

  const BooksRenderItem = ({ item }: { item: CompactBooksProps }) => {
    return (
      <View>
        <BookTile
          title={item?.book_title}
          author={`${item?.author}`}
          duration={item?.read_time}
          cover={item?.book_cover}
          //@ts-ignore
          onPress={(id) => {
            navigation.navigate("BookDetail", { id });
          }}
          //@ts-ignore
          navSubscrive={() => navigation.navigate("Subscribe")}
          isVideoAvailable={item?.isVideoAvailable}
        />

        <Gap vertical={sp.sl} />
      </View>
    );
  };

  const dummyMiniCollectionKey = (item: any, index: number) =>
    !item ? `${item}${index}` : `${item[0].id}`;

  const dummyMiniCollectionRender = ({
    item,
    index
  }: {
    item: any;
    index: number;
  }) => {
    if (!item) return null;

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

  const handleSub = (data: ProfileProps) => {
    if (data?.is_subscribed) {
      setModalAllPlan(false);
    }
  };

  const getHomeData = async (isRefresh: any) => {
    setIsLoading(true);

    if (!checkData(mostReadBook) || isRefresh) {
      try {
        // newLastRead
        // readingData
        const [profileData, recomData, mostBookData] = await Promise.all([
          fetchProfile(email, profile.id),
          // fetchReadingBook(email),
          fetchRecommendedBooks(),
          fetchMostBooks()
        ]);
        if (!isMounted) return;
        if (profileData.isSuccess) {
          setProfile({ ...profileData.data, statusFetch: true });
          dispatch(setProfileRedux(profileData.data));

          handleSub(profileData.data);
        } else {
          throw new Error("Fail on fetching profile data");
        }

        // if (readingData.isSuccess) {
        //   setReadingBook(readingData.data);
        // } else {
        //   throw new Error("Fail on fetching reading book data");
        // }
        if (recomData.isSuccess) {
          dispatch(setBookRecomended(recomData.data?.slice(0, 4)));
        } else {
          throw new Error("Fail on fetching recommended books data");
        }
        if (mostBookData.isSuccess) {
          dispatch(setMostReadBook(mostBookData.data?.slice(0, 4)));
        } else {
          throw new Error("Fail on fetching most read books data");
        }
        const newLastRead = await getLastReading(email);
        if (newLastRead.isSuccess) {
          setLastReading(newLastRead.data);
        }
      } catch (error) {
        logger("Home, getHomeData", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      const newLastRead = await getLastReading(email);
      if (newLastRead.isSuccess) {
        setLastReading(newLastRead.data);
      }
    }
  };

  const getReadingBook = async () => {
    try {
      const { data, isSuccess } = await fetchReadingBook(email);
      if (!isMounted) return;
      if (!isSuccess) return;
      setReadingBook(data);
    } catch (error) {
      logger("Home, getReadingBook", error);
    }
  };

  const idKeyExtractor = ({
    coverImageLink
  }: {
    coverImageLink: string | number;
  }) => `${Math.random()}`;

  const onBellPress = () => navigation.navigate("Notification");

  const onGoingPress = () => {
    !!lastReading?.book
      ? navigation.navigate("Reading", {
          id: lastReading?.book || "",
          page: pageParser(lastReading?.kilas)
        })
      : navigation.navigate("MainBottomRoute", { screen: "Explore" });
  };

  const onPressProfile = () => navigation.navigate("AccountSettings");

  const onPressRecommend = () =>
    navigation.navigate("SpecialBookList", {
      type: "recommendation"
    });

  const onMostReadPress = () =>
    navigation.navigate("SpecialBookList", {
      type: "mostRead"
    });

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      Promise.all([getHomeData(true)]);
    } catch (error) {
      logger("onRefresh", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      {profileStore && (
        <>
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
              <DummyFlatList onRefresh={onRefresh} refreshing={isRefreshing}>
                <HomeHeader
                  name={profile?.firstName}
                  uri=""
                  onBellPress={onBellPress}
                  onPressProfile={onPressProfile}
                />

                <View>
                  <View style={styles.dummyHeader} />
                  {isFocused ? (
                    <OngoingTile
                      bookTitle={lastReading?.book}
                      bookUri={lastReading?.book_cover}
                      onPress={onGoingPress}
                      isAvailable={checkData(lastReading?.book)}
                    />
                  ) : (
                    <ActivityIndicator color={primaryColor.main} />
                  )}
                </View>
                <View style={styles.adjuster}>
                  {/* <Gap horizontal={HORIZONTAL_GAP}>
              <TextItem type="b.24.nc.90">{strings.weekNewCollection}</TextItem>
            </Gap> */}
                  {/* <Gap vertical={sp.sm} /> */}
                  <SkeletonContent
                    layout={skeleton.componentBanner}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    {checkData(carousel) && (
                      <FlatList
                        contentContainerStyle={
                          styles.newCollectionContentContainerStyle
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={carousel || []}
                        renderItem={bannerRenderItem}
                        keyExtractor={idKeyExtractor}
                        listKey={"bannerlist"}
                      />
                    )}
                  </SkeletonContent>

                  <Gap vertical={sp.m} />
                  {/* <Gap horizontal={HORIZONTAL_GAP}>
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
            /> */}
                  <>
                    <Gap horizontal={HORIZONTAL_GAP}>
                      <TextItem type="b.24.nc.90">
                        {strings.bookCategory}
                      </TextItem>
                    </Gap>
                    <Gap vertical={sp.sm} />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View>
                        <SkeletonContent
                          layout={skeleton.componentCategory}
                          isLoading={!isFocused}
                          containerStyle={styles.skeleton}
                        >
                          <View style={styles.row}>
                            {checkData(listCategory) &&
                              listCategory
                                .slice(0, listCategory.length / 2 + 1)
                                .map((item: any, index: any) => {
                                  const onPress = (id: string) =>
                                    navigation.navigate("Category", {
                                      type: "category",
                                      title: item,
                                      payload: id
                                    });
                                  return (
                                    <CategoryChips
                                      onPress={onPress}
                                      index={index}
                                      item={{
                                        id: item,
                                        label: item,
                                        Icon: newCategories(item)
                                      }}
                                      key={index}
                                    />
                                  );
                                })}
                          </View>
                          <Gap vertical={sp.sm} />
                          <View style={styles.row}>
                            {listCategory &&
                              listCategory
                                .slice(
                                  listCategory.length / 2 + 1,
                                  listCategory.length
                                )
                                .map((item: any, index: any) => {
                                  const onPress = (id: string) =>
                                    navigation.navigate("Category", {
                                      type: "category",
                                      title: item,
                                      payload: id
                                    });
                                  return (
                                    <CategoryChips
                                      onPress={onPress}
                                      index={index}
                                      item={{
                                        id: item,
                                        label: item,
                                        Icon: newCategories(item)
                                      }}
                                      key={index}
                                    />
                                  );
                                })}
                          </View>
                        </SkeletonContent>
                      </View>
                    </ScrollView>
                  </>
                  <Gap vertical={sp.sl} />
                  <View style={styles.clickTitle}>
                    <TextItem type="b.24.nc.90" style={styles.longTitle}>
                      {strings.recommendedBook}
                    </TextItem>
                    <Gap horizontal={20} />
                    <Button onPress={onPressRecommend}>
                      <TextItem type="b.14.nc.90" style={styles.underline}>
                        {strings.seeAll}
                      </TextItem>
                    </Button>
                  </View>
                  <Gap vertical={sp.sm} />
                  <SkeletonContent
                    layout={skeleton.componentRecomended}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    <Gap horizontal={HORIZONTAL_GAP}>
                      {/* <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-between"
                        }}
                      >
                        {bookRecomended.map((item: any) => {
                          return (
                            <React.Fragment key={Math.random()}>
                              <BooksRenderItem item={item} />
                            </React.Fragment>
                          );
                        })}
                      </View> */}

                      <FlatList
                        data={bookRecomended}
                        keyExtractor={idKeyExtractor}
                        numColumns={2}
                        renderItem={booksRenderItem}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        listKey={"recommendedbooklist"}
                      />
                    </Gap>
                  </SkeletonContent>

                  <Gap vertical={sp.sl} />
                  <View style={styles.clickTitle}>
                    <TextItem type="b.24.nc.90" style={styles.longTitle}>
                      {strings.mostRead}
                    </TextItem>
                    <Gap horizontal={20} />
                    <Button onPress={onMostReadPress}>
                      <TextItem type="b.14.nc.90" style={styles.underline}>
                        {strings.seeAll}
                      </TextItem>
                    </Button>
                  </View>
                  <Gap vertical={sp.sm} />
                  <SkeletonContent
                    layout={skeleton.componentMostRead}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    <Gap horizontal={HORIZONTAL_GAP}>
                      {!loading && checkData(mostReadBook) && (
                        <FlatList
                          data={mostReadBook}
                          keyExtractor={idKeyExtractor}
                          numColumns={2}
                          renderItem={booksRenderItem}
                          columnWrapperStyle={styles.columnWrapperStyle}
                          listKey="mostreadbooklist"
                        />
                      )}
                    </Gap>
                  </SkeletonContent>
                </View>
                <Gap vertical={sp.xxl} />
              </DummyFlatList>
            </SkeletonContent>
            <ModalSubscribe
              modalVisible={modalAllPlan}
              setModalVisible={setModalAllPlan}
            />
          </Base>
        </>
      )}
    </>
  );
};

export default Home;
