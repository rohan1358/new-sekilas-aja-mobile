import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Amage } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const ImageBanner = ({ source, data }: ImageBannerProps) => {
  const move = useNavigation();

  const handleNavigation = () => {
    if (data?.type === "book") {
      move.navigate("BookDetail", { id: data?.bookTitle });
    } else if (data?.type === "navigate") {
      move.navigate(data?.navigate.to, data?.navigate.param);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleNavigation();
        }}
      >
        <Amage style={styles.image} source={source} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageBanner;
