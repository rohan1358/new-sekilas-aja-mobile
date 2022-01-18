import { Notif2 } from "@assets";
import { Button, TextItem } from "@components";
import { ReduxState } from "@rux";
import React from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { checkData, formatDate } from "../../../../utils";
import styles from "./styles";

export default function Card({ item, onPress }: any) {
  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const { users, text, content, title, timestamp } = item;

  return (
    <>
      {!users?.includes(email) ? (
        <Button
          onPress={() => onPress && onPress(item)}
          style={styles.container_active}
        >
          {Notif2 && (
            <View style={styles.boxImage}>
              <Image style={styles.image} source={Notif2} />
            </View>
          )}
          <TextItem style={styles.title_active}>{title}</TextItem>
          <TextItem style={styles.text_active}>{text || content}</TextItem>
          <TextItem style={styles.time_active}>
            {checkData(timestamp) && formatDate(timestamp.toDate())}
          </TextItem>
        </Button>
      ) : (
        <Button
          onPress={() => onPress && onPress(item)}
          style={styles.container}
        >
          {Notif2 && (
            <View style={[styles.boxImage, styles.boxImageAnActive]}>
              <Image style={styles.image} source={Notif2} />
            </View>
          )}
          <TextItem style={styles.title}>{title}</TextItem>
          <TextItem style={styles.text}>{text || content}</TextItem>
          <TextItem style={styles.time}>
            {checkData(timestamp) && formatDate(timestamp.toDate())}
          </TextItem>
        </Button>
      )}
    </>
  );
}
