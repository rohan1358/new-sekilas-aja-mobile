import { CheckCircle, Headphones, Video } from "@assets";
import {
  AnimatedOverlay,
  Base,
  Button,
  DummyFlatList,
  DuoRender,
  EmptyPlaceholder,
  Gap,
  PageController,
  ReadingHeader,
  TextItem
} from "@components";
import {
  firebaseNode,
  neutralColor,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  spacing,
  strings
} from "@constants";
import { logger, useMounted, widthPercent } from "@helpers";
import firestore from "@react-native-firebase/firestore";
import {
  RouteProp,
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReduxState } from "@rux";
import {
  doneProgress,
  fetchBookContent,
  fetchDetailBooks,
  getBookCoverImageURL,
  getProgressByBook,
  trackProgress
} from "@services";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import ReactNative, { Share, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector } from "react-redux";
import { RootStackParamList } from "src/types";
import { adjust, checkData } from "../../utils";
import {
  HeaderStateProps,
  SnackStateProps
} from "../../components/atom/Base/types";
import styles from "./styles";
import { setTrackingLastReadLinten } from "../../services/trackReading";

const WIDTH = widthPercent(100);
const ACTION_HIDE = -128;

let newDetailBook = {},
  newContent: any = {},
  newCurrentPage = 1,
  page = 0,
  newListBookFinishingRead: any = [];

let newMaesure: any = [
  2183.636474609375, 2183.636474609375, 2183.636474609375, 2183.636474609375,
  2183.636474609375, 2183.636474609375, 2183.636474609375, 2183.636474609375,
  2183.636474609375
];

const Reading = () => {
  const [toggleTolltip, setToggleTolltip] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Reading">>();

  const {
    sessionReducer: { email },
    editProfile: { profile },
    mainContext: { mode }
  } = useSelector((state: ReduxState) => state);

  const isMounted = useMounted();
  const overlayRef = useRef<any>();
  const descRef = useRef(null);
  const contentRef = useRef<FlatList<any>>();

  const actionPosition = useSharedValue(ACTION_HIDE);
  const tipPosition = useSharedValue(-WIDTH / 2);

  const [content, setContentOri] = useState<BookContentProps | null>();
  const [currentPage, setCurrentPageOri] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [detailBook, setDetailBookOri] = useState(false);

  const [measure, setMeasure] = useState(false);
  const [heightContent, setHeightContent] = useState(newMaesure);

  const setDetailBook = (data: any) => {
    setDetailBookOri(data);
    newDetailBook = data;
  };

  const setCurrentPage = async (data: any) => {
    await setCurrentPageOri(data);
    newCurrentPage = data;
  };

  const setContent = (data: any) => {
    setContentOri(data);
    newContent = data;
  };

  const actionStyle = useAnimatedStyle(() => ({
    bottom: actionPosition.value
  }));
  const [listBookFinishingRead, setListBookFinishingRead] = useState([]);

  const tipStyle = useAnimatedStyle(() => ({ top: tipPosition.value }));

  const currentTitle = useMemo(
    () => (!!content ? content?.pageContent[currentPage]?.title : ""),
    [content, currentPage]
  );

  useEffect(() => {
    getBookContent();
  }, []);

  useEffect(() => {
    if (!route.params?.page) {
      return;
    }

    setCurrentPage(parseInt(route.params?.page) || 1);
  }, [route.params?.page]);

  const closeActions = () => (actionPosition.value = withTiming(0));

  const closeTip = () => (tipPosition.value = withTiming(-WIDTH / 2));

  const BOOK_ID: string = route.params?.id || "";
  const BOOK = route.params?.book;

  const customComp = () => (
    <ReadingHeader
      title={BOOK_ID || "Book Content"}
      backPress={() => navigation.goBack()}
      dotPress={async () => {
        await setToggleTolltip(true);
        actionPosition.value = withTiming(ACTION_HIDE);
        tipPosition.value = withTiming(64);
        overlayRef.current?.open();
      }}
      dotVisibility={!!content}
    />
  );

  const falseComponent = (
    <EmptyPlaceholder
      title={strings.kilasEmpty}
      subtitle={strings.kilasEmptyDesc}
    />
  );

  const getDetailBook = async () => {
    try {
      const [detailBook] = await Promise.all([fetchDetailBooks(BOOK_ID)]);
      await getBookCoverImageURL(detailBook?.data.book_title).then(
        (book_cover) => {
          // parseInt(route.params?.page) || 0
          // setTrackingLastReadLinten(email, {
          //   book: {
          //     book: detailBook?.data?.book_title,
          //     book_cover,
          //     kilas: parseInt(route?.params?.page) || 0
          //   }
          // });

          const resDetailBook = { ...detailBook.data, book_cover };
          setDetailBook(resDetailBook);
        }
      );
    } catch (err) {}
  };

  useEffect(() => {
    getDetailBook();
  }, []);

  const getBookContent = async () => {
    if (!BOOK_ID) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookContent({
        bookTitle: BOOK_ID
      });
      if (!isMounted) return;
      if (!isSuccess) return;

      if (!!data) actionPosition.value = withTiming(0);
      setContent(data);
    } catch (error) {
      logger("BookTableContent, getContent", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerState: HeaderStateProps = {
    visible: true,
    type: "custom",
    customComp
  };

  const isOnFirstPage = currentPage === 0;

  const isOnLastPage = currentPage === (content?.numberOfPage || 0) - 1;

  // const keyExtractor = (item: string) => `${item}`;

  const label = `${
    currentPage >= content?.pageContent.length ? currentPage : currentPage + 1
  } dari ${content?.numberOfPage}`;

  const closeTolltip = async () => {
    await overlayRef.current?.close();
    setTimeout(() => {
      setToggleTolltip(false);
    }, 500);
  };

  const onMark = () => {
    setTrackingLastReadLinten(email, {
      book: {
        book: detailBook?.book_title,
        book_cover: detailBook?.book_cover,
        kilas: currentPage
      }
    })
      .then((res) => {
        setSnackState(ss.successState(strings.marked));
        onTap();
        closeTolltip();
      })
      .catch((err) => {
        setSnackState(ss.failState(strings.markFailed));
      });

    // firestore()
    //   .collection(firebaseNode.lastReadBook)
    //   .doc(email)
    //   .update({
    //     "book.book": BOOK_ID,
    //     "book.kilas": currentPage + 1
    //   })
    //   .then(() => {

    //   })
    //   .catch(() => {
    //   })
    //   .finally(() => {

    //   });
  };

  const fetchListFinishingRead = async () => {
    const get = await firestore()
      .collection(firebaseNode.finishedInReading)
      .doc(email)
      .get();
    const list: any = get?.data() ? get?.data()?.book : [];

    setListBookFinishingRead(list);
    newListBookFinishingRead = list;
  };

  useEffect(() => {
    fetchListFinishingRead();
  }, []);

  useEffect(() => {
    getProgressByBook(`${profile.id}-${BOOK_ID}`, "reading").then(
      (res: any) => {
        let { bab } = res.data;
        setCurrentPage(bab);

        let slide = widthPercent(100) * bab;

        page = slide;

        contentRef.current?.scrollTo({
          x: slide,
          y: 0,
          animated: true
        });
      }
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        let { book_title, book_cover, author }: any = newDetailBook;

        if (!newListBookFinishingRead.includes(book_title)) {
          if (Array.isArray(newContent?.pageContent)) {
            let newCurrent =
              newContent?.pageContent.length === newCurrentPage
                ? newCurrentPage
                : newCurrentPage + 1;
            const body = {
              reading: {
                bab: newCurrentPage, // by index, ex. current page = 1 That means 2.
                persentase: Math.round(
                  (newCurrent / newContent?.numberOfPage) * 100
                )
              },
              book_title,
              book_cover,
              author,
              user: profile.id,
              date: new Date()
            };

            trackProgress(`${profile.id}-${book_title}`, body).then((res) => {
              newDetailBook = {};
              newContent = {};
              newCurrentPage = 0;
            });
            setMeasure(false);
          }
        }
      };
    }, [])
  );

  const onFinishedInReading = async () => {
    let newData = [...new Set([...listBookFinishingRead, BOOK_ID])];

    let type = "add";

    if (listBookFinishingRead.includes(BOOK_ID)) {
      newData = listBookFinishingRead.filter((book) => book !== BOOK_ID);
      type = "reduce";
    } else {
      doneProgress(`${profile.id}-${BOOK_ID}`);
    }

    firestore()
      .collection(firebaseNode.finishedInReading)
      .doc(email)
      .set(
        {
          book: newData,
          total: newData.length
        },
        { merge: true }
      )
      .then(() => {
        fetchListFinishingRead();
        setSnackState(
          ss.successState(
            type === "add"
              ? strings.addFinishingRead
              : strings.cancleFinishingRead
          )
        );
      })
      .catch(() => {
        setSnackState(ss.failState(strings.markFailed));
      })
      .finally(() => {
        onTap();
        closeTolltip();
      });
  };

  // let enableScroll: any = false;

  const [enableScroll, setEnableScroll] = useState(true);

  // const setEnableScroll = (param?: boolean) => {
  //   enableScroll = param;
  // };

  const onNextPress = async (fromScroll?: boolean) => {
    setEnableScroll(false);

    if (currentPage + 1 <= content?.numberOfPage) {
      let newCurrent = currentPage + 1;
      let slide = widthPercent(100) * newCurrent;
      page = slide;

      await setCurrentPage(newCurrent);
      setTimeout(() => {
        setEnableScroll(true);
      }, 1000);

      if (fromScroll !== true) {
        contentRef.current?.scrollTo({
          x: slide,
          y: 0,
          animated: true
        });
      }
    } else {
      setTimeout(() => {
        setEnableScroll(true);
      }, 1000);
    }
  };

  const onPrevPress = async (fromScroll?: any) => {
    setEnableScroll(false);

    if (currentPage - 1 >= 0) {
      let newCurrent = currentPage - 1;
      let slide = widthPercent(100) * newCurrent;
      page = slide;

      await setCurrentPage(newCurrent);
      setTimeout(() => {
        setEnableScroll(true);
      }, 1000);

      if (fromScroll !== true) {
        contentRef.current?.scrollTo({
          x: slide,
          y: 0,
          animated: true
        });
      }
    } else {
      setTimeout(() => {
        setEnableScroll(true);
      }, 1000);
    }
  };

  const onTap = () => {
    closeActions();
    closeTip();
    closeTolltip();
  };

  const NewRenderItem = ({ item, index }: { item: any; index: any }) => {
    // let height = 0;
    return (
      <>
        <View
          style={{ width: widthPercent(100), paddingHorizontal: spacing.sl }}
        >
          <View
            ref={descRef}
            onLayout={(e: any) => {
              const height = e.nativeEvent.layout.height;

              newMaesure[index] = height;

              if (index === content?.pageContent.length - 1 && !measure) {
                setMeasure(true);

                setHeightContent(newMaesure);
              }

              // setMeasure(height);
            }}
          >
            <TextItem type="b.32.nc.100">{item.title}</TextItem>
            <Gap vertical={sp.sl} />

            {Array.isArray(item.details) ? (
              item.details.map((desc: any) => {
                return (
                  <>
                    <TextItem type="r.16.nc.70">{desc}</TextItem>
                    <Gap vertical={sp.sm} />
                  </>
                );
              })
            ) : (
              <>
                <TextItem type="r.16.nc.70">-</TextItem>
                <Gap vertical={sp.sm} />
              </>
            )}
          </View>
        </View>
      </>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `"${currentTitle}"
        
Penggalan kilas ini merupakan bagian dari buku ${BOOK_ID}. Baca keseluruhan kilas di https://sekilasaja.com`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          onTap();
          closeTolltip();
        } else {
          onTap();
          closeTolltip();
        }
      } else if (result.action === Share.dismissedAction) {
        onTap();
        closeTolltip();
      }
      onTap();
      closeTolltip();
    } catch (error) {
      onTap();
      closeTolltip();
      //@ts-ignore
      logger("Reading, onShare", error?.message);
    }
  };

  const tableContentPress = () => {
    closeTolltip();
    onTap();
    navigation.navigate("BookTableContent", {
      id: BOOK_ID,
      isFromReading: true,
      readingPayload: content?.pageContent?.map((item) => ({
        id: item?.id,
        kilas: item?.kilas,
        title: item?.title
      }))
    });
  };

  const popAction = StackActions.pop(1);

  const navigationTopBar = (type: any) => {
    switch (type) {
      case "reading":
        navigation.dispatch(popAction);

        navigation.navigate("Reading", {
          id: BOOK_ID,
          page: 0,
          book: checkData(BOOK) ? BOOK : detailBook
        });
        break;
      case "listening":
        navigation.dispatch(popAction);

        navigation.navigate("Listening", {
          book: checkData(BOOK) ? BOOK : detailBook
        });
        break;
      case "watching":
        navigation.navigate("Watching", {
          book: checkData(BOOK) ? BOOK : detailBook
        });
        break;
      default:
        break;
    }
  };

  const s = styles({ isOnFirstPage, isOnLastPage });

  const handleSetIndex = async (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    setEnableScroll(false);

    if (contentOffset > page) {
      await onNextPress(true);
    } else if (contentOffset < page) {
      await onPrevPress(true);
    } else {
      setEnableScroll(true);
    }
    page = contentOffset;
  };

  return (
    <>
      <Base {...{ headerState, snackState, setSnackState }}>
        <SkeletonContent
          isLoading={isLoading}
          layout={skeleton.mainReading}
          containerStyle={s.skeleton}
        >
          <DuoRender isRenderMain={!!content} falseComponent={falseComponent}>
            <DummyFlatList
              scrollEnabled
              contentContainerStyle={s.contentContainerStyle}
              // ref={scrollRef}
            >
              <Gap vertical={sp.sl} />
              <PageController
                {...{
                  isOnFirstPage,
                  isOnLastPage,
                  label,
                  onNextPress,
                  onPrevPress
                }}
              />
              <Gap vertical={36} />

              <ScrollView
                ref={contentRef}
                decelerationRate={0}
                pagingEnabled={true}
                snapToAlignment={"center"}
                horizontal={true}
                onMomentumScrollEnd={handleSetIndex}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={enableScroll}
                contentContainerStyle={{
                  // height:
                  height:
                    measure && heightContent[currentPage]
                      ? Math.round(heightContent[currentPage])
                      : 500
                }}
              >
                {content?.pageContent.map((data, index) => {
                  return <NewRenderItem item={data} index={index} />;
                })}
              </ScrollView>
              <Gap vertical={sp.sl} />
              <PageController
                {...{
                  isOnFirstPage,
                  isOnLastPage,
                  label,
                  onNextPress,
                  onPrevPress
                }}
              />

              {/* <FlatList
                data={content?.pageContent[currentPage]?.details}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              /> */}

              <Gap vertical={sp.xl * 3} />
            </DummyFlatList>
          </DuoRender>
        </SkeletonContent>
        <Animated.View style={[s.actionWrapper, actionStyle]}>
          {mode === "light" && (
            <LinearGradient
              colors={["#fff1", "#fff8", "#fff"]}
              style={s.linearGradient}
            ></LinearGradient>
          )}
          <View style={s.actions}>
            <Button
              style={s.button}
              onPress={() => navigationTopBar("listening")}
            >
              <Headphones stroke={primaryColor.main} strokeWidth={2} />
              <Gap horizontal={sp.xs} />
              <TextItem style={s.titleSelect}>{strings.listen}</TextItem>
            </Button>
            {(checkData(BOOK?.video_link) ||
              checkData(detailBook?.video_link)) && (
              <Button
                onPress={() => navigationTopBar("watching")}
                style={s.button}
              >
                <Video stroke={primaryColor.main} strokeWidth={2} />
                <Gap horizontal={sp.xs} />
                <TextItem style={s.titleSelect}>{strings.watch}</TextItem>
              </Button>
            )}
            <Button style={s.button} onPress={onFinishedInReading}>
              <CheckCircle
                stroke={
                  listBookFinishingRead.includes(BOOK_ID)
                    ? neutralColor[90]
                    : primaryColor.main
                }
                fill={
                  !listBookFinishingRead.includes(BOOK_ID)
                    ? neutralColor[90]
                    : primaryColor.main
                }
                strokeWidth={2}
              />
              <Gap horizontal={sp.xs} />
              <TextItem style={s.titleSelect}>
                {listBookFinishingRead.includes(BOOK_ID)
                  ? strings.cancleDoneRead
                  : strings.doneRead}
              </TextItem>
            </Button>
          </View>
          <Gap vertical={sp.sl} />
        </Animated.View>
        <AnimatedOverlay ref={overlayRef} onTap={onTap} />
        {toggleTolltip && (
          <Animated.View style={[s.tipContainer, tipStyle]}>
            <View style={s.tip} />
            <View style={s.tipContent}>
              <Button style={s.tipButton} onPress={onShare}>
                <TextItem type="r.20.nc.90">{strings.share}</TextItem>
              </Button>
              <Button style={s.tipButton} onPress={tableContentPress}>
                <TextItem type="r.20.nc.90">{strings.tableOfContent}</TextItem>
              </Button>
              {/* <Button style={s.tipButton} onPress={onMark}>
                <TextItem type="r.20.nc.90">{strings.mark}</TextItem>
              </Button> */}
              {/* <Button style={s.tipButton} onPress={onFinishedInReading}>
                <TextItem
                  type={
                    listBookFinishingRead.includes(BOOK_ID)
                      ? "b.18.nc.90"
                      : "r.20.nc.90"
                  }
                  // type="b.18.nc.90"
                  style={
                    listBookFinishingRead.includes(BOOK_ID) && s.textBtnHapus
                  }
                >
                  {listBookFinishingRead.includes(BOOK_ID)
                    ? strings.cancleDoneRead
                    : strings.doneRead}
                </TextItem>
              </Button> */}
            </View>
          </Animated.View>
        )}
      </Base>
    </>
  );
};

export default Reading;
