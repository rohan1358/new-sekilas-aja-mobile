import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Base, TextItem, Gap } from "../../components";
import { primaryColor, spacing as sp } from "../../constants";

const Home = () => {
  const ListHeaderComponent = (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: sp.m,
          paddingHorizontal: sp.sl,
          backgroundColor: primaryColor.main,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 48,
            overflow: "hidden",
          }}
        ></View>
        <Gap horizontal={sp.xs} />
        <View style={{ flex: 1 }}>
          <TextItem type="r.14.nc.80">Selamat membaca</TextItem>
          <TextItem type="b.24.nc.90">Grace Natanael</TextItem>
        </View>
        <View style={{ width: 48, height: 48, backgroundColor: "red" }}></View>
      </View>
      <View
        style={{
          height: 64,
          backgroundColor: primaryColor.main,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          top: -sp.m,
        }}
      ></View>
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
