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
  TextItem,
  ImageBannerWebinar,
  WebinarSearch
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
import {
  useFocusEffect,
  useIsFocused,
  useNavigation
} from "@react-navigation/native";
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
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../types";
import { SnackStateProps } from "../../components/atom/Base/types";
import styles from "./styles";
import { HORIZONTAL_GAP } from "./values";
import { store } from "../../redux/store";
import { getLastReading } from "../../services/trackReading";
import { checkData } from "../../utils";
import {
  fetchNotifInbox,
  fetchNotifPrivate,
  fetchNotifPromo
} from "../../services/notification";
import { getAllMentoring } from "../../services/mentoring";

let mounted = false;

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
  const [modalAllPlan, setModalAllPlan] = useState(false);
  const [lastReading, setLastReading] = useState({ book: false });
  const [loading, setLoading] = useState(false);
  const [carousel, setCarousel] = useState(false);

  const [listMentoring, setListMentoring] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!mounted) {
        fetchListMentoring();
        mounted = true;
      }
      return () => {
        setListMentoring(false);
        setIsRefreshing(false);
        setIsLoading(false);
        mounted = false;
      };
    }, [mounted])
  );

  const fetchListMentoring = () => {
    getAllMentoring()
      .then((res) => {
        setListMentoring(res?.data);
        setIsRefreshing(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBannerWebinar
        dataUser={profileStore}
        openModal={() => setModalAllPlan(true)}
        data={item}
        placeholder={item.title}
        source={item.photo}
      />
      <Gap horizontal={sp.m} />
    </View>
  );

  const idKeyExtractor = ({
    coverImageLink
  }: {
    coverImageLink: string | number;
  }) => `${Math.random()}`;

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      Promise.all([fetchListMentoring()]);
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
            <View style={styles.headerContainer}>
              <Gap vertical={sp.sm} />
              <View style={styles.headerTitle}>
                <TextItem type="b.24.nc.90">{strings.groupMentoring}</TextItem>
                {/* <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button> */}
              </View>
              <Gap vertical={sp.sm} />
            </View>
            <SkeletonContent
              containerStyle={styles.skeleton}
              isLoading={isLoading}
              layout={skeleton.mainHome}
            >
              <DummyFlatList onRefresh={onRefresh} refreshing={isRefreshing}>
                <Gap vertical={sp.l} />

                {/* <HomeHeader
                  name={profile?.firstName}
                  uri=""
                  onBellPress={onBellPress}
                  onPressProfile={onPressProfile}
                /> */}

                {/* <View>
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
                </View> */}
                <View style={styles.adjuster}>
                  <SkeletonContent
                    layout={skeleton.componentBanner}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    {/* <Gap horizontal={HORIZONTAL_GAP}>
                      <TextItem type="b.24.nc.90">
                        {strings.webBinarMingguIni}
                      </TextItem>
                    </Gap> */}
                    <Gap vertical={sp.s} />

                    {checkData(listMentoring) && (
                      <FlatList
                        contentContainerStyle={
                          styles.newCollectionContentContainerStyle
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={listMentoring || []}
                        renderItem={bannerRenderItem}
                        keyExtractor={idKeyExtractor}
                        listKey={"bannerlist"}
                      />
                    )}
                  </SkeletonContent>

                  <Gap vertical={sp.m} />

                  <Gap vertical={sp.sm} />
                </View>

                {/* <View style={styles.adjuster}>
                  <SkeletonContent
                    layout={skeleton.componentBanner}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    <Gap horizontal={HORIZONTAL_GAP}>
                      <TextItem type="b.24.nc.90">
                        {strings.webBinarMingguIni}
                      </TextItem>
                      <TextItem type="r.15.nc.90">
                        {strings.webinarTertarik}
                      </TextItem>
                    </Gap>
                    <Gap vertical={sp.s} />

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

                  <Gap vertical={sp.sm} />
                </View> */}
                <Gap vertical={sp.xxl} />
              </DummyFlatList>
            </SkeletonContent>
          </Base>
        </>
      )}
      <ModalSubscribe
        modalVisible={modalAllPlan}
        setModalVisible={setModalAllPlan}
      />
    </>
  );
};

export default Home;
