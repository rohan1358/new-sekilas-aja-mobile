import {
  Amage,
  Base,
  Button,
  DummyFlatList,
  HeaderListening,
  TextItem
} from "../../index";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Share,
  View,
  Platform,
  Modal,
  ScrollView
} from "react-native";
import Orientation, {
  PORTRAIT,
  OrientationLocker,
  LANDSCAPE
} from "react-native-orientation-locker";
import styles from "./styles";
import {
  colors,
  firebaseNode,
  neutralColor,
  pages,
  primaryColor,
  snackState as ss,
  strings
} from "@constants";
import { Slider } from "@miblanchard/react-native-slider";
import {
  ArrowLeft,
  CheckCircle,
  CloseX,
  Exit,
  File,
  Headphones,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipBackFullScreen,
  SkipForward,
  SkipForwardFullScreen
} from "@assets";
import RBSheet from "react-native-raw-bottom-sheet";
import { heightPercent, logger, widthPercent } from "../../../helpers";
import { speedList } from "./dummy";
import Video from "react-native-video";
import { SnackStateProps } from "../../atom/Base/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@rux";
import {
  doneProgress,
  getProgressByBook,
  trackProgress
} from "../../../services";
import firestore from "@react-native-firebase/firestore";
import TrackPlayer, { State } from "react-native-track-player";
import { adjust } from "../../../utils";
import { closeFloatingVideo, setDisplayVideoRedux } from "@actions";
import TextTicker from "react-native-text-ticker";
import Gap from "../Gap";

let newCurrentTIme = 0,
  newDuration = 0,
  newListBookFinishingRead: any = [];

export default function FloatingVideo() {
  const {
    videoRedux: { video_exist }
  } = useSelector((state: ReduxState) => state);

  const navigation = useNavigation();

  let stateNavigation = navigation.getState() || {};

  const { index, key, routeNames, routes, stale, type, history } =
    stateNavigation;

  let routeName = routes && routes[index].name;

  let newChecking =
    routes && ["Listening", "RewatchWebinar", "Watching"].includes(routeName);

  return <>{!newChecking && video_exist && <NewFloatingVideo />}</>;
}

function NewFloatingVideo() {
  // const { book } = route.params;
  const refRBSheet = useRef();
  const videoPlayer = useRef(null);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [currentTime, setCurrentTimeOri] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBufferLoad, setBuffer] = useState(false);
  const [videoBigbany, setVideoBigbany] = useState({
    uri: "https://api-files.sproutvideo.com/file/069dd8b0181fe6c08f/54cbce85df89c93d/240.mp4"
  });

  const navigation = useNavigation();

  let stateNavigation = navigation.getState() || {};

  const { index, key, routeNames, routes, stale, type, history } =
    stateNavigation;

  let routeName = routes && routes[index].name;

  let newChecking =
    routes && ["Listening", "RewatchWebinar", "Watching"].includes(routeName);

  const isOpenFloat = () => {
    if (routes) {
      if (["Listening", "RewatchWebinar", "Watching"].includes(routeName)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!isOpenFloat()) {
      close();
    }
  }, [index]);

  const {
    editProfile: { profile },
    sessionReducer: { email },
    videoRedux: { book, videoFooter, videoPage }
  } = useSelector((state: ReduxState) => state);

  const setCurrentTime = (e: any) => {
    setCurrentTimeOri(e);
    newCurrentTIme = e;
  };

  const [indicator, setIndicator] = useState(true);

  const [loadRotate, setLoadRotate] = useState(false);

  const [newOrientation, setOrientation] = useState<string>("PORTRAIT");
  // const [videoUrl, setVideoUrl] = useState(videoNusa)

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = (data: any) => {
    newDuration = Math.round(data.duration);
    setDuration(Math.round(data.duration));
    setIsLoading(false);
    setTimeout(() => {
      Orientation.unlockAllOrientations();

      Orientation.getDeviceOrientation((res) => {
        if (res.includes(PORTRAIT) && !newOrientation.includes(PORTRAIT)) {
          setOrientation(PORTRAIT);
        } else if (
          res.includes(LANDSCAPE) &&
          !newOrientation.includes(LANDSCAPE)
        ) {
          setOrientation(LANDSCAPE);
        }
      });
    }, 2000);
    if (videoPlayer.current) {
      videoPlayer.current?.seek(currentTime);
    }
  };

  const onProgress = (data: any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
    if (currentTime === data.currentTime) {
      setBuffer(true);
    } else {
      setBuffer(false);
    }
  };

  const handlePrev = async () => {
    const percent = duration / 20;
    const count = currentTime - percent;
    if (count >= percent) {
      videoPlayer.current.seek(Number(count));
      setCurrentTime(Number(count));
    } else {
      videoPlayer.current.seek(0);
      setCurrentTime(Number(0));
    }
  };

  const handleNext = async () => {
    const percent = duration / 20;
    const count = currentTime + percent;
    if (count < duration) {
      videoPlayer.current.seek(Number(count));
      setCurrentTime(Number(count));
    } else {
      videoPlayer.current.seek(duration);
      setCurrentTime(Number(duration));
    }
  };

  const _convertDuration = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value - minutes * 60);
    const padWithZero = (v: number) => {
      const string = v.toString();
      if (v < 10 && v > 0) {
        return "0" + string;
      } else if (v <= 0) {
        return "00";
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const navigationTopBar = (type = "") => {
    switch (type) {
      case "reading":
        navigation.navigate("Reading", {
          id: book.book_title,
          page: 0,
          book
        });
        break;
      case "listening":
        navigation.navigate(pages.Listening, { book });
        break;
      case "watching":
        navigation.navigate(pages.Watching, { book });
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    var myHeaders = new Headers({
      "SproutVideo-Api-Key": "c1c6624f7314a47777f9e3fdb3dcaccf"
    });

    const myRequest = new Request(
      `https://api.sproutvideo.com/v1/videos/${
        book.video_id || "069dd8b0181fe6c08f"
      }`,
      {
        method: "GET",
        headers: myHeaders
      }
    );

    fetch(myRequest)
      .then((response) => response.json())
      .then((result) => {
        setVideoBigbany({ uri: result.assets.videos["480p"] });
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getProgressByBook(`${profile.id}-${book.book_title}`, "watching").then(
      (res: any) => {
        setCurrentTime(res.data.time);
      }
    );
  }, []);

  const [listBookFinishingRead, setListBookFinishingRead] = useState([]);

  const fetchListFinishingRead = async () => {
    const get = await firestore()
      .collection(firebaseNode.finishedInReading)
      .doc(email)
      .get();
    const list: any = get?.data() ? get?.data()?.book : [];

    setListBookFinishingRead(list);
    newListBookFinishingRead = list;
  };

  const overlayRef = useRef<any>();
  const [toggleTolltip, setToggleTolltip] = useState(false);

  const closeTolltip = async () => {
    await overlayRef.current?.close();
    setTimeout(() => {
      setToggleTolltip(false);
    }, 500);
  };

  const onFinishedInReading = async () => {
    let newData = [...new Set([...listBookFinishingRead, book.book_title])];
    let book_title = book.book_title;

    let type = "add";

    const checkBook = listBookFinishingRead.includes(book_title);

    if (checkBook) {
      newData = listBookFinishingRead.filter((book) => book !== book_title);

      type = "reduce";
    } else {
      doneProgress(`${profile.id}-${book_title}`);
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
      })
      .catch(() => {
        setSnackState(ss.failState(strings.markFailed));
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchListFinishingRead();
  }, []);

  const dispatch = useDispatch();

  if (State.Playing) {
    TrackPlayer.pause();
  }

  const close = () => {
    exitPage();

    dispatch(closeFloatingVideo());

    let { book_title, book_cover, author } = book;
    if (!newListBookFinishingRead.includes(book_title)) {
      trackProgress(`${profile.id}-${book.book_title}`, {
        watching: {
          time: newCurrentTIme || 0,
          persentase:
            Math.round((Math.round(newCurrentTIme) / newDuration) * 100) || 0
        },
        book_title,
        book_cover,
        author,
        user: profile.id,
        date: new Date()
      }).then((res) => {
        newCurrentTIme = 0;
        newDuration = 0;
      });
    }
  };

  const handleOrientation = async (orientation: any) => {
    setLoadRotate(true);

    if (orientation !== "UNKNOWN") {
      if (Platform.OS === "ios") {
        if (orientation.includes("FACE-UP")) {
          setLoadRotate(false);
          return;
        }
      }
      if (orientation !== newOrientation) {
        await setOrientation(orientation);
        setLoadRotate(false);

        setTimeout(() => {
          setIndicator(false);
        }, 10000);
      }
    } else {
      setLoadRotate(false);
    }
  };

  const toggleIndicator = async () => {
    await setIndicator(!indicator);
    setTimeout(() => {
      setIndicator(false);
    }, 5000);
  };

  const newHandleOrientation = async (event: any) => {
    if (!isLoading && Platform.OS !== "ios") {
      const layout = {
        Width_Layout: event.nativeEvent.layout.width,
        Height_Layout: event.nativeEvent.layout.height
      };

      if (layout.Width_Layout > layout.Height_Layout) {
        await setOrientation(LANDSCAPE);
      } else {
        await setOrientation(PORTRAIT);
      }
    }
  };

  // Orientation.getAutoRotateState

  // screen
  const refScroll = useRef();

  const setModalVisible = (param: any) => {
    dispatch(setDisplayVideoRedux(param ? "page" : "footer"));
  };

  const exitPage = () => {
    setModalVisible(false);
  };

  let modalVisible = videoPage;

  const closeFromSLide = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    if (contentOffset > 50) {
      close();
    }
  };

  return (
    <>
      {!newChecking && (
        <>
          {videoFooter && (
            <View>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={closeFromSLide}
              >
                <Button
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: primaryColor.main,
                    paddingHorizontal: adjust(10),
                    width: widthPercent(100),
                    overflow: "hidden",
                    height: heightPercent(8)
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "black",
                      flex: 0.6
                    }}
                  >
                    <View
                      style={{
                        height: "95%",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center"
                      }}
                    >
                      {isLoading && (
                        <ActivityIndicator
                          size="small"
                          color={primaryColor.main}
                        />
                      )}
                    </View>
                    <Video
                      fullscreen={newOrientation.includes(LANDSCAPE)}
                      onTouchStart={(e) =>
                        newOrientation.includes(LANDSCAPE) && toggleIndicator()
                      }
                      ref={videoPlayer}
                      source={videoBigbany}
                      onLoadStart={onLoadStart}
                      onLoad={onLoad}
                      fullscreenOrientation={"landscape"}
                      style={[
                        Platform.OS === "ios" &&
                        newOrientation.includes(LANDSCAPE)
                          ? styles.backgroundVideoIosFooter
                          : styles.backgroundVideoFooter
                      ]}
                      paused={play}
                      onProgress={onProgress}
                      resizeMode={
                        newOrientation.includes(LANDSCAPE) ? "contain" : "cover"
                      }
                      // resizeMode={"contain"}
                      rate={speed}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: adjust(10)
                    }}
                  >
                    <TextTicker
                      style={{
                        fontWeight: "bold",
                        fontSize: adjust(17),
                        color: neutralColor[90]
                      }}
                      duration={10000}
                      loop
                      bounce
                      repeatSpacer={50}
                      marqueeDelay={800}
                    >
                      {/* {listBab ? listBab[bab]?.title : "bab"} */}
                      {book.book_title}
                    </TextTicker>
                    <TextItem type={"r.14.nc.80"}>{book.author}</TextItem>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => !isLoading && setPlay(!play)}
                      style={[
                        styles.playFooter,
                        { marginHorizontal: adjust(10) }
                      ]}
                    >
                      {play ? (
                        <Play
                          width={adjust(32)}
                          height={adjust(32)}
                          color={primaryColor.main}
                          style={styles.iconPlay}
                        />
                      ) : (
                        <Pause
                          width={adjust(32)}
                          height={adjust(32)}
                          color={primaryColor.main}
                        />
                      )}
                    </Button>
                    <Button
                      onPress={() => {
                        close();
                      }}
                    >
                      <CloseX
                        width={adjust(32)}
                        height={adjust(32)}
                        color={neutralColor[90]}
                      />
                    </Button>
                  </View>
                </Button>
                <View
                  style={{
                    width: widthPercent(100)
                  }}
                >
                  <TextItem></TextItem>
                </View>
              </ScrollView>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.container}>
              <ScrollView
                ref={refScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={false}
              >
                <View style={styles.contentModal}>
                  <>
                    <View
                      style={{ flex: 1 }}
                      onLayout={(event) => {
                        newHandleOrientation(event);
                      }}
                    >
                      {!loadRotate && (
                        <>
                          <Base
                            barColor={primaryColor.main}
                            snackState={snackState}
                            setSnackState={setSnackState}
                            fullScreen={newOrientation.includes(LANDSCAPE)}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                paddingHorizontal: adjust(10),
                                alignSelf: "center",
                                // marginTop: adjust(10),
                                backgroundColor: primaryColor.main
                              }}
                            >
                              <View>
                                <Button
                                  onPress={() => {
                                    exitPage();
                                  }}
                                >
                                  <ArrowLeft color={neutralColor[90]} />
                                </Button>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginHorizontal: adjust(10)
                                }}
                              >
                                <TextTicker
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: adjust(20),
                                    color: neutralColor[90]
                                  }}
                                  duration={10000}
                                  loop
                                  bounce
                                  repeatSpacer={50}
                                  marqueeDelay={800}
                                >
                                  {/* {listBab ? listBab[bab]?.title : "bab"} */}
                                  {book.book_title}
                                </TextTicker>
                              </View>
                              <View
                                style={
                                  Platform.OS === "ios"
                                    ? styles.boxExitIos
                                    : styles.boxExit
                                }
                              >
                                <Button
                                  onPress={() => {
                                    close();
                                  }}
                                  // style={styles.btn}
                                >
                                  <Exit />
                                </Button>
                              </View>
                            </View>

                            <View style={styles.boxImage}>
                              <>
                                {isLoading && (
                                  <View style={styles.loadVideo}>
                                    <ActivityIndicator
                                      size="large"
                                      color={primaryColor.main}
                                    />
                                  </View>
                                )}
                                {isBufferLoad && (
                                  <View style={styles.loadVideoActive}>
                                    <ActivityIndicator
                                      size="large"
                                      color={primaryColor.main}
                                    />
                                  </View>
                                )}
                              </>

                              <Video
                                onTouchStart={(e) =>
                                  newOrientation.includes(LANDSCAPE) &&
                                  toggleIndicator()
                                }
                                ref={videoPlayer}
                                source={videoBigbany}
                                onLoadStart={onLoadStart}
                                onLoad={onLoad}
                                fullscreenOrientation={"landscape"}
                                style={
                                  Platform.OS === "ios" &&
                                  newOrientation.includes(LANDSCAPE)
                                    ? styles.backgroundVideoIos
                                    : styles.backgroundVideo
                                }
                                paused={play}
                                onProgress={onProgress}
                                resizeMode={"cover"}
                                rate={speed}
                              />
                            </View>
                            <>
                              <View style={styles.content}>
                                <View>
                                  <Slider
                                    value={currentTime}
                                    containerStyle={styles.SliderContainer}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor={neutralColor[90]}
                                    maximumTrackTintColor={"#D1D7E1"}
                                    thumbTintColor={colors.white}
                                    trackStyle={styles.trackSliderStyle}
                                    onValueChange={(value) => {
                                      videoPlayer.current.seek(Number(value));
                                      setCurrentTime(Number(value));
                                    }}
                                  />
                                  <View style={styles.boxTextTime}>
                                    <TextItem type={"r.14.nc.90"}>
                                      {_convertDuration(currentTime)}/
                                      {_convertDuration(duration)}
                                    </TextItem>
                                    <Button
                                      onPress={() => {
                                        handleOrientation(LANDSCAPE);
                                        Orientation.lockToLandscape();
                                      }}
                                    >
                                      <Maximize
                                        height={25}
                                        color={neutralColor[90]}
                                      />
                                    </Button>
                                    {/* <TextItem type={"r.14.nc.90"}>
                    <Maximize
                      onPress={() => handleOrientation(LANDSCAPE)}
                      height={25}
                      color={neutralColor[90]}
                    />
                  </TextItem> */}
                                  </View>
                                </View>
                                <View style={styles.boxAction}>
                                  <Button onPress={() => handlePrev()}>
                                    <RotateCcw
                                      height={25}
                                      color={neutralColor[90]}
                                    />
                                  </Button>
                                  <Button>
                                    <SkipBack color={neutralColor[90]} />
                                  </Button>
                                  <Button
                                    onPress={() => setPlay(!play)}
                                    style={styles.play}
                                  >
                                    {play ? (
                                      <Play
                                        color={primaryColor.main}
                                        style={styles.iconPlay}
                                      />
                                    ) : (
                                      <Pause color={primaryColor.main} />
                                    )}
                                  </Button>
                                  <Button>
                                    <SkipForward color={neutralColor[90]} />
                                  </Button>
                                  <Button onPress={() => handleNext()}>
                                    <RotateCw
                                      height={25}
                                      color={neutralColor[90]}
                                    />
                                  </Button>
                                </View>
                                <View style={styles.boxFooter}>
                                  <Button
                                    onPress={() => refRBSheet.current.open()}
                                  >
                                    <TextItem
                                      type={"b.14.nc.90"}
                                      style={styles.speedText}
                                    >
                                      {strings.kecepatan +
                                        speed.toString() +
                                        strings.x}
                                    </TextItem>
                                  </Button>
                                  <View style={styles.SelectBar}>
                                    <Button
                                      onPress={() =>
                                        navigationTopBar("reading")
                                      }
                                      style={styles.btnBar}
                                    >
                                      <File
                                        stroke={primaryColor.main}
                                        strokeWidth={2}
                                      />
                                      <TextItem style={styles.titleSelect}>
                                        {strings.baca}
                                      </TextItem>
                                    </Button>
                                    <Button
                                      onPress={() =>
                                        navigationTopBar("listening")
                                      }
                                      style={styles.btnBar}
                                    >
                                      <Headphones
                                        stroke={primaryColor.main}
                                        strokeWidth={2}
                                      />
                                      <TextItem style={styles.titleSelect}>
                                        {strings.dengar}
                                      </TextItem>
                                    </Button>

                                    <Button
                                      style={styles.btnBar}
                                      onPress={() => onFinishedInReading()}
                                    >
                                      <CheckCircle
                                        stroke={
                                          listBookFinishingRead.includes(
                                            book.book_title
                                          )
                                            ? neutralColor[90]
                                            : primaryColor.main
                                        }
                                        fill={
                                          !listBookFinishingRead.includes(
                                            book.book_title
                                          )
                                            ? neutralColor[90]
                                            : primaryColor.main
                                        }
                                        strokeWidth={2}
                                      />
                                      {/* <Gap horizontal={sp.xs} /> */}
                                      <TextItem style={styles.titleSelect}>
                                        {listBookFinishingRead.includes(
                                          book.book_title
                                        )
                                          ? strings.cancleDoneRead
                                          : strings.doneRead}
                                      </TextItem>
                                    </Button>
                                  </View>
                                </View>
                              </View>
                              <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={false}
                                closeOnPressMask={true}
                                customStyles={{
                                  wrapper: {
                                    backgroundColor: "rgba(0,0,0,0.3)"
                                  },
                                  container: {
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24
                                  }
                                }}
                                height={heightPercent(42)}
                              >
                                <View>
                                  <View style={styles.boxTitleSheet}>
                                    <TextItem style={styles.titleSheet}>
                                      {strings.kecepatan_video}
                                    </TextItem>
                                    <Button
                                      onPress={() => refRBSheet.current.close()}
                                    >
                                      <Exit color={neutralColor[90]} />
                                    </Button>
                                  </View>
                                  <DummyFlatList>
                                    <View style={styles.boxListSpeed}>
                                      {speedList.map((item, index) => (
                                        <Button
                                          onPress={() => {
                                            refRBSheet.current.close();
                                            setTimeout(() => {
                                              setSpeed(item);
                                            }, 1200);
                                          }}
                                          key={index}
                                          style={styles.listSpeed}
                                        >
                                          <TextItem type={"r.16.nc.90"}>
                                            {item + strings.x}
                                          </TextItem>
                                        </Button>
                                      ))}
                                    </View>
                                  </DummyFlatList>
                                </View>
                              </RBSheet>
                            </>
                          </Base>
                        </>
                      )}
                    </View>
                  </>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </>
      )}
    </>
  );
}
