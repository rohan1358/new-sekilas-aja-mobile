import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import { skeleton, spacing as sp, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { logger, useMounted } from "@helpers";
import { fetchCategorizedBooks } from "@services";
import styles from "./styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "src/types";

const Category = () => {
  const isMounted = useMounted();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Category">>();

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchCategorizedBooks({
        category: route.params?.payload,
      });
      if (!isMounted) return;
      if (!isSuccess) return;

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
        onPress={(id) => navigation.navigate("BookDetail", { id })}
        navSubscrive={() => navigation.navigate("Subscribe")}
      />
      <Gap vertical={sp.sl} />
    </View>
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
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </SkeletonContent>
    </Base>
  );
};

export default Category;
