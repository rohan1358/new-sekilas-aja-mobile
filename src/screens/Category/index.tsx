import { ArrowLeft } from "@assets";
import { Base, BookTile, Gap, TextItem } from "@components";
import { neutralColor, spacing as sp } from "@constants";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { flatCategories } from "../../../assets/dummy/flatCategories";
import { logger } from "../../helpers/helper";
import { fetchCategorizedBooks } from "../../services";
import styles from "./styles";
import { CategoryProps } from "./types";

const Category = ({ navigation, route }: CategoryProps) => {
  const [books, setBooks] = useState<any[]>();

  const getBooks = async () => {
    try {
      const { data } = await fetchCategorizedBooks({
        category: flatCategories[1],
      });
      setBooks(data);
    } catch (error) {
      logger(`Category, getBooks()`, error);
    }
  };

  useEffect(() => {
    // getBooks();
  }, []);

  return (
    <Base>
      <View
        style={{
          height: 64,
          paddingLeft: 20,
          paddingRight: sp.sl,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: neutralColor[50],
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
        <Gap horizontal={sp.xxs} />
        <TextItem type="b.20.nc.90.c">Buku Serupa</TextItem>
      </View>

      <FlatList
        data={books}
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
        contentContainerStyle={{ padding: sp.sl }}
        showsVerticalScrollIndicator={false}
      />
    </Base>
  );
};

export default Category;
