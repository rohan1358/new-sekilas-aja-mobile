import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import {
  dangerColor,
  primaryColor,
  skeleton,
  spacing as sp,
  strings,
  successColor,
  systemColor
} from "@constants";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import { toggleBottomTab } from "@actions";
import {
  fetchBookByFavorit,
  fetchDoneReading,
  fetchMostBooks,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchShorts,
  fetchTrendBooks,
  fetchMyShorts
} from "../../services";
import { SpecialCategoryProps } from "../../types";
import { HORIZONTAL_GAP } from "../Explore/values";
import { CompactBooksProps } from "../Home/types";
import { getRandomInt } from "../../utils";
import styles from "./styles";
import { SpecialBookListProps } from "./types";
import ShortsTile from "./../../components/molecule/ShortsTile/index";
import StoryShort from "./../../components/organism/StoryShort/index";

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

const MyShortsList = ({ navigation, route }: SpecialBookListProps) => {
  const isMounted = useRef<boolean>();
  const storyRef = useRef<any>();

  const {
    sessionReducer: { email },
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  const { title, api } = dataSelector(route.params?.type, email);

  const [books, setBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentStory, setCurrentStory] = useState<null | string>();
  const [shorts, setShorts] = useState<null | any[]>();
  const [shortsColor, setShortsColor] = useState<string>();

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
    title: ["Shorts", " Ku"],
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

  const getShorts = async () => {
    try {
      const { data, isSuccess } = await fetchShorts();
      if (!isSuccess) return;
      // console.log("data shorts", data);
    } catch (error) {
      // console.log("Home, getShorts", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setIsLoading(true);

      fetchMyShorts(profile.id).then((res: any) => {
        setShorts(res);
        setIsLoading(false);
      });

      return () => {
        isActive = false;
      };
    }, [])
  );

  const storyColorIndex = getRandomInt(0, 3);

  const storyColors = [
    primaryColor.pressed,
    systemColor.hover,
    successColor.hover,
    dangerColor.hover
  ];

  const storyPress = (title: string) => {
    setShortsColor(storyColors[storyColorIndex]);

    setCurrentStory(title);
    dispatch(toggleBottomTab(true));
    storyRef.current?.open();
  };

  const onLastStoryPress = (id: string) =>
    navigation.navigate("BookDetail", { id });

  return (
    <Base headerState={headerState} barColor={shortsColor || primaryColor.main}>
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainCategory}
      >
        {/* my shorts area */}
        {!!shorts && (
          <>
            <Gap vertical={sp.m} />
            <FlatList
              data={shorts}
              renderItem={({ item, index }) => (
                <ShortsTile
                  index={index}
                  onPress={storyPress}
                  title={item?.book_title}
                  cover={item?.book_cover}
                />
              )}
              keyExtractor={({ id }) => `${id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Gap vertical={sp.sl} />
          </>
        )}
      </SkeletonContent>

      <StoryShort
        ref={storyRef}
        onEnd={() => {
          setCurrentStory(null);
          setShortsColor(false);
        }}
        storyStatus={currentStory}
        storyData={shorts?.find((item) => item?.book_title === currentStory)}
        color={shortsColor}
        onLastStoryPress={onLastStoryPress}
      />
    </Base>
  );
};

export default MyShortsList;
