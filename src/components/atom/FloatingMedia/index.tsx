import React, { useCallback, useEffect, useRef, useState } from "react";
import { adjust, checkData } from "../../../utils";

import { Amage, Base, Button, DummyFlatList, TextItem } from "../index";
import { Share, Platform, View, Dimensions, Modal } from "react-native";
import styles from "./styles";
import {
  colors,
  firebaseNode,
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  strings
} from "@constants";
import { Slider } from "@miblanchard/react-native-slider";
import firestore from "@react-native-firebase/firestore";

import {
  ArrowLeft,
  CheckCircle,
  CloseX,
  Exit,
  File,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Video
} from "@assets";
// import TextTicker from 'react-native-text-ticker'
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import { heightPercent, logger, widthPercent } from "../../../helpers/index";
import TrackPlayer, {
  State,
  Capability,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event
} from "react-native-track-player";
import { ScrollView } from "react-native-gesture-handler";
import {
  getBookAudioURL,
  fetchProfile,
  getKilas,
  getBookCoverImageURL,
  trackProgress,
  getProgressByBook,
  baseUrl,
  doneProgress
} from "../../../services/index";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../redux/reducers";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { closeFloatingMedia, setDisplayAudioRedux } from "@actions";
import stylesScreen from "./stylesScreen";
import ListAudio from "./component/ListAudio";
import TextTicker from "react-native-text-ticker";
import HeaderListening from "./../../organism/HeaderListening/index";

const speedList = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop
  ],
  compactCapabilities: [Capability.Play, Capability.Pause]
});

let newValueProgress = 0,
  newValueDuration = 0,
  newBab = 0,
  listSoundTrack: any = false,
  newListBookFinishingRead: any = [];

export default function FloatingMedia() {
  const {
    audioRedux: { audio_exist }
  } = useSelector((state: ReduxState) => state);

  return <>{audio_exist && <OriFloatingMedia />}</>;
}

function OriFloatingMedia() {
  // new
  const navigation = useNavigation();

  let stateNavigation = navigation.getState() || {};

  const { index, key, routeNames, routes, stale, type, history } =
    stateNavigation;

  const isOpenFloat = () => {
    if (
      routes &&
      ["Listening", "RewatchWebinar", "Watching"].includes(routes[index].name)
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!isOpenFloat()) {
      close();
    }
  }, [index]);

  const {
    sessionReducer: { email },
    editProfile: { profile },
    audioRedux: { audioPage, book, audio_exist, audioFooter }
  } = useSelector((state: ReduxState) => state);
  const playbackState: any = usePlaybackState();
  const progress = useProgress();

  const refRBSheet = useRef();
  const [speed, setSpeed] = useState(1.0);

  const [titleTrack, setTitle] = useState();
  const [authorTrack, setAuthor] = useState();
  const [bab, setBabOri] = useState(0);
  const [listBab, setListbab] = useState(false);

  const [listBookFinishingRead, setListBookFinishingRead] = useState([]);

  const [mounted, setMouted] = useState(false);

  const setBab = async (data: any) => {
    await setBabOri(data);
    newBab = data;
  };

  const setValue = async (data: any) => {
    // await setValueProgress(data);
    newValueProgress = data;
    if (progress.duration) {
      newValueDuration = progress.duration;
    }
  };

  const setupPlayer = async () => {
    const listKilas = await getKilas(book?.book_title);

    setListbab(listKilas);

    const list = await getBookAudioURL(listKilas, book);

    axios
      .post(`${baseUrl}/get-audio-duration-one-book`, {
        audio: list
      })
      .then((res) => {
        listSoundTrack = res.data.data;
        setMouted(true);
      });

    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(list);

      getHistory();
    } catch (error) {
      logger(error);
    }
  };

  const togglePlayback = async (playbackState: any) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const handlePrev = async () => {
    // logger(progress.position)
    const count = progress.position - 20;
    if (count >= 5) {
      await TrackPlayer.seekTo(count);
    } else {
      await TrackPlayer.seekTo(0);
    }
  };

  const handleNext = async () => {
    const count = progress.position + 20;
    if (count < progress.duration) {
      await TrackPlayer.seekTo(count);
    } else {
      await TrackPlayer.seekTo(progress.duration);
    }
  };

  const handleRate = async (value) => {
    await TrackPlayer.setRate(value);
    setSpeed(value);
    refRBSheet.current.close();
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      const { artist, title } = track;
      setTitle(title);
      setAuthor(artist);
    }
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://sekilasaja.com/"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      logger(error.message);
    }
  };

  const handleSleder = async (value: any) => {
    await TrackPlayer.seekTo(value);
    setValue(value);
  };

  const getHomeData = async () => {
    try {
      const [profileData] = await Promise.all([
        fetchProfile(email, profile.id)
      ]);

      if (profileData.isSuccess) {
      } else {
        throw new Error("Fail on fetching profile data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
    }
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

  const onFinishedInReading = async () => {
    let newData = [...new Set([...listBookFinishingRead, book.book_title])];

    let book_title = book.book_title;

    const checkBook = listBookFinishingRead.includes(book_title);

    if (checkBook) {
      newData = listBookFinishingRead.filter((book) => book !== book_title);
      // type = "reduce";
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
        // setSnackState(
        //   ss.successState(
        //     type === "add"
        //       ? strings.addFinishingRead
        //       : strings.cancleFinishingRead
        //   )
        // );
      })
      .catch(() => {
        // setSnackState(ss.failState(strings.markFailed));
      })
      .finally(() => {
        // onTap();
        // closeTolltip();
      });
  };

  useEffect(() => {
    setValue(progress.position);
  }, [progress.position]);

  useEffect(() => {
    setupPlayer();

    const hadbleStop = async () => {
      await TrackPlayer.stop();
    };

    return () => {
      hadbleStop();
    };
  }, []);

  const getHistory = () => {
    getProgressByBook(`${profile.id}-${book.book_title}`, "listening").then(
      (res: any) => {
        const { bab, time } = res.data;
        TrackPlayer.skip(bab);
        TrackPlayer.seekTo(time);

        setBab(bab);
        setValue(time);
      }
    );
  };

  let isRunning = playbackState === State.Playing;

  const handleMoveBab = async (params: any) => {
    if (isRunning && bab === params) {
      await TrackPlayer.pause();
    } else if (bab === params) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.skip(params);
      await setBab(params);

      await TrackPlayer.play();
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     return async () => {};
  //   }, [])
  // );

  const navigationTopBar = async (type = "") => {
    switch (type) {
      case "reading":
        setModalVisible(false);
        navigation.navigate("Reading", {
          id: book.book_title,
          page: 0,
          book
        });
        await TrackPlayer.pause();
        break;
      case "watching":
        setModalVisible(false);

        navigation.navigate(pages.Watching, { book });
        await TrackPlayer.pause();
        break;

      default:
        break;
    }
  };

  const handleNextBab = () => {
    if (bab + 1 <= listBab.length) setBab(bab + 1);
  };
  const handlePrevBab = () => {
    if (bab - 1 >= 0) {
      setBab(bab - 1);
    }
  };

  const [newCover, setNewCover] = useState<any>("");

  const newGetCover = async () => {
    getBookCoverImageURL(book?.book_title).then((res) => {
      setNewCover(res);
    });
  };

  const dimensionWidth = Dimensions.get("screen").width;

  // screen

  const refScroll = useRef();

  const dispatch = useDispatch();
  let modalVisible = audioPage;

  const setModalVisible = (param: any) => {
    dispatch(setDisplayAudioRedux(param ? "page" : "footer"));
  };

  const exitPage = () => {
    setModalVisible(false);
  };

  let titleKilas = listBab ? listBab[bab]?.title : "bab";
  if (audio_exist && (!titleKilas || titleKilas === "bab")) {
    fetchListFinishingRead();

    getHomeData();
    newGetCover();
  }

  const close = async () => {
    exitPage();

    dispatch(closeFloatingMedia());
    setListbab(false);

    let persentase =
      Math.round(((newBab + 1) / listSoundTrack.length) * 100) || 0;

    if (persentase > 0) {
      let { book_title, book_cover, author }: any = book;

      if (!newListBookFinishingRead.includes(book_title)) {
        const body = {
          listening: {
            time: newValueProgress || 0,
            persentase:
              Math.round(((newBab + 1) / listSoundTrack.length) * 100) || 0,
            bab: newBab
          },
          book_title,
          book_cover: book_cover || newCover,
          author,
          user: profile.id,
          date: new Date()
        };

        trackProgress(`${profile.id}-${book_title}`, body).then((res) => {
          newValueProgress = 0;
          newValueDuration = 0;
          newBab = 0;
        });
      }

      await setMouted(false);

      listSoundTrack = false;
    }
  };

  const closeFromSLide = (e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    if (contentOffset > 50) {
      close();
    }
  };

  return (
    <>
      {isOpenFloat() && (
        <>
          {audio_exist && (
            <View>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={closeFromSLide}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: primaryColor.main,
                    padding: adjust(10),
                    width: widthPercent(100),
                    overflow: "hidden"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1
                    }}
                  >
                    <Button onPress={() => handlePrev()}>
                      <RotateCcw height={25} color={neutralColor[90]} />
                    </Button>
                    <Button
                      onPress={() => togglePlayback(playbackState)}
                      style={[styles.play, { marginHorizontal: adjust(10) }]}
                    >
                      {playbackState === State.Playing ? (
                        <Pause color={primaryColor.main} />
                      ) : (
                        <Play
                          color={primaryColor.main}
                          style={styles.iconPlay}
                        />
                      )}
                    </Button>
                    <Button
                      // onPress={() => {
                      //   setModalVisible(true);
                      // }}
                      onPress={() => handleNext()}
                    >
                      <RotateCw height={25} color={neutralColor[90]} />
                    </Button>
                    <Button
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <View
                        style={{
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
                          {titleKilas}
                        </TextTicker>

                        <TextItem type={"r.14.nc.90"}>
                          {book.book_title}
                        </TextItem>
                      </View>
                    </Button>
                  </View>
                  <View>
                    <Button
                      onPress={() => {
                        close();
                      }}
                    >
                      <CloseX color={neutralColor[90]} />
                    </Button>
                  </View>
                </View>
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
                <View style={styles.content}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: adjust(10),
                      alignSelf: "center",
                      marginTop: adjust(10)
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
                        {listBab ? listBab[bab]?.title : "bab"}
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

                  {audio_exist && (
                    <View style={{ flex: 1 }}>
                      <ScrollView>
                        <View style={stylesScreen.content}>
                          <View style={stylesScreen.boxImage}>
                            <Amage
                              resizeMode="contain"
                              source={book?.book_cover || newCover}
                            />
                          </View>
                          <View style={stylesScreen.containerTitle}>
                            {Platform.OS === "ios" ? (
                              <></>
                            ) : (
                              dimensionWidth > 320 && (
                                <LinearGradient
                                  colors={[
                                    primaryColor.main,
                                    "rgba(251, 207, 50, 0.5)",
                                    "transparent"
                                  ]}
                                  useAngle={true}
                                  angle={45}
                                  angleCenter={{ x: 0.5, y: 0.5 }}
                                  style={stylesScreen.gradientLeft}
                                />
                              )
                            )}

                            {/* <TextTicker
            duration={6000}
            loop
            animationType='scroll'
            repeatSpacer={20}
            marqueeDelay={1}
            useNativeDriver={true}
          > */}
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}
                            >
                              <TextItem
                                style={[stylesScreen.text, stylesScreen.title]}
                              >
                                {titleTrack}
                              </TextItem>
                            </ScrollView>

                            {/* </TextTicker> */}
                            {Platform.OS === "ios" ? (
                              <></>
                            ) : (
                              dimensionWidth > 320 && (
                                <LinearGradient
                                  colors={[
                                    "transparent",
                                    "rgba(251, 207, 50, 0.5)",
                                    primaryColor.main
                                  ]}
                                  useAngle={true}
                                  angle={45}
                                  angleCenter={{ x: 0.5, y: 0.5 }}
                                  style={stylesScreen.gradientRight}
                                />
                              )
                            )}
                          </View>

                          <TextItem style={[stylesScreen.text]}>
                            {authorTrack}
                          </TextItem>
                          <View>
                            <Slider
                              value={newValueProgress}
                              containerStyle={stylesScreen.SliderContainer}
                              minimumValue={0}
                              maximumValue={progress.duration}
                              minimumTrackTintColor={neutralColor[90]}
                              maximumTrackTintColor={"#D1D7E1"}
                              thumbTintColor={colors.white}
                              trackStyle={stylesScreen.trackSliderStyle}
                              onSlidingComplete={(value) => {
                                handleSleder(Number(value));
                              }}
                            />
                            <SkeletonContent
                              containerStyle={stylesScreen.skeleton}
                              isLoading={progress.duration <= 0}
                              layout={skeleton.listening.timing}
                            >
                              <View style={stylesScreen.boxTextTime}>
                                <TextItem type={"r.14.nc.90"}>
                                  {new Date(progress.position * 1000)
                                    .toISOString()
                                    .substr(14, 5)}
                                </TextItem>
                                <TextItem type={"r.14.nc.90"}>
                                  {new Date(progress.duration * 1000)
                                    .toISOString()
                                    .substr(14, 5)}
                                </TextItem>
                              </View>
                            </SkeletonContent>
                          </View>
                          <View style={stylesScreen.boxAction}>
                            <Button onPress={() => handlePrev()}>
                              <RotateCcw height={25} color={neutralColor[90]} />
                            </Button>
                            <Button
                              onPress={async () => {
                                await TrackPlayer.skipToPrevious();
                                handlePrevBab();
                              }}
                            >
                              <SkipBack color={neutralColor[90]} />
                            </Button>
                            <Button
                              onPress={() => togglePlayback(playbackState)}
                              style={stylesScreen.play}
                            >
                              {playbackState === State.Playing ? (
                                <Pause color={primaryColor.main} />
                              ) : (
                                <Play
                                  color={primaryColor.main}
                                  style={stylesScreen.iconPlay}
                                />
                              )}
                            </Button>
                            <Button
                              onPress={async () => {
                                await TrackPlayer.skipToNext();
                                handleNextBab();
                              }}
                            >
                              <SkipForward color={neutralColor[90]} />
                            </Button>
                            <Button onPress={() => handleNext()}>
                              <RotateCw height={25} color={neutralColor[90]} />
                            </Button>
                          </View>
                          <View style={stylesScreen.boxFooter}>
                            <Button onPress={() => refRBSheet.current.open()}>
                              <TextItem
                                type={"b.14.nc.90"}
                                style={stylesScreen.speedText}
                              >
                                {strings.kecepatan +
                                  speed.toString() +
                                  strings.x}
                              </TextItem>
                            </Button>
                            <View style={stylesScreen.SelectBar}>
                              <Button
                                onPress={() => navigationTopBar("reading")}
                                style={stylesScreen.btnBar}
                              >
                                <File stroke={"#FCCF32"} strokeWidth={2} />
                                <TextItem style={stylesScreen.titleSelect}>
                                  {strings.baca}
                                </TextItem>
                              </Button>
                              {book.video_link !== "" && (
                                <Button
                                  onPress={() => navigationTopBar("watching")}
                                  style={stylesScreen.btnBar}
                                >
                                  <Video stroke={"#FCCF32"} strokeWidth={2} />
                                  <TextItem style={stylesScreen.titleSelect}>
                                    {strings.tonton}
                                  </TextItem>
                                </Button>
                              )}

                              <Button
                                style={stylesScreen.btnBar}
                                onPress={onFinishedInReading}
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
                                <TextItem style={stylesScreen.titleSelect}>
                                  {listBookFinishingRead.includes(
                                    book.book_title
                                  )
                                    ? strings.cancleDoneRead
                                    : strings.doneRead}
                                </TextItem>
                              </Button>
                            </View>
                          </View>

                          {checkData(mounted) &&
                            listSoundTrack &&
                            listSoundTrack.map((data: any, index: number) => {
                              return (
                                <View
                                  key={index}
                                  style={{
                                    marginVertical: adjust(5)
                                  }}
                                >
                                  <ListAudio
                                    onPress={() => {
                                      handleMoveBab(index);
                                    }}
                                    audio={{
                                      ...data,
                                      text: listBab[index]?.title
                                    }}
                                    id={index}
                                    active={isRunning && index === bab}
                                  />
                                </View>
                              );
                            })}
                        </View>
                      </ScrollView>

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
                        <View style={stylesScreen.boxTitleSheet}>
                          <TextItem style={stylesScreen.titleSheet}>
                            {strings.kecepatan_audio}
                          </TextItem>
                          <Button onPress={() => refRBSheet.current.close()}>
                            <Exit color={neutralColor[90]} />
                          </Button>
                        </View>
                        <DummyFlatList>
                          <View style={stylesScreen.boxListSpeed}>
                            {speedList.map((item, index) => (
                              <Button
                                onPress={() => {
                                  handleRate(item);
                                  // setTimeout(() => {
                                  //   setSpeed(item)
                                  // }, 1200);
                                }}
                                key={index}
                                style={stylesScreen.listSpeed}
                              >
                                <TextItem type={"r.16.nc.90"}>
                                  {item + strings.x}
                                </TextItem>
                              </Button>
                            ))}
                          </View>
                        </DummyFlatList>
                      </RBSheet>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </>
      )}
    </>
  );
}
