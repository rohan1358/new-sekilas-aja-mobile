import { ChevronLeft, ChevronRight } from "@assets";
import { Gap, TextItem } from "../../atom";
import { ButtonIcon } from "../../molecule";
import { neutralColor, spacing as sp } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const PageController = ({
  onPrevPress,
  isOnFirstPage,
  label,
  onNextPress,
  isOnLastPage,
}: PageControllerProps) => {
  const s = styles({ isOnFirstPage, isOnLastPage });
  return (
    <View style={s.container}>
      <ButtonIcon
        onPress={onPrevPress}
        disabled={isOnFirstPage}
        style={s.prevButton}
      >
        <ChevronLeft stroke={neutralColor[70]} />
      </ButtonIcon>
      <Gap horizontal={sp.s} />
      <TextItem type="r.16.nc.70">{label}</TextItem>
      <Gap horizontal={sp.s} />
      <ButtonIcon
        onPress={onNextPress}
        disabled={isOnLastPage}
        style={s.nextButton}
      >
        <ChevronRight stroke={neutralColor[70]} />
      </ButtonIcon>
    </View>
  );
};

export default PageController;
