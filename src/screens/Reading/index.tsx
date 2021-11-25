import { ChevronLeft, ChevronRight, Headphones, Video } from "@assets";
import {
  AnimatedOverlay,
  Base,
  Button,
  ButtonIcon,
  DummyFlatList,
  Gap,
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
import { View } from "react-native";
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

const Reading = ({ navigation, route }: ReadingProps) => {
  const BOOK_ID = route.params?.id;

  const isMounted = useRef<boolean>(true);
  const overlayRef = useRef<any>();

  const actionPosition = useSharedValue(0);
  const tipPosition = useSharedValue(-WIDTH / 2);

  const [content, setContent] = useState<BookContentProps>();
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
        actionPosition.value = withTiming(-128);
        tipPosition.value = withTiming(64);
        overlayRef.current?.open();
      }}
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

  const onNextPress = () =>
    setCurrentPage((current) =>
      current < (content?.numberOfPage || 0) - 1 ? current + 1 : current
    );

  const onPrevPress = () =>
    setCurrentPage((current) => (current > 0 ? current - 1 : current));

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

  const tableContentPress = () => {
    overlayRef.current?.close();
    onTap();
    navigation.navigate("BookTableContent");
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

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        isLoading={isLoading}
        layout={skeleton.mainReading}
        containerStyle={s.skeleton}
      >
        <DummyFlatList contentContainerStyle={s.contentContainerStyle}>
          <Gap vertical={sp.s} />
          <View style={s.control}>
            <ButtonIcon
              onPress={onPrevPress}
              disabled={isOnFirstPage}
              style={s.prevButton}
            >
              <ChevronLeft stroke={neutralColor[70]} />
            </ButtonIcon>
            <Gap horizontal={sp.s} />
            <TextItem type="r.16.nc.70">{`${currentPage + 1} dari ${
              content?.numberOfPage
            }`}</TextItem>
            <Gap horizontal={sp.s} />
            <ButtonIcon
              onPress={onNextPress}
              disabled={isOnLastPage}
              style={s.nextButton}
            >
              <ChevronRight stroke={neutralColor[70]} />
            </ButtonIcon>
          </View>
          <Gap vertical={36} />
          <TextItem type="b.32.nc.100">{currenTitle}</TextItem>
          <Gap vertical={sp.sl} />
          <FlatList
            data={content?.pageContent[currentPage]?.details}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
          <Gap vertical={sp.sl * 3} />
        </DummyFlatList>
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
          <Button style={s.tipButton}>
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
