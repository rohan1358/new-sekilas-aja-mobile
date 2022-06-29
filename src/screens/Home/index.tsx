import {
  openBottomTab,
  handleCloseModalSubscribe,
  closeBottomTab,
  setBookRecomended,
  setListCategory,
  setMostReadBook,
  setProfileRedux,
  setMyShorts
} from "@actions";
import { BookOpen, Mentor, ChallengeIcon, GroupDiscussionIcon } from "@assets";
import {
  AdaptiveText,
  Base,
  BookTile,
  Button,
  DummyFlatList,
  Gap,
  HomeHeader,
  ImageBanner,
  OngoingTile,
  ShortsTile,
  StoryShort,
  TextItem,
  ModalSubscribe
} from "@components";
import firestore from "@react-native-firebase/firestore";

import {
  dangerColor,
  neutralColor,
  neutralColorNormalKebalikan,
  neutralColorText,
  primaryColor,
  skeleton,
  snackState as ss,
  spacer,
  spacing as sp,
  strings,
  successColor,
  systemColor
} from "@constants";
import { logger, useMounted } from "@helpers";
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
  fetchShorts,
  modifyToken
} from "@services";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Linking
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { newCategories } from "../../../assets/dummy";
import CategoryChips from "../../../src/components/organism/CategoryChips";
import { RootStackParamList } from "../../../src/types";
import { SnackStateProps } from "../../components/atom/Base/types";
import { store } from "../../redux/store";
import { fetchCarousel } from "../../services/bookContent";
import {
  fetchNotifInbox,
  fetchNotifPrivate,
  fetchNotifPromo
} from "../../services/notification";
import { getLastReading } from "../../services/trackReading";
import { checkData } from "../../utils";
import { pageParser } from "./helper";
import styles from "./styles";
import { HORIZONTAL_GAP } from "./values";
import auth from "@react-native-firebase/auth";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const storyColors = [
  primaryColor.pressed,
  systemColor.hover,
  successColor.hover,
  dangerColor.hover
];

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isMounted = useMounted();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const storyRef = useRef<any>();

  const {
    sessionReducer: { email, isLogin },
    bookRedux: { bookRecomended, mostReadBook, listCategory },
    editProfile: { profile },
    shortsCOntext: { myShorts }
  } = useSelector((state: ReduxState) => state);

  const profileStore = profile;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [profiles, setProfile] = useState<ProfileProps>();
  const [readingBook, setReadingBook] = useState<ReadingBookProps>();

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const [lastReading, setLastReading] = useState({ book: false });
  const [loading, setLoading] = useState(false);
  const [carousel, setCarousel] = useState(false);

  const [currentStory, setCurrentStory] = useState<null | string>();
  const [shorts, setShorts] = useState<null | any[]>();
  const [shortsColor, setShortsColor] = useState<string>();

  const setModalAllPlan = (param: any) => {
    dispatch(handleCloseModalSubscribe());
  };

  const storyColorIndex = getRandomInt(0, 3);

  useEffect(() => {
    // auth()
    //   .currentUser?.updatePassword("testing")
    //   .then((res) => {
    //   })
    //   .catch((res) => {
    //   });

    fetchNotifPromo();
    fetchNotifInbox();
    fetchNotifPrivate();
    fetchCarousel().then((res: any) => {
      setCarousel(res.data);
    });
  }, []);

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
    if (isFocused && !checkData(listCategory)) {
      getReadingBook();
      getHomeData(false);
      fetchCategory();
    }
    dispatch(openBottomTab());
    getShorts();
  }, [isFocused]);

  const fetchCategory = async () => {
    try {
      const list = await fetchListCategory();
      if (!list?.list) return;
      dispatch(setListCategory(list?.list));
    } catch {
      dispatch(setListCategory(false));
    }
  };

  const getShorts = async () => {
    try {
      const { data, isSuccess } = await fetchShorts();
      if (!isSuccess) return;
      setShorts(data);
    } catch (error) {
      logger("Home, getShorts", error);
    }
  };

  const { width } = Dimensions.get("screen");

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      {/* @ts-ignore */}
      <ImageBanner
        data={item}
        placeholder={item.coverImageLink}
        source={item.coverImageLink}
      />
      <Gap horizontal={sp.m} />
    </View>
  );

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

  // const dummyMiniCollectionKey = (item: any, index: number) =>
  //   !item ? `${item}${index}` : `${item[0].id}`;

  // const dummyMiniCollectionRender = ({
  //   item,
  //   index
  // }: {
  //   item: any;
  //   index: number;
  // }) => {
  //   if (!item) return null;

  //   return (
  //     <View>
  //       {item.map((value: any) => (
  //         <View key={`${value.id}`}>
  //           <MiniCollectionTile
  //             key={`${value.id}${index}`}
  //             title={value.title}
  //             subtitle={value.category}
  //             bookCount={value.count}
  //             placeholder={value.placeholder}
  //           />
  //           <Gap vertical={sp.sm} />
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

  const handleSub = (data: ProfileProps) => {
    if (data?.is_subscribed) {
      setModalAllPlan(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      return () => {
        setLoading(true);
      };
    }, [])
  );

  const fetchMyShorts = (idUser?: any) => {
    return new Promise((resolve, reject) => {
      try {
        const newGroupArrays = (data: any) => {
          return new Promise((resolve) => {
            let results = Object.keys(data).map((books: any) => {
              let id_shorts = data[books].map((cb: any) => {
                return cb.id_shorts;
              });
              return {
                books,
                id_shorts,
                shorts: data[books],
                shorts_cover: data[books][0]["shorts_cover"]
              };
            });
            resolve(results);
          });
        };

        const newGroupingBook = (data: any) => {
          return new Promise((resolve) => {
            const groups = data.reduce((groups: any, shorts: any) => {
              const books = shorts.shorts_books;
              if (!groups[books]) {
                groups[books] = [];
              }
              groups[books].push(shorts);
              return groups;
            }, {});
            resolve(groups);
          });
        };

        const fireShorts = firestore().collection("myShorts");

        fireShorts.where("user", "==", idUser).onSnapshot((res) => {
          const results = res.docs.map((cb) => {
            return {
              ...cb.data(),
              id: cb.id
            };
          });
          newGroupingBook(results).then((res) => {
            newGroupArrays(res).then(async (cbGa) => {
              if (Array.isArray(cbGa)) {
                const resultsPromise = await Promise.all(
                  cbGa.map(async (data) => {
                    const shortList = await firestore()
                      .collection("books")
                      .doc(data.books)
                      .collection("shorts")
                      .where("kilas", "in", data.id_shorts)
                      .get()
                      .then((myShort: any) => {
                        const results = myShort.docs.map((cb: any) => {
                          return {
                            ...cb.data(),
                            id: cb.id
                          };
                        });

                        return results;
                      });

                    const results = {
                      book_title: data.books,
                      shorts: shortList,
                      book_cover: data.shorts_cover,
                      id: data.books
                    };

                    return results;
                  })
                );

                dispatch(setMyShorts(resultsPromise));
                resolve(resultsPromise);
              }
            });
          });
        });
      } catch {}
    });
  };

  useEffect(() => {
    if (profile.id) {
      fetchMyShorts(profile.id);
    }
  }, []);

  let mountedSnapshot = false;

  useEffect(() => {
    try {
      if (!mountedSnapshot && profileStore) {
        firestore()
          .collection("users")
          .doc(profile.id)
          .onSnapshot(async (res) => {
            // newLastRead
            // readingData
            const [profileData] = await Promise.all([
              fetchProfile(email, profile.id)
            ]);
            mountedSnapshot = true;
            if (profileData.isSuccess) {
              setProfile({ ...profileData.data, statusFetch: true });
              dispatch(setProfileRedux(profileData.data));

              handleSub(profileData.data);
            }
          });
      }
    } catch {}
  }, []);

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
      const newLastRead = await getLastReading(email);
      setIsLoading(false);

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
          //@ts-ignore
          id: lastReading?.book || "",
          //@ts-ignore
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
      getHomeData(true);
      getReadingBook();
      fetchCategory();
      getShorts();
    } catch (error) {
      logger("onRefresh", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  let open = true;

  let childMenu = [
    {
      label: "mentoring",
      text: <>Group{"\n"}Mentoring</>,
      icon: Mentor,
      route: "Mentoring"
    },
    {
      label: "blog",
      text: <>Artikel{"\n"}Pembelajaran</>,
      icon: BookOpen,
      route: "Blog"
    }
  ];

  let childMenuChallengeGroupDiscuss = [
    {
      label: "Challenge",
      text: <>Challenge</>,
      icon: ChallengeIcon,
      route: "Challenge"
    },
    {
      label: "Group Discuss",
      text: <>Grup Diskusi</>,
      icon: GroupDiscussionIcon,
      route: "Blog",
      linking: () => Linking.openURL("https://t.me/+Z4ZtzJ60MHc0YTUx")
    }
  ];

  const storyPress = async (title: string) => {
    dispatch(closeBottomTab(true));

    setShortsColor(storyColors[storyColorIndex]);

    setCurrentStory(title);
    storyRef.current?.open();
  };

  const closeStory = async () => {
    dispatch(openBottomTab());

    setShortsColor("");

    setCurrentStory("");
    storyRef.current?.close();
  };

  const onLastStoryPress = (id: string) =>
    navigation.navigate("BookDetail", { id });

  let freeShorts = shorts?.filter((data) =>
    profile.owned_books.includes(data.book_title)
  );
  let premiumShorts = shorts?.filter(
    (data) => !profile.owned_books.includes(data.book_title)
  );

  return (
    <>
      {profileStore && (
        <>
          <Base
            barColor={!currentStory ? primaryColor.main : shortsColor}
            snackState={snackState}
            setSnackState={setSnackState}
          >
            <SkeletonContent
              containerStyle={styles.skeleton}
              isLoading={isLoading || !isFocused}
              //@ts-ignore
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
                      //@ts-ignore
                      bookTitle={lastReading?.book}
                      //@ts-ignore
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
              <AdaptiveText type="text3xl/black" textColor={neutralColor["90"]}>{strings.weekNewCollection}</AdaptiveText>
            </Gap> */}
                  {/* <Gap vertical={sp.sm} /> */}
                  {open && (
                    <>
                      {checkData(carousel) && (
                        <FlatList
                          contentContainerStyle={
                            styles.newCollectionContentContainerStyle
                          }
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          //@ts-ignore
                          data={carousel || []}
                          renderItem={bannerRenderItem}
                          keyExtractor={idKeyExtractor}
                          listKey={"bannerlist"}
                        />
                      )}
                    </>
                  )}

                  <Gap vertical={sp.m} />
                  {/* <Gap horizontal={HORIZONTAL_GAP}>
              <AdaptiveText type="text3xl/black" textColor={neutralColor["90"]}>{strings.bookCollections}</AdaptiveText>
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

                  <Gap vertical={sp.m} />
                  <View style={styles.clickTitle}>
                    {childMenu.map((Cb) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            //@ts-ignore
                            navigation.navigate(Cb?.route || "Home");
                          }}
                          style={styles.btnNewMenu}
                        >
                          <View
                            style={[
                              styles.iconNewMenu,
                              {
                                backgroundColor: neutralColorNormalKebalikan[20]
                              }
                            ]}
                          >
                            <Cb.icon
                              width={width <= 320 ? 30 / 1.5 : 30}
                              height={width <= 320 ? 30 / 1.5 : 30}
                              stroke={neutralColorText[90]}
                            />
                          </View>
                          <TextItem
                            numberOfLines={2}
                            type={`b.${13}.nc.80`}
                            style={styles.textNewMenu}
                          >
                            {Cb.text}
                          </TextItem>
                        </TouchableOpacity>
                      );
                    })}

                    {/* <TouchableOpacity>
                      <TextItem>
                        {" "}
                        <BookOpen stroke={neutralColor[50]} /> SekilasAja Blog
                      </TextItem>
                    </TouchableOpacity> */}
                  </View>
                  <Gap vertical={spacer.xs} />
                  <View style={styles.clickTitle}>
                    {childMenuChallengeGroupDiscuss.map((Cb) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            Cb?.linking
                              ? Cb?.linking()
                              : navigation.navigate(Cb?.route || "Home");
                          }}
                          style={styles.btnNewMenu}
                        >
                          <View
                            style={[
                              styles.iconNewMenu,
                              {
                                backgroundColor: neutralColorNormalKebalikan[20]
                              }
                            ]}
                          >
                            <Cb.icon
                              width={width <= 320 ? 30 / 1.5 : 30}
                              height={width <= 320 ? 30 / 1.5 : 30}
                              stroke={neutralColorText[90]}
                            />
                          </View>
                          <TextItem
                            numberOfLines={2}
                            type={`b.${width <= 320 ? 13 / 1.1 : 13}.nc.80`}
                            style={styles.textNewMenu}
                          >
                            {Cb.text}
                          </TextItem>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Gap vertical={spacer.sl} />
                  {!!shorts && (
                    <>
                      <Gap horizontal={HORIZONTAL_GAP}>
                        <AdaptiveText
                          type="text3xl/black"
                          textColor={neutralColorText["90"]}
                        >
                          {"Sekilas Shorts"}
                        </AdaptiveText>
                      </Gap>
                      <Gap vertical={sp.m} />
                      <FlatList
                        data={[...freeShorts, ...premiumShorts]}
                        renderItem={({ item, index }) => (
                          <ShortsTile
                            index={index}
                            onPress={storyPress}
                            title={item?.book_title}
                            cover={item?.book_cover}
                          />
                        )}
                        keyExtractor={({ id }) => `${id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      />
                      <Gap vertical={sp.sl} />
                    </>
                  )}
                  {open && (
                    <>
                      <>
                        <Gap horizontal={HORIZONTAL_GAP}>
                          <AdaptiveText
                            type="text3xl/black"
                            textColor={neutralColorText["90"]}
                          >
                            {strings.bookCategory}
                          </AdaptiveText>
                        </Gap>
                        <Gap vertical={sp.sm} />
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          <View>
                            <>
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
                            </>
                          </View>
                        </ScrollView>
                      </>
                      <Gap vertical={sp.sl} />
                      <View style={[styles.clickTitle]}>
                        <View style={{ maxWidth: "60%" }}>
                          <AdaptiveText
                            type="text3xl/black"
                            textColor={neutralColorText["90"]}
                            // style={styles.longTitle}
                          >
                            {strings.recommendedBook}
                          </AdaptiveText>
                        </View>

                        <Gap horizontal={10} />
                        <Button onPress={onPressRecommend}>
                          <TextItem type="b.14.nc.90" style={styles.underline}>
                            {strings.seeAll}
                          </TextItem>
                        </Button>
                      </View>
                      <Gap vertical={sp.sm} />
                      <>
                        <Gap horizontal={HORIZONTAL_GAP}>
                          <View
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-between"
                            }}
                          >
                            {Array.isArray(bookRecomended) &&
                              bookRecomended.map((item: any) => {
                                return (
                                  <React.Fragment key={Math.random()}>
                                    <BooksRenderItem item={item} />
                                  </React.Fragment>
                                );
                              })}
                          </View>
                        </Gap>
                      </>
                      {/* most read */}
                      <>
                        <Gap vertical={sp.sl} />
                        <View style={[styles.clickTitle]}>
                          <View style={{ maxWidth: "60%" }}>
                            <AdaptiveText
                              textColor={neutralColorText["90"]}
                              type="text3xl/black"
                            >
                              {/* string paling banyak dibaca */}
                              Paling Banyak Dibaca
                            </AdaptiveText>
                          </View>
                          <Gap horizontal={10} />
                          <Button onPress={onMostReadPress}>
                            <TextItem
                              type="b.14.nc.90"
                              style={styles.underline}
                            >
                              {strings.seeAll}
                            </TextItem>
                          </Button>
                        </View>
                        <Gap vertical={sp.sm} />
                        <>
                          <Gap horizontal={HORIZONTAL_GAP}>
                            <View
                              style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between"
                              }}
                            >
                              {Array.isArray(mostReadBook) &&
                                mostReadBook.map((item: any) => {
                                  return (
                                    <React.Fragment key={Math.random()}>
                                      <BooksRenderItem item={item} />
                                    </React.Fragment>
                                  );
                                })}
                            </View>
                          </Gap>
                        </>
                      </>
                    </>
                  )}
                </View>
                <Gap vertical={sp.xxl} />
              </DummyFlatList>
            </SkeletonContent>

            <StoryShort
              ref={storyRef}
              onEnd={() => closeStory()}
              storyStatus={currentStory}
              storyData={shorts?.find(
                (item) => item?.book_title === currentStory
              )}
              color={shortsColor}
              onLastStoryPress={onLastStoryPress}
            />
          </Base>
        </>
      )}
    </>
  );
};

export default Home;
