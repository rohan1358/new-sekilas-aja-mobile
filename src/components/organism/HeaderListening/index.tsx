import { ArrowLeft, ShareIcon } from "@assets";
import { neutralColor, primaryColor } from "@constants";
import React from "react";
import { ScrollView, View, Platform, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

export default function HeaderListening({
  navigation,
  onShare,
  title = ""
}: any) {
  const dimensionWidth = Dimensions.get("screen").width;

  return (
    <View style={styles.container}>
      <Button
        onPress={() => (navigation.goBack ? navigation.goBack() : navigation())}
        style={styles.btn}
      >
        <ArrowLeft color={neutralColor[90]} />
      </Button>
      <>
        {Platform.OS === "ios" ? (
          <></>
        ) : (
          dimensionWidth > 320 && (
            <LinearGradient
              colors={[
                primaryColor.main,
                "rgba(251, 207, 50, 0.5)",
                "transparent"
              ]}
              useAngle={true}
              angle={45}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={styles.gradientLeft}
            />
          )
        )}
        <View style={styles.boxTitle}>
          {/* <TextTicker
                    duration={3000}
                    loop
                    animationType='scroll'
                    repeatSpacer={50}
                    marqueeDelay={1000}
                > */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TextItem style={styles.title}>{title}</TextItem>
          </ScrollView>
          {/* </TextTicker> */}
        </View>
        {Platform.OS === "ios" ? (
          <></>
        ) : (
          dimensionWidth > 320 && (
            <LinearGradient
              colors={[
                "transparent",
                "rgba(251, 207, 50, 0.5)",
                primaryColor.main
              ]}
              useAngle={true}
              angle={45}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={styles.gradientRight}
            />
          )
        )}
      </>

      <Button onPress={() => onShare && onShare()} style={styles.btn}>
        <ShareIcon color={neutralColor[90]} />
      </Button>
    </View>
  );
}
