import { neutralColor, strings, warningColor } from "@constants";
import React from "react";
import { View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { openRate } from "../../../utils";
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
            <TextItem
              style={[
                styles.titleName,
                {
                  color: neutralColor[90]
                }
              ]}
            >
              {name}
            </TextItem>
            <TextItem
              style={[
                styles.time,
                {
                  color: neutralColor[60]
                }
              ]}
            >
              {time}
            </TextItem>
            {/* <TextItem style={styles.time}>{time + strings.lalu}</TextItem> */}
          </View>
          {openRate && (
            <AirbnbRating
              count={5}
              defaultRating={rating}
              size={16}
              showRating={false}
              isDisabled={true}
              selectedColor={warningColor.main}
            />
          )}
        </View>
      </View>
      <View>
        <TextItem style={styles.textContent}>{text}</TextItem>
      </View>
    </View>
  );
}
