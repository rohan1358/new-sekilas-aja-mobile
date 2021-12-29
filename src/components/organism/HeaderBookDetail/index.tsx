import { ArrowLeft, Download, HeartBook } from "@assets";
import { neutralColor } from "@constants";
import React from "react";
import { View } from "react-native";
import { Button } from "../../atom";
import styles from "./styles";

export default function HeaderBookDetail({
  navigation,
  onDownload,
  onFavorite,
  active,
  isSubscribe
}: HeaderBookDetailProps) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()}>
        <ArrowLeft color={neutralColor[90]} />
      </Button>
      <View style={styles.boxRight}>
        {/* <Button onPress={() => onDownload && onDownload()} style={styles.btn}>
          <Download color={neutralColor[90]} />
        </Button> */}
        {isSubscribe && (
          <Button
            onPress={() => onFavorite && onFavorite()}
            style={[
              active ? styles.btnHeartActive : styles.btnHeart,
              styles.btn
            ]}
          >
            <HeartBook />
          </Button>
        )}
      </View>
    </View>
  );
}
