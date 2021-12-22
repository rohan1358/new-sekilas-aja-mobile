import {
  Base,
  BookTile,
  Chips,
  DummyFlatList,
  ExploreSearch,
  Gap,
  TextItem,
  TitleTap
} from '@components';
import { primaryColor, skeleton, spacing as sp, strings } from '@constants';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { categories, newCategories } from '../../../assets/dummy';
import { heightPercent, logger } from '../../helpers';
import {
  fetchListCategory,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks
} from '../../services';
import { CompactBooksProps } from '../Home/types';
import styles from './styles';
import { ExploreProps } from './types';

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
  onPress
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

  const scrollY = useSharedValue(0);

  const [newTopChips, setTopChipd] = useState<any>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(64);
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [releaseBooks, setReleaseBooks] = useState<CompactBooksProps[]>();
  const [trendBooks, setTrendBooks] = useState<CompactBooksProps[]>();
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
        onPress={(id) => navigation.navigate('BookDetail', { id })}
        navSubscrive={() => navigation.navigate('Subscribe')}
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
        fetchTrendBooks()
      ]);
      if (!isMounted.current) {
        return;
      }
      if (releaseData.isSuccess) {
        setReleaseBooks(releaseData.data?.slice(0, 2));
      } else {
        throw new Error('Fail on fetching recommended books data');
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data?.slice(0, 4));
      } else {
        throw new Error('Fail on fetching released books data');
      }
      if (trendData.isSuccess) {
        setTrendBooks(trendData.data?.slice(0, 2));
      } else {
        throw new Error('Fail on fetching trend books data');
      }
    } catch (error) {
      logger('Explore, getExploreData', error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollY.value >= 32 ? withTiming(-headerTranslate) : withTiming(0)
      }
    ]
  }));

  const idKeyExtractor = ({ id }: { id: string | number }) => `${id}`;

  useEffect(() => {
    isMounted.current = true;
    getExploreData();

    () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const list = await fetchListCategory();
      setTopChipd(list?.list);
    };
    fetchCategory();
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
            cameraPress={() => logger('camera')}
            onPress={() => navigation.navigate('Search')}
          />
          <Gap vertical={sp.sm} />
        </Animated.View>
        <View
          style={{
            top: -flatListTopAdjuster,
            height: heightPercent(100) + flatListTopAdjuster
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
                  {newTopChips &&
                    newTopChips
                      .slice(0, newTopChips.length / 2 + 1)
                      .map((item: any, index: any) => {
                        const onPress = (id: string) =>
                          navigation.navigate('Category', {
                            type: 'category',
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
                </View>
                <Gap vertical={sp.sm} />
                <View style={styles.row}>
                  {newTopChips &&
                    newTopChips
                      .slice(newTopChips.length / 2 + 1, newTopChips.length)
                      .map((item: any, index: any) => {
                        const onPress = (id: string) =>
                          navigation.navigate('Category', {
                            type: 'category',
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
                </View>
              </View>
            </ScrollView>
            <Gap vertical={sp.sl} />
            <TitleTap
              title={strings.newRelease}
              onPress={() =>
                navigation.navigate('SpecialBookList', {
                  type: 'newRelease'
                })
              }
            />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
              <FlatList
                data={releaseBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={'releasedbooklist'}
              />
            </Gap>
            <TitleTap
              title={strings.trendingBook}
              onPress={() =>
                navigation.navigate('SpecialBookList', {
                  type: 'trending'
                })
              }
            />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
              <FlatList
                data={trendBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={'trendbooklist'}
              />
            </Gap>
            <TitleTap
              title={strings.recommendedBook}
              onPress={() =>
                navigation.navigate('SpecialBookList', {
                  type: 'recommendation'
                })
              }
            />
            <Gap vertical={sp.sm} />
            <Gap horizontal={sp.sl * 2}>
              <FlatList
                data={recommendedBooks}
                keyExtractor={idKeyExtractor}
                numColumns={2}
                renderItem={booksRenderItem}
                columnWrapperStyle={styles.columnWrapperStyle}
                listKey={'recommendedbooklist'}
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
