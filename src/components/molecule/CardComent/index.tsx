import { strings } from "@constants";
import React from "react";
import { View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Amage, TextItem } from "../../atom";
import styles from "./styles";

export default function CardComent({ rating, image, name, time, text }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.boxImageAvatar}>
          <Amage
            source={image}
            style={styles.imageAvatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.boxTitle}>
          <View style={styles.boxText}>
            <TextItem style={styles.titleName}>{name}</TextItem>
            <TextItem style={styles.time}>{time + strings.lalu}</TextItem>
          </View>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={16}
            showRating={false}
            isDisabled={true}
            selectedColor="#E27814"
          />
        </View>
      </View>
      <View>
        <TextItem style={styles.textContent}>{text}</TextItem>
      </View>
    </View>
  );
}
