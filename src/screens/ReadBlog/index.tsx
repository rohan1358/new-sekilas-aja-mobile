import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";

export default function Index() {
  const { params } = useRoute();
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: `https://sekilasaja.com/blog/${params}` }} />
    </View>
  );
}
