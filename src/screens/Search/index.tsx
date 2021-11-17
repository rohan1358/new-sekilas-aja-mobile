import { Search as SearchIcon } from "@assets";
import {
  Base,
  BookTile,
  Button,
  Chips,
  DummyFlatList,
  Gap,
  SearchHeader,
  TextIcon,
  TextItem,
} from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React, { useMemo, useRef, useState } from "react";
import { FlatList, Keyboard, ScrollView, View } from "react-native";
import { categories } from "../../../assets/dummy";
import { logger } from "../../helpers/helper";
import styles from "./styles";
import { SearchProps } from "./types";

const dummyKeywords = [
  "fadlin",
  "taufan",
  "prihantoro",
  "aida",
  "muhdina",
  "thoriq",
  "naufal",
  "ayah",
  "mama",
  "bude",
  "pakde",
  "miki",
  "mikoy",
];

const Search = ({ navigation }: SearchProps) => {
  const searchRef = useRef<any>();
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const bookCandidate = useMemo(() => {
    if (!keyword || keyword?.length < 3) {
      return [];
    }
    return dummyKeywords
      .filter((item) =>
        item?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
      .slice(0, 3);
  }, [keyword]);

  const closePress = () => {
    setKeyword("");
    setIsSearched(false);
    searchRef.current?.clear();
  };

  return (
    <Base
      barColor={primaryColor.main}
      backgroundColor={neutralColor[isSearched ? 10 : 20]}
    >
      <SearchHeader
        keyword={keyword}
        onChangeText={setKeyword}
        closePress={closePress}
        ref={searchRef}
        onSubmitEditing={() => setIsSearched(true)}
        backPress={() => navigation.goBack()}
      />
      <DummyFlatList>
        {isSearched ? (
          <View style={{ padding: sp.sl }}>
            <FlatList
              data={[
                {
                  id: "fasdfer",
                  book_title: "Test Book",
                  author: "Taufan",
                  book_cover: "",
                  read_time: 10,
                },
              ]}
              keyExtractor={({ id }: { id: string | number }) => `${id}`}
              numColumns={2}
              renderItem={({ item }: { item: CompactBooksProps }) => (
                <View>
                  <BookTile
                    title={item?.book_title}
                    author={`${item?.author}`}
                    duration={item?.read_time}
                    cover={item?.book_cover}
                  />
                  <Gap vertical={sp.sl} />
                </View>
              )}
              columnWrapperStyle={styles.columnWrapperStyle}
              listKey="mostreadbooklist"
            />
          </View>
        ) : (
          <>
            <View style={styles.newSearchContainer}>
              {bookCandidate?.length === 0 ? (
                <>
                  <View style={styles.newSearchText}>
                    <TextItem type="b.24.nc.90">{strings.newSearch}</TextItem>
                    <Button>
                      <TextItem type="b.14.dc.main">{strings.delete}</TextItem>
                    </Button>
                  </View>
                  <View style={styles.emptySearch}>
                    <TextItem type="r.16.nc.70">{strings.searchEmpty}</TextItem>
                  </View>
                </>
              ) : (
                <>
                  {bookCandidate.map((item) => (
                    <TextIcon
                      onPress={(value) => {
                        setKeyword(value.label);
                        setIsSearched(true);
                        Keyboard.dismiss();
                      }}
                      item={{ id: item, label: item }}
                      key={`${item}`}
                    />
                  ))}
                </>
              )}
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
          </>
        )}
      </DummyFlatList>
    </Base>
  );
};

export default Search;
