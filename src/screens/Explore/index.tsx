import { Base, DummyFlatList, Gap, TextField, TextItem } from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React from "react";
import { View } from "react-native";

const Explore = () => {
  return (
    <Base barColor={primaryColor.main}>
      <DummyFlatList>
        <View
          style={{
            backgroundColor: primaryColor.main,
            paddingHorizontal: sp.sl,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          <Gap vertical={sp.m} />
          <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
          <Gap vertical={sp.sm} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                width: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <TextField
              placeholder="Cari buku favoritmu di sini.."
              containerStyle={{ flex: 1 }}
              noBottomGap
              innerContainerStyle={{
                borderWidth: 0,
                backgroundColor: neutralColor[10],
                borderRadius: 0,
              }}
            />

            <View
              style={{
                backgroundColor: "blue",
                width: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </View>
          <Gap vertical={sp.m} />
        </View>
      </DummyFlatList>
    </Base>
  );
};

export default Explore;
