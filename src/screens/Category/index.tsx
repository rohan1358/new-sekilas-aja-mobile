import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import { skeleton, spacing as sp, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { logger } from "../../helpers/helper";
import { fetchCategorizedBooks } from "../../services";
import { CompactBooksProps } from "../Home/types";
import styles from "./styles";
import { CategoryProps } from "./types";

const Category = ({ navigation, route }: CategoryProps) => {
  const isMounted = useRef<boolean>();

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchCategorizedBooks({
        category: route.params?.payload,
      });
      if (!isMounted.current) {
        return;
      }
      if (!isSuccess) {
        return;
      }
      setBooks(data);
    } catch (error) {
      logger(`Category, getBooks()`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerState = {
    visible: true,
    title: route.params?.title,
    onBackPress: () => navigation.goBack(),
  };

  const keyExtractor = ({ id }: { id: string | number }) => `${id}`;

  const ListEmptyComponent = (
    <EmptyPlaceholder title={strings.noBook} subtitle={strings.booksNotFound} />
  );

  const renderItem = ({ item }: { item: CompactBooksProps }) => (
    <View>
      <BookTile
        title={item?.book_title}
        author={`${item?.author}`}
        duration={item?.read_time}
        cover={item?.book_cover}
        isVideoAvailable={item?.isVideoAvailable}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  useEffect(() => {
    isMounted.current = true;

    getBooks();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainCategory}
      >
        <FlatList
          data={books}
          keyExtractor={keyExtractor}
          numColumns={2}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapperStyle}
          listKey="mostreadbooklist"
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </SkeletonContent>
    </Base>
  );
};

export default Category;
