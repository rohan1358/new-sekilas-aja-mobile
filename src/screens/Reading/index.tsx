import { ChevronLeft, ChevronRight, Headphones, Video } from "@assets";
import {
  AnimatedOverlay,
  Base,
  Button,
  ButtonIcon,
  DummyFlatList,
  EmptyPlaceholder,
  Gap,
  PageController,
  ReadingHeader,
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
import { Share, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { HeaderStateProps } from "../../components/atom/Base/types";
import { logger, widthPercent } from "../../helpers/helper";
import { fetchBookContent } from "../../services";
import styles from "./styles";
import { BookContentProps, ReadingProps } from "./types";

const WIDTH = widthPercent(100);
const ACTION_HIDE = -128;

const Reading = ({ navigation, route }: ReadingProps) => {
  const BOOK_ID = route.params?.id;

  const isMounted = useRef<boolean>(true);
  const overlayRef = useRef<any>();
  const scrollRef = useRef<FlatList<any>>();

  const actionPosition = useSharedValue(ACTION_HIDE);
  const tipPosition = useSharedValue(-WIDTH / 2);

  const [content, setContent] = useState<BookContentProps | null>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const actionStyle = useAnimatedStyle(() => ({
    bottom: actionPosition.value,
  }));

  const closeActions = () => (actionPosition.value = withTiming(0));

  const closeTip = () => (tipPosition.value = withTiming(-WIDTH / 2));

  const currenTitle = useMemo(
    () => (!!content ? content?.pageContent[currentPage]?.title : ""),
    [content, currentPage]
  );

  const customComp = () => (
    <ReadingHeader
      title={BOOK_ID || "Book Content"}
      backPress={() => navigation.goBack()}
      dotPress={() => {
        actionPosition.value = withTiming(ACTION_HIDE);
        tipPosition.value = withTiming(64);
        overlayRef.current?.open();
      }}
      dotVisibility={!!content}
    />
  );

  const getBookContent = async () => {
    if (!BOOK_ID) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookContent({
        bookTitle: BOOK_ID,
      });
      if (!isMounted.current) {
        return;
      }
      if (!isSuccess) {
        return;
      }
      if (!!data) actionPosition.value = withTiming(0);
      setContent(data);
    } catch (error) {
      logger("BookTableContent, getContent", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerState: HeaderStateProps = {
    visible: true,
    type: "custom",
    customComp,
  };

  const isOnFirstPage = currentPage === 0;

  const isOnLastPage = currentPage === (content?.numberOfPage || 0) - 1;

  const keyExtractor = (item: string) => `${item}`;

  const label = `${currentPage + 1} dari ${content?.numberOfPage}`;

  const onNextPress = () => {
    scrollRef.current?.scrollToOffset({ animated: false, offset: 0 });
    setCurrentPage((current) =>
      current < (content?.numberOfPage || 0) - 1 ? current + 1 : current
    );
  };

  const onPrevPress = () => {
    scrollRef.current?.scrollToOffset({ animated: false, offset: 0 });
    setCurrentPage((current) => (current > 0 ? current - 1 : current));
  };

  const onTap = () => {
    closeActions();
    closeTip();
  };

  const renderItem = ({ item }: { item: string }) => (
    <View>
      <TextItem type="r.16.nc.70">{item}</TextItem>
      <Gap vertical={sp.sm} />
    </View>
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `"${currenTitle}"
        
Penggalan kilas ini merupakan bagian dari buku ${BOOK_ID}. Baca keseluruhan kilas di https://sekilasaja.com`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          logger(result);
          onTap();
          overlayRef.current?.close();
        } else {
          onTap();
          overlayRef.current?.close();
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        onTap();
        overlayRef.current?.close();
      }
      onTap();
      overlayRef.current?.close();
    } catch (error) {
      onTap();
      overlayRef.current?.close();
      //@ts-ignore

      logger("Reading, onShare", error?.message);
    }
  };

  const tableContentPress = () => {
    overlayRef.current?.close();
    onTap();
    navigation.navigate("BookTableContent", { id: BOOK_ID });
  };

  const tipStyle = useAnimatedStyle(() => ({ top: tipPosition.value }));

  const s = styles({ isOnFirstPage, isOnLastPage });

  useEffect(() => {
    isMounted.current = true;

    getBookContent();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!route.params?.page) {
      return;
    }
    setCurrentPage(parseInt(route.params?.page) || 0);
  }, [route.params?.page]);

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        isLoading={isLoading}
        layout={skeleton.mainReading}
        containerStyle={s.skeleton}
      >
        {!!content ? (
          <DummyFlatList
            contentContainerStyle={s.contentContainerStyle}
            ref={scrollRef}
          >
            <Gap vertical={sp.sl} />
            <PageController
              {...{
                isOnFirstPage,
                isOnLastPage,
                label,
                onNextPress,
                onPrevPress,
              }}
            />
            <Gap vertical={36} />
            <TextItem type="b.32.nc.100">{currenTitle}</TextItem>
            <Gap vertical={sp.sl} />
            <FlatList
              data={content?.pageContent[currentPage]?.details}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
            <Gap vertical={sp.sl} />
            <PageController
              {...{
                isOnFirstPage,
                isOnLastPage,
                label,
                onNextPress,
                onPrevPress,
              }}
            />
            <Gap vertical={sp.xl * 3} />
          </DummyFlatList>
        ) : (
          <EmptyPlaceholder
            title={strings.kilasEmpty}
            subtitle={strings.kilasEmptyDesc}
          />
        )}
      </SkeletonContent>
      <Animated.View style={[s.actionWrapper, actionStyle]}>
        <LinearGradient
          colors={["#fff1", "#fff8", "#fff"]}
          style={s.linearGradient}
        ></LinearGradient>
        <View style={s.actions}>
          <Button style={s.button}>
            <Headphones stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem type="b.20.pc.main">{strings.listen}</TextItem>
          </Button>
          <Button style={s.button}>
            <Video stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem type="b.20.pc.main">{strings.watch}</TextItem>
          </Button>
        </View>
        <Gap vertical={sp.sl} />
      </Animated.View>
      <AnimatedOverlay ref={overlayRef} onTap={onTap} />
      <Animated.View style={[s.tipContainer, tipStyle]}>
        <View style={s.tip} />
        <View style={s.tipContent}>
          <Button style={s.tipButton} onPress={onShare}>
            <TextItem type="r.20.nc.90">{strings.share}</TextItem>
          </Button>
          <Button style={s.tipButton} onPress={tableContentPress}>
            <TextItem type="r.20.nc.90">{strings.tableOfContent}</TextItem>
          </Button>
        </View>
      </Animated.View>
    </Base>
  );
};

export default Reading;
