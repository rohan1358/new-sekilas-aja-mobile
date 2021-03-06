import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import { skeleton, spacing as sp, strings } from "@constants";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import {
  fetchBookByFavorit,
  fetchDoneReading,
  fetchMostBooks,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks
} from "../../services";
import { SpecialCategoryProps } from "../../types";
import { CompactBooksProps } from "../Home/types";
import styles from "./styles";
import { SpecialBookListProps } from "./types";

const dataSelector = (
  type: SpecialCategoryProps,
  id: any
): { title: string; api(): Promise<FetchResponse> } => {
  switch (type) {
    case "recommendation":
      return { title: strings.recommendedBook, api: fetchRecommendedBooks };

    case "newRelease":
      return { title: strings.newRelease, api: fetchReleasedBooks };

    case "mostRead":
      return { title: strings.mostRead, api: fetchMostBooks };

    case "trending":
      return { title: strings.mostRead, api: fetchTrendBooks };
    case "myFavorite":
      return { title: strings.myFavorite, api: () => fetchBookByFavorit(id) };
    case "doneReading":
      return {
        title: strings.finishedBooks,
        api: () => fetchDoneReading(id)
      };

    default:
      return { title: "", api: fetchRecommendedBooks };
  }
};

const SpecialBookList = ({ navigation, route }: SpecialBookListProps) => {
  const isMounted = useRef<boolean>();

  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const { title, api } = dataSelector(route.params?.type, email);

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const { data, isSuccess } = await api();
      if (!isMounted.current) {
        return;
      }
      if (!isSuccess) {
        return;
      }
      setBooks(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const headerState = {
    visible: true,
    title: title?.split(" ").map((item) => {
      const firstLetter = item.charAt(0).toUpperCase();
      const restLetters = item?.slice(1, item.length);
      return `${firstLetter}${restLetters} `;
    }),
    onBackPress: () => navigation.goBack()
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
        onPress={(id) => navigation.navigate("BookDetail", { id })}
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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getBooks();

      return () => {
        getBooks();
        isActive = false;
      };
    }, [])
  );

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

export default SpecialBookList;
