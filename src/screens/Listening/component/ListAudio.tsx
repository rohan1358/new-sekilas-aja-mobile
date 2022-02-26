import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextItem } from "../../../components";
import { primaryColor } from "@constants";
import { Pause, Play } from "@assets";
import styles from "./styles";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { checkData } from "../../../utils";
import axios from "axios";

const ListAudio = ({ audio, id, onPress, active }: any) => {
  // const { duration } = useProgress();

  const [duration, setDuration] = useState<any>(false);

  useEffect(() => {
    const body = {
      audio: audio.url
    };

    let baseUrl = "https://mouse-ku.herokuapp.com";

    axios
      .post(`${baseUrl}/get-audio-duration`, body)
      .then((res) => {
        const { status, data } = res.data;
        if (status === 200) {
          setDuration(data);
        }

        axios.delete(`${baseUrl}/delete-audio`);
      })
      .catch((err) => {
        // console.log("error", err);
      });
  }, []);

  return (
    <>
      {checkData(duration) && (
        <>
          <Button onPress={() => onPress(audio)}>
            <View
              style={{
                flexDirection: "row",
                flex: 1
              }}
            >
              <Button style={styles.play}>
                {active ? (
                  <Pause color={primaryColor.main} />
                ) : (
                  <Play color={primaryColor.main} style={styles.iconPlay} />
                )}

                {/* {playbackState === State.Playing ? (
              <Pause color={primaryColor.main} />
            ) : (
              <Play color={primaryColor.main} style={styles.iconPlay} />
            )} */}
              </Button>
              <View style={styles.titleAudio}>
                <TextItem type={"r.18.nc.90"} numberOfLines={1}>
                  {checkData(audio.text) ? audio.text : "Ringkasan Akhir"}
                </TextItem>
              </View>
              <TextItem>
                {checkData(audio.duration) ? (
                  <>
                    {new Date(audio.duration * 1000)
                      .toISOString()
                      .substr(14, 5)}
                  </>
                ) : (
                  <>
                    {checkData(duration) ? (
                      <>
                        {new Date(duration * 1000).toISOString().substr(14, 5)}
                      </>
                    ) : (
                      "duration"
                    )}
                  </>
                )}
              </TextItem>
            </View>
          </Button>
        </>
      )}
    </>
  );
};

export default ListAudio;
