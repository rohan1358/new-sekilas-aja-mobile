import { TextItem } from "../../atom";
import React from "react";
import { Image, View, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import { heightPercent } from "@helpers";

export default function PagesOnboarding({ image, title, subTitle }: any) {
  let height = Dimensions.get("screen").height;
  return (
    <ScrollView>
      <View style={[styles.pageContainer]}>
        <View style={styles.boxImage}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={height > 550 && styles.boxtitle}>
          <TextItem type="b.26.nc.90" style={styles.title}>
            {title}
          </TextItem>
          {height > 800 && (
            <TextItem type="r.16.nc.70" style={styles.sub_title}>
              {subTitle}
            </TextItem>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
