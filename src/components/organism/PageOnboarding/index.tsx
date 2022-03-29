import { TextItem } from "../../atom";
import React from "react";
import { Image, View, ScrollView, Dimensions, PixelRatio } from "react-native";
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
        <View style={styles.boxtitle}>
          <TextItem type="b.24.nc.90" style={styles.title}>
            {title}
          </TextItem>
          {/* {height > 700 && ( */}
          <TextItem type="r.16.nc.70" style={styles.sub_title}>
            {subTitle}
          </TextItem>
          {/* )} */}
        </View>
      </View>
    </ScrollView>
  );
}
