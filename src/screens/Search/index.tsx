import { ArrowLeft, CloseX, Search as SearchIcon } from "@assets";
import { Base, Button, Gap, TextField, TextItem } from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styles from "./styles";

const Search = () => {
  return (
    <Base barColor={primaryColor.main} backgroundColor={neutralColor[20]}>
      <View
        style={{
          flexDirection: "row",
          paddingRight: sp.sl,
          paddingLeft: sp.sm,
          paddingVertical: 10,
          backgroundColor: primaryColor.main,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeft stroke={neutralColor[90]} width={24} height={24} />
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.iconContainer}>
            <SearchIcon stroke={neutralColor[90]} />
          </View>
          <TextField
            placeholder={strings.findFavBookPlaceholder}
            containerStyle={styles.inputContainerStyle}
            noBottomGap
            innerContainerStyle={styles.inputInnerContainerStyle}
            inputStyle={styles.inputStyle}
            // onChangeText={onChangeText}
            // defaultValue={keyword}
            // ref={ref}
          />
          <View style={styles.iconContainer}>
            <Animated.View>
              <Button>
                <CloseX stroke={neutralColor[90]} />
              </Button>
            </Animated.View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: neutralColor[10],
          paddingHorizontal: sp.sl,
          paddingVertical: sp.sm,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextItem type="b.24.nc.90">Pencarian terbaru</TextItem>
        <Button>
          <TextItem type="b.14.dc.main">Hapus</TextItem>
        </Button>
      </View>
      <View
        style={{
          backgroundColor: neutralColor[10],
          paddingHorizontal: sp.sl,
          paddingVertical: sp.l,
        }}
      >
        <TextItem type="r.16.nc.70">
          Saat ini kamu tidak memiliki pencarian terbaru
        </TextItem>
      </View>
      <Gap vertical={sp.sm} />
      <View
        style={{
          backgroundColor: neutralColor[10],
          paddingHorizontal: sp.sl,
          paddingVertical: sp.sm,
        }}
      >
        <TextItem type="b.24.nc.90">Kategori Buku</TextItem>
      </View>
    </Base>
  );
};

export default Search;
