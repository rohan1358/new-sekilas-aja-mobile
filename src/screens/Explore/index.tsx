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
import {
  pages,
  primaryColor,
  skeleton,
  spacing as sp,
  strings,
} from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { categories } from "../../../assets/dummy";
import { heightPercent, logger } from "../../helpers/helper";
import {
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks,
} from "../../services";
import { CompactBooksProps } from "../Home/types";
import styles from "./styles";
import { ExploreProps } from "./types";

const boundary =
  categories.length % 2 === 0
    ? categories.length / 2
    : Math.ceil(categories.length / 2);

const bottomChips = categories.slice(boundary, categories.length + 1);
const topChips = categories.slice(0, boundary);

const HORIZONTAL_GAP = sp.sl * 2;

const bottomHeaderGap = sp.sm;
const bottomNavHeight = 64;
const topHeaderGap = sp.m;

const flatlistSecondGap = sp.sl * 2;

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
    <Gap horizontal={index === boundary - 1 ? sp.sl : sp.xs} />
  </View>
);

const Explore = ({ navigation }: ExploreProps) => {
  const isMounted = useRef<boolean>();
  const searchRef = useRef<any>();

  const cameraPosition = useSharedValue(-48);
  const scrollY = useSharedValue(0);

  const [headerHeight, setHeaderHeight] = useState<number>(64);
  const [keyword, setKeyword] = useState<string>();
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [releaseBooks, setReleaseBooks] = useState<CompactBooksProps[]>();
  const [trendBooks, setTrendBooks] = useState<CompactBooksProps[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const flatListTopAdjuster = headerHeight + topHeaderGap * 2;

  const headerTranslate = headerHeight + topHeaderGap + bottomHeaderGap / 2;

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => (
    <View>
      <BookTile
        title={item?.book_title}
        author={`${item?.author}`}
        duration={item?.read_time}
        cover={item?.book_cover}
        onPress={() => navigation.navigate("BookDetail", { id: item.id })}
        navSubscrive={() => navigation.navigate("Subscribe")}
        isVideoAvailable={item?.isVideoAvailable}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  const closePress = () => {
    setKeyword("");
    searchRef.current?.clear();
  };

  const getExploreData = async () => {
    setIsLoading(true);
    try {
      const [recomData, releaseData, trendData] = await Promise.all([
        fetchRecommendedBooks(),
        fetchReleasedBooks(),
        fetchTrendBooks(),
      ]);
      if (!isMounted.current) {
        return;
      }
      if (releaseData.isSuccess) {
        setReleaseBooks(releaseData.data);
      } else {
        throw new Error("Fail on fetching recommended books data");
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data);
      } else {
        throw new Error("Fail on fetching released books data");
      }
      if (trendData.isSuccess) {
        setTrendBooks(trendData.data);
      } else {
        throw new Error("Fail on fetching trend books data");
      }
    } catch (error) {
      logger("Explore, getExploreData", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value >= 32 ? withTiming(-headerTranslate) : withTiming(0),
      },
    ],
  }));

  const inputHandle = () => {
    if (!!keyword && keyword?.length > 2) {
      cameraPosition.value = withTiming(0);
    } else {
      cameraPosition.value = withTiming(-48);
    }
  };

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  useEffect(() => {
    inputHandle();
  }, [keyword]);

  useEffect(() => {
    isMounted.current = true;
    getExploreData();

    () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Base barColor={primaryColor.main}>
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainExplore}
      >
        <Animated.View style={[styles.container, headerStyle]}>
          <Gap vertical={topHeaderGap} />
          <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
            <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
          </View>
          <Gap vertical={bottomHeaderGap} />
          <ExploreSearch
            cameraPress={() => logger("camera")}
            onPress={() => navigation.navigate("Search")}
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
            <Gap vertical={flatListTopAdjuster - sp.m + flatlistSecondGap} />
            <Gap horizontal={HORIZONTAL_GAP}>
              <TextItem type="b.24.nc.90">{strings.bookCategory}</TextItem>
            </Gap>
            <Gap vertical={sp.sm} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.row}>
                  {topChips.map((item, index) => {
                    const onPress = (id: string) =>
                      navigation.navigate("Category", {
                        type: "category",
                        title: item.label,
                        payload: id,
                      });
                    return (
                      <CategoryChips
                        onPress={onPress}
                        index={index}
                        item={item}
                        key={item.id}
                      />
                    );
                  })}
                </View>
                <Gap vertical={sp.sm} />
                <View style={styles.row}>
                  {bottomChips.map((item, index) => {
                    const onPress = (id: string) =>
                      navigation.navigate("Category", {
                        type: "category",
                        title: item.label,
                        payload: id,
                      });
                    return (
                      <CategoryChips
                        onPress={onPress}
                        index={index}
                        item={item}
                        key={item.id}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <Gap vertical={sp.sl} />
            <TitleTap title={strings.newRelease} />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
              <FlatList
                data={releaseBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={"releasedbooklist"}
              />
            </Gap>
            <TitleTap title={strings.trendingBook} />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
              <FlatList
                data={trendBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={"trendbooklist"}
              />
            </Gap>
            <TitleTap title={strings.recommendedBook} />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
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
                flatListTopAdjuster + flatlistSecondGap + bottomNavHeight * 2
              }
            />
          </DummyFlatList>
        </View>
      </SkeletonContent>
    </Base>
  );
};

export default Explore;
