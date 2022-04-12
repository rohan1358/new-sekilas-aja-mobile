import { Button, TextItem } from "@components";
import { ReduxState } from "@rux";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { checkData, formatDate } from "../../../../utils";
import styles from "./styles";
import { getCoverNotification } from "./../../../../services/notification/index";
import { neutralColor } from "@constants";

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
          {coverLink && (
            <View style={styles.boxImage}>
              <Image style={styles.image} source={{ uri: coverLink }} />
            </View>
          )}
          <TextItem
            style={[
              styles.title_active,
              {
                color: neutralColor[90]
              }
            ]}
          >
            {title}
          </TextItem>
          <TextItem
            style={[
              styles.text_active,
              {
                color: neutralColor[80]
              }
            ]}
            numberOfLines={2}
          >
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
          {coverLink && (
            <View style={[styles.boxImage, styles.boxImageAnActive]}>
              <Image style={styles.image} source={{ uri: coverLink }} />
            </View>
          )}
          <TextItem
            style={[
              styles.title,
              {
                color: neutralColor[60]
              }
            ]}
          >
            {title}
          </TextItem>
          <TextItem
            style={[
              styles.text,
              {
                color: neutralColor[50]
              }
            ]}
            numberOfLines={2}
          >
            {text || content}
          </TextItem>
          <TextItem
            style={[
              styles.time,
              {
                color: neutralColor[60]
              }
            ]}
          >
            {checkData(timestamp) && formatDate(timestamp.toDate())}
          </TextItem>
        </Button>
      )}
    </>
  );
}
