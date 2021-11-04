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
import { primaryColor, spacing as sp, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { heightPercent, logger } from "../../helpers/helper";
import { fetchRecommendedBooks } from "../../services";
import { dummyChips } from "./dummy";
import styles from "./styles";

const boundary =
  dummyChips.length % 2 === 0
    ? dummyChips.length / 2
    : Math.ceil(dummyChips.length / 2);

const topChips = dummyChips.slice(0, boundary);
const bottomChips = dummyChips.slice(boundary, dummyChips.length + 1);

const HORIZONTAL_GAP = sp.sl * 2;

const Explore = () => {
  const isMounted = useRef<boolean>();
  const cameraPosition = useSharedValue(-48);
  const scrollY = useSharedValue(0);

  const [headerHeight, setHeaderHeight] = useState<number>(64);
  const [keyword, setKeyword] = useState<string>();
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const booksRenderItem = ({ item }: { item: CompactBooksProps }) => (
    <View>
      <BookTile
        title={item?.book_title}
        author={`${item?.author}`}
        duration={item?.read_time}
        cover={item?.book_cover}
      />
      <Gap vertical={sp.sl} />
    </View>
  );

  const getExploreData = async () => {
    setIsLoading(true);
    try {
      const [recomData] = await Promise.all([fetchRecommendedBooks()]);
      if (!isMounted.current) {
        return;
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data);
      } else {
        throw new Error("Fail on fetching recommended books data");
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
          scrollY.value >= 32
            ? withTiming(-(headerHeight + sp.m + sp.sm / 2))
            : withTiming(0),
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

  const littleGapStyle = useAnimatedStyle(() => ({
    paddingVertical: sp.sm / 2,
    // paddingVertical: scrollY.value > 32 ? sp.sm / 2 / 2 : sp.sm / 2,
  }));

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
      <Animated.View style={[styles.container, headerStyle]}>
        <Gap vertical={sp.m} />
        <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
          <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
        </View>
        <Gap vertical={sp.sm} />
        <ExploreSearch
          cameraPress={() => logger("camera")}
          closePress={() => logger("close")}
          onChangeText={setKeyword}
          position={cameraPosition}
          keyword={keyword}
        />
        <Animated.View style={littleGapStyle} />
      </Animated.View>
      <View
        style={{
          top: -headerHeight - sp.m * 2,
          height: heightPercent(100) + headerHeight + sp.m * 2,
        }}
      >
        <DummyFlatList
          onScroll={(event: any) =>
            (scrollY.value = event.nativeEvent.contentOffset.y)
          }
          scrollEventThrottle={16}
        >
          <Gap vertical={headerHeight + sp.m} />
          <Gap vertical={sp.sl * 2} />
          <Gap horizontal={HORIZONTAL_GAP}>
            <TextItem type="b.24.nc.90">{strings.bookCategory}</TextItem>
          </Gap>
          <Gap vertical={sp.sm} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.row}>
                {topChips.map((item, index) => {
                  const isSelected =
                    selectedCategories.findIndex(
                      (value) => value === item.id
                    ) !== -1;

                  const onPress = (id: string) =>
                    setSelectedCategories((current) => {
                      const index = current?.findIndex((item) => item === id);
                      if (index === -1) {
                        return [...current, id];
                      }
                      return current?.filter((item) => item !== id);
                    });

                  return (
                    <View key={item.id} style={styles.row}>
                      {index == 0 && <Gap horizontal={sp.sl} />}
                      <Chips
                        label={item.label}
                        id={item.id}
                        Icon={item.Icon}
                        isSelected={isSelected}
                        onPress={onPress}
                      />
                      <Gap
                        horizontal={index === boundary - 1 ? sp.sl : sp.xs}
                      />
                    </View>
                  );
                })}
              </View>
              <Gap vertical={sp.sm} />
              <View style={styles.row}>
                {bottomChips.map((item, index) => {
                  const isSelected =
                    selectedCategories.findIndex(
                      (value) => value === item.id
                    ) !== -1;

                  const onPress = (id: string) =>
                    setSelectedCategories((current) => {
                      const index = current?.findIndex((item) => item === id);
                      if (index === -1) {
                        return [...current, id];
                      }
                      return current?.filter((item) => item !== id);
                    });

                  return (
                    <View key={item.id} style={styles.row}>
                      {index == 0 && <Gap horizontal={sp.sl} />}
                      <Chips
                        label={item.label}
                        id={item.id}
                        Icon={item.Icon}
                        isSelected={isSelected}
                        onPress={onPress}
                      />
                      <Gap
                        horizontal={index === boundary - 1 ? sp.sl : sp.xs}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <Gap vertical={sp.sl} />
          <TitleTap title={strings.newRelease} />
          <TitleTap title={strings.trendingBook} />
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
          <Gap vertical={sp.xxl * 4} />
        </DummyFlatList>
      </View>
    </Base>
  );
};

export default Explore;
