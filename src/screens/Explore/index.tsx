import {
  Base,
  BookTile,
  Chips,
  DummyFlatList,
  ExploreSearch,
  Gap,
  TextItem,
  TitleTap,
} from "@components";
import { primaryColor, skeleton, spacing as sp, strings } from "@constants";
import { heightPercent, logger, useMounted } from "@helpers";
import {
  fetchListCategory,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks,
} from "@services";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { categories, newCategories } from "../../../assets/dummy";
import styles from "./styles";
import { ExploreProps } from "./types";
import {
  BOTTOM_HEADER_GAP,
  BOTTOM_NAV_HEIGHT,
  BOUNDARY,
  FLATLIST_SECOND_GAP,
  HORIZONTAL_GAP,
  TOP_HEADER_GAP,
} from "./values";

const CategoryChips = ({
  item,
  index,
  onPress,
}: {
  item: { id: string; label: string; Icon: any };
  index: number;
  onPress(arg0: string): void;
}) => (
  <View key={item.id} style={styles.row}>
    {index == 0 && <Gap horizontal={sp.sl} />}
    <Chips label={item.label} id={item.id} Icon={item.Icon} onPress={onPress} />
    <Gap horizontal={index === BOUNDARY - 1 ? sp.sl : sp.xs} />
  </View>
);

const Explore = ({ navigation }: ExploreProps) => {
  const isMounted = useMounted();
  const scrollY = useSharedValue(0);

  const [newChips, setChipd] = useState<any>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(64);
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [releaseBooks, setReleaseBooks] = useState<CompactBooksProps[]>();
  const [trendBooks, setTrendBooks] = useState<CompactBooksProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const flatListTopAdjuster = headerHeight + TOP_HEADER_GAP * 2;

  const headerTranslate = headerHeight + TOP_HEADER_GAP + BOTTOM_HEADER_GAP / 2;

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value >= 32 ? withTiming(-headerTranslate) : withTiming(0),
      },
    ],
  }));

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    getExploreData();
  }, []);

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => (
    <View>
      <BookTile
        title={item?.book_title}
        author={`${item?.author}`}
        duration={item?.read_time}
        cover={item?.book_cover}
        onPress={(id) => navigation.navigate("BookDetail", { id })}
        navSubscrive={() => navigation.navigate("Subscribe")}
        isVideoAvailable={item?.isVideoAvailable}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  const getExploreData = async () => {
    setIsLoading(true);
    try {
      const [recomData, releaseData, trendData] = await Promise.all([
        fetchRecommendedBooks(),
        fetchReleasedBooks(),
        fetchTrendBooks(),
      ]);
      if (!isMounted) return;
      if (releaseData.isSuccess) {
        setReleaseBooks(releaseData.data?.slice(0, 2));
      } else {
        throw new Error("Fail on fetching recommended books data");
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data?.slice(0, 4));
      } else {
        throw new Error("Fail on fetching released books data");
      }
      if (trendData.isSuccess) {
        setTrendBooks(trendData.data?.slice(0, 2));
      } else {
        throw new Error("Fail on fetching trend books data");
      }
    } catch (error) {
      logger("Explore, getExploreData", error);
    } finally {
      setIsLoading(false);
    }
  };

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  const onNewPress = () =>
    navigation.navigate("SpecialBookList", {
      type: "newRelease",
    });

  const onRecommendPress = () =>
    navigation.navigate("SpecialBookList", {
      type: "recommendation",
    });

  const onSearchPress = () => navigation.navigate("Search");

  const onTrendPress = () =>
    navigation.navigate("SpecialBookList", {
      type: "trending",
    });

  const fetchCategory = async () => {
    try {
      const list = await fetchListCategory();
      setChipd(list?.list);
    } catch {
      setChipd(false);
    }
  };

  return (
    <Base barColor={primaryColor.main}>
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainExplore}
      >
        <Animated.View style={[styles.container, headerStyle]}>
          <Gap vertical={TOP_HEADER_GAP} />
          <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
            <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
          </View>
          <Gap vertical={BOTTOM_HEADER_GAP} />
          <ExploreSearch
            cameraPress={() => logger("camera")}
            onPress={onSearchPress}
          />
          <Gap vertical={sp.sm} />
        </Animated.View>
        <View
          style={{
            top: -flatListTopAdjuster,
            height: heightPercent(100) + flatListTopAdjuster,
          }}
        >
          <DummyFlatList
            onScroll={(event) =>
              (scrollY.value = event.nativeEvent.contentOffset.y)
            }
            scrollEventThrottle={16}
          >
            <Gap vertical={flatListTopAdjuster - sp.m + FLATLIST_SECOND_GAP} />
            {/* category */}
            <>
              <Gap horizontal={HORIZONTAL_GAP}>
                <TextItem type="b.24.nc.90">{strings.bookCategory}</TextItem>
              </Gap>
              <Gap vertical={sp.sm} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.row}>
                    {newChips &&
                      newChips
                        .slice(0, newChips.length / 2 + 1)
                        .map((item: any, index: any) => {
                          const onPress = (id: string) =>
                            navigation.navigate("Category", {
                              type: "category",
                              title: item,
                              payload: id,
                            });
                          return (
                            <CategoryChips
                              onPress={onPress}
                              index={index}
                              item={{
                                id: item,
                                label: item,
                                Icon: newCategories(item),
                              }}
                              key={index}
                            />
                          );
                        })}
                  </View>
                  <Gap vertical={sp.sm} />
                  {/* <View style={styles.row}>
                    {newChips &&
                      newChips
                        .slice(newChips.length / 2 + 1, newChips.length)
                        .map((item: any, index: any) => {
                          const onPress = (id: string) =>
                            navigation.navigate("Category", {
                              type: "category",
                              title: item,
                              payload: id
                            });
                          return (
                            <CategoryChips
                              onPress={onPress}
                              index={index}
                              item={{
                                id: item,
                                label: item,
                                Icon: newCategories(item)
                              }}
                              key={index}
                            />
                          );
                        })}
                  </View> */}
                </View>
              </ScrollView>
            </>
            <Gap vertical={sp.sl} />
            <TitleTap title={strings.newRelease} onPress={onNewPress} />
            <Gap vertical={sp.sm} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <FlatList
                data={releaseBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={"releasedbooklist"}
              />
            </Gap>
            <TitleTap title={strings.trendingBook} onPress={onTrendPress} />
            <Gap vertical={sp.sm} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <FlatList
                data={trendBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={"trendbooklist"}
              />
            </Gap>
            <TitleTap
              title={strings.recommendedBook}
              onPress={onRecommendPress}
            />
            <Gap vertical={sp.sm} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <FlatList
                data={recommendedBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={"recommendedbooklist"}
              />
            </Gap>
            <Gap
              vertical={
                flatListTopAdjuster +
                FLATLIST_SECOND_GAP +
                BOTTOM_NAV_HEIGHT * 2
              }
            />
          </DummyFlatList>
        </View>
      </SkeletonContent>
    </Base>
  );
};

export default Explore;
