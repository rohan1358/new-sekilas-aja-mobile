import { Base, Button, Chips, Gap, SearchHeader, TextItem } from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { categories } from "../../../assets/dummy";
import { logger } from "../../helpers/helper";
import styles from "./styles";

const Search = () => {
  const searchRef = useRef<any>();
  const [keyword, setKeyword] = useState<string>();

  const closePress = () => {
    setKeyword("");
    searchRef.current?.clear();
  };

  return (
    <Base barColor={primaryColor.main} backgroundColor={neutralColor[20]}>
      <SearchHeader
        keyword={keyword}
        onChangeText={setKeyword}
        closePress={closePress}
        ref={searchRef}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={styles.categoriesContainer}>
          <TextItem type="b.24.nc.90.c">{strings.bookCategory}</TextItem>
          <Gap vertical={sp.sm} />
          <View style={styles.categoriesWrapper}>
            {categories.map((item) => (
              <View key={`${item.label}`}>
                <View style={styles.chipsContainer}>
                  <Chips
                    label={item.label}
                    id={item.id}
                    Icon={item.Icon}
                    onPress={() => logger("test")}
                  />
                  <Gap horizontal={sp.xs} />
                </View>
                <Gap vertical={sp.sm} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Base>
  );
};

export default Search;
