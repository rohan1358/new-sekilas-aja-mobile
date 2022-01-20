import { Button, TextItem } from "@components";
import { ReduxState } from "@rux";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { checkData, formatDate } from "../../../../utils";
import styles from "./styles";
import { getCoverNotification } from "./../../../../services/notification/index";

export default function Card({ item, onPress }: any) {
  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const [coverNotif, setCoverNotif] = useState(false);

  const { users, text, content, title, timestamp, coverLink } = item;

  useEffect(() => {
    getCoverNotification(coverLink)
      .then((res: any) => {
        if (res.data) {
          setCoverNotif(res.data);
        }
      })
      .catch((err) => {
        setCoverNotif(Notif2);
      });
    // getImg()
  }, []);

  return (
    <>
      {!users?.includes(email) ? (
        <Button
          onPress={() => onPress && onPress(item)}
          style={styles.container_active}
        >
          {coverNotif && (
            <View style={styles.boxImage}>
              <Image style={styles.image} source={{ uri: coverNotif }} />
            </View>
          )}
          <TextItem style={styles.title_active}>{title}</TextItem>
          <TextItem style={styles.text_active} numberOfLines={2}>
            {text || content}
          </TextItem>
          <TextItem style={styles.time_active}>
            {checkData(timestamp) && formatDate(timestamp.toDate())}
          </TextItem>
        </Button>
      ) : (
        <Button
          onPress={() => onPress && onPress(item)}
          style={styles.container}
        >
          {coverNotif && (
            <View style={[styles.boxImage, styles.boxImageAnActive]}>
              <Image style={styles.image} source={{ uri: coverNotif }} />
            </View>
          )}
          <TextItem style={styles.title}>{title}</TextItem>
          <TextItem style={styles.text} numberOfLines={2}>
            {text || content}
          </TextItem>
          <TextItem style={styles.time}>
            {checkData(timestamp) && formatDate(timestamp.toDate())}
          </TextItem>
        </Button>
      )}
    </>
  );
}
