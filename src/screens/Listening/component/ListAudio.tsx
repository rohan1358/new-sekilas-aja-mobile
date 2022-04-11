import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextItem } from "../../../components";
import { neutralColor, primaryColor } from "@constants";
import { Pause, Play } from "@assets";
import styles from "./styles";
import { adjust, checkData } from "../../../utils";

const ListAudio = ({ audio, id, onPress, active }: any) => {
  return (
    <>
      {checkData(audio.duration) && (
        <>
          <Button
            style={{
              paddingVertical: adjust(5),
              marginVertical: adjust(5)
            }}
            onPress={() => onPress(audio)}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center"
              }}
            >
              <View style={styles.play}>
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
              </View>
              <View style={styles.titleAudio}>
                <View
                  style={{
                    width: "90%"
                  }}
                >
                  <TextItem type={"r.18.ncb.90"} numberOfLines={2}>
                    Kilas {id + 1} :{" "}
                    {checkData(audio.text) ? audio.text : "Ringkasan Akhir"}
                  </TextItem>
                </View>
              </View>
              <TextItem type={"n.15.ncb.90"}>
                {checkData(audio.duration) ? (
                  <>
                    {new Date(audio.duration * 1000)
                      .toISOString()
                      .substr(14, 5)}
                  </>
                ) : (
                  "duration"
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
