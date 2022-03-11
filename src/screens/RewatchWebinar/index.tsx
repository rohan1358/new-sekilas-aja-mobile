import {
  Amage,
  Base,
  Button,
  DummyFlatList,
  HeaderListening,
  TextItem
} from "../../components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Share, View, Platform } from "react-native";
import Orientation, {
  PORTRAIT,
  OrientationLocker,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
  UNLOCK
} from "react-native-orientation-locker";
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
import { heightPercent, logger } from "../../helpers";
import { speedList } from "./dummy";
import Video from "react-native-video";
import { SnackStateProps } from "../../components/atom/Base/types";
import { useFocusEffect } from "@react-navigation/native";
import { closeFloatingMentoring, setVideoMentoringRedux } from "@actions";
import { useDispatch } from "react-redux";

let newParams = {};

export default function RewatchWebinar({ navigation, route }: any) {
  const { id_video, title } = route.params;
  const refRBSheet = useRef();
  const videoPlayer = useRef(null);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBufferLoad, setBuffer] = useState(false);
  const [videoBigbany, setVideoBigbany] = useState({
    uri: "https://api-files.sproutvideo.com/file/069dd8b0181fe6c08f/54cbce85df89c93d/240.mp4"
  });
  // const [videoUrl, setVideoUrl] = useState(videoNusa)

  const [loadRotate, setLoadRotate] = useState(false);

  newParams = route.params;

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setVideoMentoringRedux(newParams));
      };
    }, [])
  );

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = (data: any) => {
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
      videoPlayer.current.seek(currentTime);
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
  useEffect(() => {
    closeFloatingMentoring();

    var myHeaders = new Headers({
      "SproutVideo-Api-Key": "c1c6624f7314a47777f9e3fdb3dcaccf"
    });

    const myRequest = new Request(
      `https://api.sproutvideo.com/v1/videos/${
        id_video || "069dd8b0181fe6c08f"
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

  const [indicator, setIndicator] = useState(true);

  const [newOrientation, setOrientation] = useState<string>(PORTRAIT);

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
    if (indicator) {
      setTimeout(() => {
        setIndicator(false);
      }, 5000);
    }
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

  const testingMode = false;

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        newHandleOrientation(event);
      }}
    >
      {Platform.OS === "ios" ? (
        <>
          {newOrientation.includes(PORTRAIT) ? (
            <OrientationLocker
              orientation={PORTRAIT}
              onDeviceChange={handleOrientation}
            />
          ) : (
            <OrientationLocker
              orientation={LANDSCAPE}
              onDeviceChange={handleOrientation}
            />
          )}
        </>
      ) : (
        <>
          <OrientationLocker
            orientation={"UNLOCK"}
            // onDeviceChange={handleOrientation}
          />
        </>
      )}
      {!loadRotate && (
        <>
          <Base
            barColor={primaryColor.main}
            snackState={snackState}
            setSnackState={setSnackState}
            fullScreen={newOrientation.includes(LANDSCAPE)}
          >
            {!newOrientation.includes(LANDSCAPE) && (
              <HeaderListening
                navigation={navigation}
                onShare={() => onShare()}
                title={title}
              />
            )}

            <View
              style={
                newOrientation.includes(LANDSCAPE)
                  ? { flex: 1 }
                  : styles.boxImage
              }
            >
              {/* { */}
              {!newOrientation.includes(LANDSCAPE) ? (
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
              ) : (
                <>
                  {(isLoading || isBufferLoad) && (
                    <View style={styles.loadVideo}>
                      <ActivityIndicator
                        size="large"
                        color={primaryColor.main}
                      />
                    </View>
                  )}
                </>
              )}

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
                style={
                  Platform.OS === "ios" && newOrientation.includes(LANDSCAPE)
                    ? styles.backgroundVideoIos
                    : styles.backgroundVideo
                }
                paused={play}
                onProgress={onProgress}
                resizeMode={
                  newOrientation.includes(LANDSCAPE) ? "contain" : "cover"
                }
                rate={speed}
              />
              {newOrientation.includes(LANDSCAPE) && indicator && (
                <>
                  <View
                    onTouchStart={(e) => toggleIndicator()}
                    style={{
                      flex: 1,
                      position: "absolute",
                      //backgroundColor: "white",
                      backgroundColor: "#3B3B3B",
                      height: 1900,
                      width: "100%",
                      opacity: 0.5
                    }}
                  ></View>
                  <View
                    style={{
                      bottom: 0,
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "center"
                    }}
                  >
                    <View
                      style={[
                        styles.boxAction,
                        {
                          width: "100%"
                          // marginBottom: heightPercent(15)
                        }
                      ]}
                    >
                      <Button onPress={() => handlePrev()}>
                        <RotateCcw height={25} color={neutralColor[10]} />
                      </Button>
                      <Button>
                        <SkipBackFullScreen color={neutralColor[10]} />
                      </Button>
                      <Button onPress={() => setPlay(!play)}>
                        {play ? (
                          <Play
                            color={neutralColor[10]}
                            style={styles.iconPlay}
                          />
                        ) : (
                          <Pause color={neutralColor[10]} />
                        )}
                      </Button>
                      <Button>
                        <SkipForwardFullScreen color={neutralColor[10]} />
                      </Button>
                      <Button onPress={() => handleNext()}>
                        <RotateCw height={25} color={neutralColor[10]} />
                      </Button>
                    </View>
                    <View
                      style={{ width: "90%", position: "absolute", bottom: 0 }}
                    >
                      <View style={styles.boxTextTime}>
                        <TextItem type={"r.14.nc.10"}>
                          {_convertDuration(currentTime)}/
                          {_convertDuration(duration - currentTime)}
                        </TextItem>
                        <Button
                          onPress={() => {
                            handleOrientation(PORTRAIT);
                          }}
                        >
                          <Minimize
                            width={25}
                            height={25}
                            color={neutralColor[10]}
                          />
                        </Button>
                        {/* <TextItem type={"r.14.nc.10"}>
                      <Minimize
                        onPress={() => handleOrientation(PORTRAIT)}
                        width={25}
                        height={25}
                        color={neutralColor[10]}
                      />
                    </TextItem> */}
                      </View>
                      <Slider
                        value={currentTime}
                        containerStyle={styles.SliderContainer}
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor={neutralColor[10]}
                        maximumTrackTintColor={"#D1D7E1"}
                        thumbTintColor={colors.white}
                        trackStyle={styles.trackSliderStyle}
                        onValueChange={(value) => {
                          videoPlayer.current.seek(Number(value));
                          setCurrentTime(Number(value));
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            {!newOrientation.includes(LANDSCAPE) && (
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
                        {_convertDuration(duration - currentTime)}
                      </TextItem>
                      <Button
                        onPress={() => {
                          handleOrientation(LANDSCAPE);
                        }}
                      >
                        <Maximize height={25} color={neutralColor[90]} />
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
                      <RotateCcw height={25} color={neutralColor[90]} />
                    </Button>
                    <Button>
                      <SkipBack color={neutralColor[90]} />
                    </Button>
                    <Button onPress={() => setPlay(!play)} style={styles.play}>
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
                      <RotateCw height={25} color={neutralColor[90]} />
                    </Button>
                  </View>
                  <View style={styles.boxFooter}>
                    <Button onPress={() => refRBSheet.current.open()}>
                      <TextItem type={"b.14.nc.90"} style={styles.speedText}>
                        {strings.kecepatan + speed.toString() + strings.x}
                      </TextItem>
                    </Button>
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
            )}
          </Base>
        </>
      )}
    </View>
  );
}
