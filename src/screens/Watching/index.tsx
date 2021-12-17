import {
  Amage,
  Base,
  Button,
  DummyFlatList,
  HeaderListening,
  TextItem,
} from "../../components";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Share, View } from "react-native";
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
  Headphones,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
} from "@assets";
import RBSheet from "react-native-raw-bottom-sheet";
import { heightPercent } from "../../helpers";
import { speedList } from "./dummy";
import Video from "react-native-video";
import { SnackStateProps } from "../../components/atom/Base/types";

const videoBigbany = {
  uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

export default function Watching({ navigation }: any) {
  const refRBSheet = useRef();
  const videoPlayer = useRef(null);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBufferLoad, setBuffer] = useState(false);
  // const [videoUrl, setVideoUrl] = useState(videoNusa)

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onProgress = (data) => {
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
    // console.log(minutes)
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
      console.log(error.message);
    }
  };

  const navigationTopBar = (type = "") => {
    switch (type) {
      case "reading":
        navigation.navigate(pages.Listening);
        break;
      case "listening":
        navigation.navigate(pages.Listening);
        break;
      case "watching":
        navigation.navigate(pages.Watching);
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
        title="Bab 2 : Keberuntungan"
      />
      <View style={styles.content}>
        <View style={styles.boxImage}>
          {isLoading && (
            <View style={styles.loadVideo}>
              <ActivityIndicator size="large" color={primaryColor.main} />
            </View>
          )}
          {isBufferLoad && (
            <View style={styles.loadVideoActive}>
              <ActivityIndicator size="large" color={primaryColor.main} />
            </View>
          )}
          <Video
            ref={videoPlayer}
            source={videoBigbany}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            style={styles.backgroundVideo}
            paused={play}
            onProgress={onProgress}
            resizeMode="cover"
            rate={speed}
          />
        </View>
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
            <TextItem>{_convertDuration(currentTime)}</TextItem>
            <TextItem>{_convertDuration(duration - currentTime)}</TextItem>
          </View>
        </View>
        <View style={styles.boxAction}>
          <Button onPress={() => handlePrev()}>
            <RotateCcw height={25} color={neutralColor[90]} />
          </Button>
          <Button>
            <SkipBack color={neutralColor[90]} />
          </Button>
          <Button onPress={() => setPlay(!play)} style={styles.play}>
            {play ? (
              <Play color={primaryColor.main} style={styles.iconPlay} />
            ) : (
              <Pause color={primaryColor.main} />
            )}
          </Button>
          <Button>
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
              onPress={() => navigationTopBar("listening")}
              style={styles.btnBar}
            >
              <Headphones />
              <TextItem style={styles.titleSelect}>{strings.dengar}</TextItem>
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
              {strings.kecepatan_video}
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
                    refRBSheet.current.close();
                    setTimeout(() => {
                      setSpeed(item);
                    }, 1200);
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
