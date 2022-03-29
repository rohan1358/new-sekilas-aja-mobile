import { handleOpenModalSubscribe } from "@actions";
import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import { skeleton, spacing as sp, strings } from "@constants";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { BookTileChallenge } from "../../components";
import { ReduxState } from "../../redux/reducers";
import {
  fetchBookByFavorit,
  fetchBookChallenge,
  fetchDoneReading,
  fetchMostBooks,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks,
  addDoneReadingChallenge,
  getMyProgress
} from "../../services";
import { SpecialCategoryProps } from "../../types";
import { CompactBooksProps } from "../Home/types";
import styles from "./styles";
import { SpecialBookListProps } from "./types";

const dataSelector = (
  type?: SpecialCategoryProps,
  challenge?: any
): { title: string; api(): Promise<FetchResponse>; id: any } => {
  switch (type) {
    case "bookChallenge":
      return {
        title: challenge.title,
        api: () => fetchBookChallenge(challenge.book),
        id: challenge.challenge
      };

    default:
      return { title: "", api: fetchRecommendedBooks };
  }
};

const ListBookChallenge = ({ navigation, route }: SpecialBookListProps) => {
  const isMounted = useRef<boolean>();

  const {
    sessionReducer: { email },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  const { title, api, id } = dataSelector("bookChallenge", route.params);

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myProgress, setMyProgress] = useState<[]>([]);
  const [loadData, setLoadData] = useState<string>("");

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

  const getProgressChallenge = () => {
    setLoadData("");
    getMyProgress(id, profile.id)
      .then((res: any) => {
        setMyProgress(res.data);
        setLoadData("");
      })
      .catch((err) => {
        setLoadData("");
      });
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

  const lockReadingListenViewBook =
    profile?.is_subscribed || profile.owned_books.includes(title)
      ? false
      : true;

  const renderItem = ({
    item,
    index
  }: {
    item: CompactBooksProps;
    index: any;
  }) => {
    const doneReading = (book: any) => {
      setLoadData(book);
      addDoneReadingChallenge(id, { uid: profile.id, book })
        .then((res) => {
          getProgressChallenge();
        })
        .catch((err) => {});
    };

    return (
      <>
        {/* {loadData !== item?.book_title && ( */}
        <View key={Math.random()}>
          <BookTileChallenge
            index={index}
            title={item?.book_title}
            author={`${item?.author}`}
            duration={item?.read_time}
            cover={item?.book_cover}
            onPress={(id) => {
              if (lockReadingListenViewBook) {
                dispatch(handleOpenModalSubscribe());
              } else {
                navigation.navigate("Reading", { id, page: 0 });
              }
            }}
            onPressDone={(id) => {
              if (lockReadingListenViewBook) {
                dispatch(handleOpenModalSubscribe());
                setLoadData("");
              } else {
                doneReading(id);
              }
            }}
            isVideoAvailable={item?.isVideoAvailable}
            progress={myProgress}
          />
          <Gap vertical={sp.sl} />
        </View>
        {/* )} */}
      </>
    );
  };

  useEffect(() => {
    isMounted.current = true;

    getBooks();
    getProgressChallenge();

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
        layout={skeleton.mainChallenge}
      >
        <FlatList
          data={books}
          keyExtractor={keyExtractor}
          numColumns={1}
          renderItem={renderItem}
          // columnWrapperStyle={styles.columnWrapperStyle}
          listKey="mostreadbooklist"
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </SkeletonContent>
    </Base>
  );
};

export default ListBookChallenge;
