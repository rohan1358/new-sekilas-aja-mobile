import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import { skeleton, spacing as sp, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector } from "react-redux";
import { logger } from "../../helpers";
import { ReduxState } from "../../redux/reducers";
import {
  fetchBooks,
  fetchCategorizedBooks,
  fetchFavoriteBooks,
  fetchMostBooks,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks,
} from "../../services";
import { SpecialCategoryProps } from "../../types";
import { CompactBooksProps } from "../Home/types";
import styles from "./styles";
import { SpecialBookListProps } from "./types";

const dataSelector = (
  type: SpecialCategoryProps
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
        return { title: strings.myFavorite, api: fetchBooks };

    default:
      return { title: "", api: fetchRecommendedBooks };
  }
};

const SpecialBookList = ({ navigation, route }: SpecialBookListProps) => {
  const isMounted = useRef<boolean>();
  const { title, api } = dataSelector(route.params?.type);

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listFavorite, setListFavorite] = useState<any>([]);

  const {
    sessionReducer : {email,  }
 } = useSelector((state:ReduxState) => state);


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
      logger(`SpecialBookList, getBooks()`, error);
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
    onBackPress: () => navigation.goBack(),
  };

  React.useEffect( () => {


     

    fetchFavoriteBooks(email).then(res => {
    if(res){
      setListFavorite(res.book)
    }
    }).catch(err => {
      logger(err)
    })
      },[])

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

    
  function newBook  (){
    if(title === strings.myFavorite){
      return books?.filter(book => listFavorite.includes(book.book_title))
    }else{
      return books
    }

  }

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainCategory}
      >
        <FlatList
          data={newBook()}
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
