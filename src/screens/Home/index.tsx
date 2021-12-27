import { setProfileRedux } from "@actions";
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
import { logger, useMounted } from "@helpers";
import messaging from "@react-native-firebase/messaging";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReduxState } from "@rux";
import {
  fetchMostBooks,
  fetchProfile,
  fetchReadingBook,
  fetchRecommendedBooks,
  modifyToken,
} from "@services";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "src/types";
import { SnackStateProps } from "../../components/atom/Base/types";
import { dummyBanner } from "./dummy";
import { dummyMiniCollectionData, pageParser } from "./helper";
import styles from "./styles";
import { HORIZONTAL_GAP } from "./values";

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isMounted = useMounted();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    sessionReducer: { email },
  } = useSelector((state: ReduxState) => state);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileProps>();
  const [readingBook, setReadingBook] = useState<ReadingBookProps>();
  const [mostReadBooks, setMostReadBooks] = useState<CompactBooksProps[]>();
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [modalAllPlan, setModalAllPlan] = useState(false);

  useEffect(() => {
    if (!profile?.id) return;
    messaging()
      .getToken()
      .then((FcmToken) => {
        return modifyToken({ FcmToken, id: profile?.id });
      });

    return messaging().onTokenRefresh((FcmToken) => {
      modifyToken({ FcmToken, id: profile?.id });
    });
  }, [profile]);

  useEffect(() => {
    getHomeData();
  }, []);

  useEffect(() => {
    isFocused && getReadingBook();
  }, [isFocused]);

  const s = styles({ isSubscribed: profile?.is_subscribed || false });

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={s.newCollectionContainer}>
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
        onPress={(id) => navigation.navigate(pages.BookDetail, { id })}
        //@ts-ignore
        navSubscrive={() => navigation.navigate(pages.Subscribe)}
        isVideoAvailable={item?.isVideoAvailable}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  const dummyMiniCollectionKey = (item: any, index: number) =>
    !item ? `${item}${index}` : `${item[0].id}`;

  const dummyMiniCollectionRender = ({
    item,
    index,
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
    if (data?.is_subscribed) return;
    setModalAllPlan(true);
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
      if (!isMounted) return;
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
        setRecommendedBooks(recomData.data?.slice(0, 4));
      } else {
        throw new Error("Fail on fetching recommended books data");
      }
      if (mostBookData.isSuccess) {
        setMostReadBooks(mostBookData.data?.slice(0, 2));
      } else {
        throw new Error("Fail on fetching most read books data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
      setIsLoading(false);
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

  const getProfile = async () => {
    setIsRefreshing(true);
    try {
      const { data, isSuccess } = await fetchProfile(email);
      if (!isMounted) return;
      if (!isSuccess) return;
      setProfile(data);
      dispatch(setProfileRedux(data));
    } catch (error) {
      logger("Home, getProfile", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  const onBellPress = () => navigation.navigate("Notification");

  const onGoingPress = () =>
    !!readingBook?.available
      ? navigation.navigate("Reading", {
          id: readingBook?.book || "",
          page: pageParser(readingBook?.kilas),
        })
      : navigation.navigate("MainBottomRoute", { screen: "Explore" });

  const onPressProfile = () => navigation.navigate("AccountSettings");

  const onPressRecommend = () =>
    navigation.navigate("SpecialBookList", {
      type: "recommendation",
    });

  const onMostReadPress = () =>
    navigation.navigate("SpecialBookList", {
      type: "mostRead",
    });

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      Promise.all([getProfile(), getReadingBook()]);
    } catch (error) {
      logger("onRefresh", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <SkeletonContent
        containerStyle={s.skeleton}
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
            <View style={s.dummyHeader} />
            <OngoingTile
              bookTitle={readingBook?.book}
              bookUri={readingBook?.book_cover}
              onPress={onGoingPress}
              isAvailable={!!readingBook?.available}
            />
          </View>
          <View style={s.adjuster}>
            <Gap horizontal={HORIZONTAL_GAP}>
              <TextItem type="b.24.nc.90">{strings.weekNewCollection}</TextItem>
            </Gap>
            <Gap vertical={sp.sm} />
            <FlatList
              contentContainerStyle={s.newCollectionContentContainerStyle}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyBanner}
              renderItem={bannerRenderItem}
              keyExtractor={idKeyExtractor}
              listKey={"bannerlist"}
            />
            <Gap vertical={sp.m} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <TextItem type="b.24.nc.90">{strings.bookCollections}</TextItem>
              <TextItem type="r.14.nc.70">
                {strings.bookCollectionsDesc}
              </TextItem>
            </Gap>
            <Gap vertical={sp.sm} />
            <FlatList
              contentContainerStyle={s.newCollectionContentContainerStyle}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyMiniCollectionData}
              renderItem={dummyMiniCollectionRender}
              keyExtractor={dummyMiniCollectionKey}
              listKey={"kilaslist"}
            />
            <Gap vertical={sp.sl} />
            <View style={s.clickTitle}>
              <TextItem type="b.24.nc.90" style={s.longTitle}>
                {strings.recommendedBook}
              </TextItem>
              <Gap horizontal={20} />
              <Button onPress={onPressRecommend}>
                <TextItem type="b.14.nc.90" style={s.underline}>
                  {strings.seeAll}
                </TextItem>
              </Button>
            </View>
            <Gap vertical={sp.sm} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <FlatList
                data={recommendedBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={s.columnWrapperStyle}
                listKey={"recommendedbooklist"}
              />
            </Gap>
            <Gap vertical={sp.sl} />
            <View style={s.clickTitle}>
              <TextItem type="b.24.nc.90" style={s.longTitle}>
                {strings.mostRead}
              </TextItem>
              <Gap horizontal={20} />
              <Button onPress={onMostReadPress}>
                <TextItem type="b.14.nc.90" style={s.underline}>
                  {strings.seeAll}
                </TextItem>
              </Button>
            </View>
            <Gap vertical={sp.sm} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <FlatList
                data={mostReadBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={s.columnWrapperStyle}
                listKey="mostreadbooklist"
              />
            </Gap>
          </View>
          <Gap vertical={sp.xxl} />
        </DummyFlatList>
      </SkeletonContent>
      <ModalSubscribe
        modalVisible={modalAllPlan}
        setModalVisible={setModalAllPlan}
      />
    </Base>
  );
};

export default Home;
