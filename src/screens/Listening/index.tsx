import {
  Amage,
  Base,
  Button,
  DummyFlatList,
  HeaderListening,
  TextItem,
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
  strings,
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
  Video,
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
  Event,
} from "react-native-track-player";
import { ScrollView } from "react-native-gesture-handler";

const listSoundTrack = [
  {
    artist: "Morgan House",
    title: "The Psychology of Money",
    url: require("../../../assets/soundtrack/Books.mp3"),
  },
  {
    artist: "unknow",
    title: "Remix Broken Angel",
    url: require("../../../assets/soundtrack/Remix.mp3"),
  },
];

TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

export default function Listening({ navigation }: any) {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const refRBSheet = useRef();
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [speed, setSpeed] = useState(1.0);
  const [valueProgress, setValue] = useState(0);
  const [titleTrack, setTitle] = useState();
  const [authorTrack, setAuthor] = useState();

  const setupPlayer = async () => {
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
        message: "https://sekilasaja.com/",
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

  const navigationTopBar = async (type = "") => {
    switch (type) {
      case "reading":
        navigation.navigate(pages.Listening);
        await TrackPlayer.pause();
        break;
      case "watching":
        navigation.navigate(pages.Watching);
        await TrackPlayer.pause();
        break;

      default:
        break;
    }
  };

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <HeaderListening
        navigation={navigation}
        onShare={() => onShare()}
        title="Bab 3 : Tak Pernah Cukup"
      />
      <View style={styles.content}>
        <View style={styles.boxImage}>
          <Amage resizeMode="contain" />
        </View>
        <View style={styles.containerTitle}>
          <LinearGradient
            colors={[
              primaryColor.main,
              "rgba(251, 207, 50, 0.5)",
              "transparent",
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
              primaryColor.main,
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
            <TextItem>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </TextItem>
            <TextItem>
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
          <Button onPress={async () => await TrackPlayer.skipToPrevious()}>
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
          <Button onPress={async () => await TrackPlayer.skipToNext()}>
            <SkipForward color={neutralColor[90]} />
          </Button>
          <Button onPress={() => handleNext()}>
            <RotateCw height={25} color={neutralColor[90]} />
          </Button>
        </View>
        <View style={styles.boxFooter}>
          <Button onPress={() => refRBSheet.current.open()}>
            <TextItem style={styles.speedText}>
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
            <Button
              onPress={() => navigationTopBar("watching")}
              style={styles.btnBar}
            >
              <Video />
              <TextItem style={styles.titleSelect}>{strings.tonton}</TextItem>
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
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        }}
        height={heightPercent(42)}
      >
        <View>
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
        </View>
      </RBSheet>
    </Base>
  );
}
