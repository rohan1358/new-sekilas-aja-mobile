import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Base, TextItem } from "../../components";
import { HomeHeader, OngoingTile } from "../../components/organism";
import {
  neutralColor,
  primaryColor,
  spacing as sp,
  successColor,
} from "../../constants";
import { logger, widthPercent } from "../../helpers/helper";
import styles from "./styles";

const Home = () => {
  const ListHeaderComponent = (
    <>
      <HomeHeader
        name="Taufan"
        uri=""
        onBellPress={() => logger("bell pressed")}
      />
      <View>
        <View style={styles.dummyHeader} />
        <OngoingTile bookTitle="The Design of Everyday Thinking" bookUri="" />
      </View>
    </>
  );
  return (
    <Base barColor={primaryColor.main}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={ListHeaderComponent}
      />
    </Base>
  );
};

export default Home;
