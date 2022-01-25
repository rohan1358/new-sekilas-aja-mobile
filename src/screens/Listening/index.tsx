import {
  Amage,
  Base,
  Button,
  DummyFlatList,
  HeaderListening,
  TextItem
} from "../../components";
import React, { useEffect, useRef, useState } from "react";
import { Share, Text, View } from "react-native";
import styles from "./styles";
import {
  colors,
  neutralColor,
  pages,
  primaryColor,
  snackState as ss,
  strings
} from "@constants";
import { Slider } from "@miblanchard/react-native-slider";
import {
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
import { heightPercent, logger } from "../../helpers";
import { speedList } from "./dummy";
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
  getBookCoverImageURL
} from "../../services/index";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/reducers";

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

export default function Listening({ navigation, route }: any) {
  const { book } = route.params;
  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const refRBSheet = useRef();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [speed, setSpeed] = useState(1.0);
  const [valueProgress, setValue] = useState(0);
  const [titleTrack, setTitle] = useState();
  const [authorTrack, setAuthor] = useState();
  const [bab, setBab] = useState(0);
  const [listBab, setListbab] = useState(false);

  const setupPlayer = async () => {
    const listKilas = await getKilas(book?.book_title);

    setListbab(listKilas);

    const list = await getBookAudioURL(listKilas, book);

    const listSoundTrack = list;

    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(listSoundTrack);
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

  const handleSleder = async (value) => {
    await TrackPlayer.seekTo(value);
    setValue(value);
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

  const getHomeData = async () => {
    try {
      const [profileData] = await Promise.all([fetchProfile(email)]);

      if (profileData.isSuccess) {
      } else {
        throw new Error("Fail on fetching profile data");
      }
    } catch (error) {
      logger("Home, getHomeData", error);
    } finally {
    }
  };

  useEffect(() => {
    getHomeData();
    newGetCover();
  }, []);

  const navigationTopBar = async (type = "") => {
    switch (type) {
      case "reading":
        navigation.navigate("Reading", {
          id: book.book_title,
          page: 0,
          book
        });
        await TrackPlayer.pause();
        break;
      case "watching":
        navigation.navigate(pages.Watching, { book });
        await TrackPlayer.pause();
        break;

      default:
        break;
    }
  };

  const handleNextBab = () => {
    if (bab + 1 < listBab.length) setBab(bab + 1);
  };
  const handlePrevBab = () => {
    if (bab - 1 > 0) setBab(bab - 1);
  };

  const [newCover, setNewCover] = useState<any>("");

  const newGetCover = async () => {
    getBookCoverImageURL(book?.book_title).then((res) => {
      setNewCover(res);
    });
  };
  return (
    <Base
      fullScreen={true}
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <View style={{ flex: 1, height: "100%" }}>
        <HeaderListening
          navigation={navigation}
          onShare={() => onShare()}
          title={listBab ? listBab[bab]?.title : "bab"}
        />

        <ScrollView>
          <View style={styles.content}>
            <View style={styles.boxImage}>
              <Amage
                resizeMode="contain"
                source={book?.book_cover || newCover}
              />
            </View>
            <View style={styles.containerTitle}>
              <LinearGradient
                colors={[
                  primaryColor.main,
                  "rgba(251, 207, 50, 0.5)",
                  "transparent"
                ]}
                useAngle={true}
                angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientLeft}
              />
              {/* <TextTicker
            duration={6000}
            loop
            animationType='scroll'
            repeatSpacer={20}
            marqueeDelay={1}
            useNativeDriver={true}
          > */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TextItem style={[styles.text, styles.title]}>
                  {titleTrack}
                </TextItem>
              </ScrollView>
              {/* </TextTicker> */}
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(251, 207, 50, 0.5)",
                  primaryColor.main
                ]}
                useAngle={true}
                angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientRight}
              />
            </View>
            <TextItem style={[styles.text]}>{authorTrack}</TextItem>
            <View>
              <Slider
                value={valueProgress}
                containerStyle={styles.SliderContainer}
                minimumValue={0}
                maximumValue={progress.duration}
                minimumTrackTintColor={neutralColor[90]}
                maximumTrackTintColor={"#D1D7E1"}
                thumbTintColor={colors.white}
                trackStyle={styles.trackSliderStyle}
                onSlidingComplete={(value) => {
                  handleSleder(Number(value));
                }}
              />
              <View style={styles.boxTextTime}>
                <TextItem type={"r.14.nc.90"}>
                  {new Date(progress.position * 1000)
                    .toISOString()
                    .substr(14, 5)}
                </TextItem>
                <TextItem type={"r.14.nc.90"}>
                  {new Date((progress.duration - progress.position) * 1000)
                    .toISOString()
                    .substr(14, 5)}
                </TextItem>
              </View>
            </View>
            <View style={styles.boxAction}>
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
                style={styles.play}
              >
                {playbackState === State.Playing ? (
                  <Pause color={primaryColor.main} />
                ) : (
                  <Play color={primaryColor.main} style={styles.iconPlay} />
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
            <View style={styles.boxFooter}>
              <Button onPress={() => refRBSheet.current.open()}>
                <TextItem type={"b.14.nc.90"} style={styles.speedText}>
                  {strings.kecepatan + speed.toString() + strings.x}
                </TextItem>
              </Button>
              <View style={styles.SelectBar}>
                <Button
                  onPress={() => navigationTopBar("reading")}
                  style={styles.btnBar}
                >
                  <File />
                  <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
                </Button>
                {book.video_link !== "" && (
                  <Button
                    onPress={() => navigationTopBar("watching")}
                    style={styles.btnBar}
                  >
                    <Video />
                    <TextItem style={styles.titleSelect}>
                      {strings.tonton}
                    </TextItem>
                  </Button>
                )}
              </View>
            </View>
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
          <View style={styles.boxTitleSheet}>
            <TextItem style={styles.titleSheet}>
              {strings.kecepatan_audio}
            </TextItem>
            <Button onPress={() => refRBSheet.current.close()}>
              <Exit color={neutralColor[90]} />
            </Button>
          </View>
          <DummyFlatList>
            <View style={styles.boxListSpeed}>
              {speedList.map((item, index) => (
                <Button
                  onPress={() => {
                    handleRate(item);
                    // setTimeout(() => {
                    //   setSpeed(item)
                    // }, 1200);
                  }}
                  key={index}
                  style={styles.listSpeed}
                >
                  <TextItem type={"r.16.nc.90"}>{item + strings.x}</TextItem>
                </Button>
              ))}
            </View>
          </DummyFlatList>
        </RBSheet>
      </View>
    </Base>
  );
}
