import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Amage } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const ImageBanner = ({ source, data }: ImageBannerProps) => {
  const move = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          move.navigate("BookDetail", { id: data?.bookTitle });
        }}
      >
        <Amage style={styles.image} source={source} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageBanner;
