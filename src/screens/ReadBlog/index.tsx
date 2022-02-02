import { View, Text } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import { Button, Gap, TextItem } from "@atom";
import { ArrowLeft } from "@assets";
import { neutralColor, spacing } from "@constants";
import styles from "./styles";

export default function Index() {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Gap vertical={spacing.sm} />

        <View style={styles.headerTitle}>
          <Button onPress={() => goBack()}>
            <ArrowLeft color={neutralColor[90]} />
          </Button>
          <TextItem
            style={{
              marginLeft: 5
            }}
            type="b.24.nc.90"
          >
            {"Baca SekilasAja Blog"}
          </TextItem>
          {/* <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button> */}
        </View>
        <Gap vertical={spacing.sm} />
      </View>
      <WebView source={{ uri: `https://sekilasaja.com/blog/${params}` }} />
    </View>
  );
}
