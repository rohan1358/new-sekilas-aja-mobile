import { Clock } from "@assets";
import {
  Base,
  BookTile,
  Button,
  Chips,
  DummyFlatList,
  EmptyPlaceholder,
  Gap,
  SearchHeader,
  TextIcon,
  TextItem,
} from "@components";
import {
  neutralColor,
  primaryColor,
  skeleton,
  spacing as sp,
  strings,
} from "@constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../../assets/dummy";
import { logger } from "../../helpers";
import { addSearchHistory, clearSearchHistory } from "../../redux/actions";
import { ReduxState } from "../../redux/reducers";
import { fetchBooks } from "../../services";
import styles from "./styles";
import { SearchProps } from "./types";

const Search = ({ navigation }: SearchProps) => {
  const dispatch = useDispatch();

  const currentKeyword = useRef<string>("");
  const isMounted = useRef<boolean>(true);
  const searchRef = useRef<any>();

  const { general } = useSelector((state: ReduxState) => state);

  const [books, setBooks] = useState<CompactBooksProps[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const bookResult = useMemo(() => {
    if (keyword !== currentKeyword.current) {
      setIsSearched(false);
      return [];
    }
    return books?.filter((item) =>
      item?.book_title
        .toLocaleLowerCase()
        .includes(keyword?.toLocaleLowerCase() || "")
    );
  }, [keyword, books, currentKeyword.current]);

  const collectedKeywords = useMemo(
    () => books?.map((item) => item?.book_title),
    [books]
  );
  const isSearchHistoryFilled = general.keywords.length !== 0;

  const autofill = useMemo(() => {
    if (general?.keywords.length < 4) {
      return general?.keywords.reverse();
    }
    return general?.keywords.reverse().slice(0, 3);
  }, [general.keywords]);

  const backPress = () => navigation.goBack();

  const bookCandidate = useMemo(() => {
    if (!keyword || keyword?.length < 3) {
      return [];
    }
    if (!collectedKeywords) {
      return [];
    }
    return collectedKeywords
      .filter((item) =>
        item?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
      .slice(0, 3);
  }, [keyword]);

  const chipPress = (item: { label: string; id: string }) =>
    navigation.navigate("Category", {
      type: "category",
      title: item.label,
      payload: item.id,
    });

  const closePress = () => {
    setKeyword("");
    currentKeyword.current = "";
    setIsSearched(false);
    searchRef.current?.clear();
  };

  const getBookResult = async () => {
    !isLoading && setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBooks();
      if (!isMounted.current) {
        return;
      }
      if (!isSuccess) {
        setBooks(null);
        return;
      }
      setBooks(data);
    } catch (error) {
      logger("Search, getBookResult", error);
    } finally {
      setIsLoading(false);
    }
  };

  const keyExtractor = ({ id }: { id: string | number }) => `${id}`;

  const onAutoFillPress = (value: { label: string }) => {
    dispatch(addSearchHistory(value.label));
    setKeyword(value.label);
    currentKeyword.current = value.label;
    setIsSearched(true);
    Keyboard.dismiss();
  };

  const onClearSearchHistory = () => dispatch(clearSearchHistory());

  const onSubmitEditing = () => {
    if (!keyword || keyword?.length < 3) {
      return;
    }
    currentKeyword.current = keyword;
    dispatch(addSearchHistory(keyword));
    setIsSearched(true);
  };

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

  useEffect(() => {
    isMounted.current = true;
    getBookResult();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;

    if (books === null) {
      return navigation.goBack();
    }

    return () => {
      isMounted.current = false;
    };
  }, [books]);

  return (
    <Base
      barColor={primaryColor.main}
      backgroundColor={neutralColor[isSearched ? 10 : 20]}
    >
      <SkeletonContent
        isLoading={isLoading}
        containerStyle={styles.skeleton}
        layout={skeleton.mainSearch}
      >
        <>
          <SearchHeader
            keyword={keyword}
            onChangeText={setKeyword}
            closePress={closePress}
            ref={searchRef}
            onSubmitEditing={onSubmitEditing}
            backPress={backPress}
          />
          <DummyFlatList>
            {isSearched ? (
              <View style={styles.bookList}>
                <FlatList
                  data={bookResult}
                  keyExtractor={keyExtractor}
                  numColumns={2}
                  renderItem={renderItem}
                  columnWrapperStyle={styles.columnWrapperStyle}
                  ListEmptyComponent={
                    <EmptyPlaceholder
                      title={strings.noBook}
                      subtitle={strings.booksNotFound}
                    />
                  }
                />
              </View>
            ) : (
              <>
                <View style={styles.newSearchContainer}>
                  {bookCandidate?.length === 0 ? (
                    <>
                      <View style={styles.newSearchText}>
                        <TextItem type="b.24.nc.90">
                          {strings.newSearch}
                        </TextItem>
                        {isSearchHistoryFilled && (
                          <Button onPress={onClearSearchHistory}>
                            <TextItem type="b.14.dc.main">
                              {strings.delete}
                            </TextItem>
                          </Button>
                        )}
                      </View>
                      {isSearchHistoryFilled ? (
                        <>
                          {autofill.map((item) => (
                            <TextIcon
                              item={{ id: item, label: item }}
                              key={`${item}`}
                              Icon={<Clock stroke={neutralColor[70]} />}
                              onPress={(value) => {
                                setKeyword(value.label);
                                setIsSearched(true);
                                currentKeyword.current = value.label;
                              }}
                            />
                          ))}
                        </>
                      ) : (
                        <View style={styles.emptySearch}>
                          <TextItem type="r.16.nc.70">
                            {strings.searchEmpty}
                          </TextItem>
                        </View>
                      )}
                    </>
                  ) : (
                    <>
                      {bookCandidate.map((item) => (
                        <TextIcon
                          onPress={onAutoFillPress}
                          item={{ id: item, label: item }}
                          key={`${item}`}
                        />
                      ))}
                    </>
                  )}
                </View>
                <Gap vertical={sp.sm} />
                <View style={styles.categoriesContainer}>
                  <TextItem type="b.24.nc.90.c">
                    {strings.bookCategory}
                  </TextItem>
                  <Gap vertical={sp.sm} />
                  <View style={styles.categoriesWrapper}>
                    {categories.map((item) => (
                      <View key={`${item.label}`}>
                        <View style={styles.chipsContainer}>
                          <Chips
                            label={item.label}
                            id={item.id}
                            Icon={item.Icon}
                            onPress={() => chipPress(item)}
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
        </>
      </SkeletonContent>
    </Base>
  );
};

export default Search;
