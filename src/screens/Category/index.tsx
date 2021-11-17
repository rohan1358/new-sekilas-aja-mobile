import { ArrowLeft } from "@assets";
import { Base, BookTile, Gap, TextItem } from "@components";
import { neutralColor, spacing as sp } from "@constants";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { flatCategories } from "../../../assets/dummy/flatCategories";
import { heightPercent, logger, winHeightPercent } from "../../helpers/helper";
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
    <Base
      headerState={{
        visible: true,
        title: "Buku Serupa",
        onBackPress: () => navigation.goBack(),
      }}
    >
      <FlatList
        data={[]}
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
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: winHeightPercent(100) - 64 - 32 * 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextItem type="b.24.nc.90" style={{ textAlign: "center" }}>
              Buku Tidak Ada
            </TextItem>
            <TextItem type="r.14.nc.90" style={{ textAlign: "center" }}>
              Buku yang kamu cari tidak ditemukan
            </TextItem>
          </View>
        }
      />
    </Base>
  );
};

export default Category;
