import { Headphones, Video } from "@assets";
import {
  AnimatedOverlay,
  Base,
  Button,
  DummyFlatList,
  DuoRender,
  EmptyPlaceholder,
  Gap,
  PageController,
  ReadingHeader,
  TextItem
} from "@components";
import {
  firebaseNode,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings
} from "@constants";
import { logger, useMounted, widthPercent } from "@helpers";
import firestore from "@react-native-firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReduxState } from "@rux";
import { fetchBookContent, fetchDetailBooks } from "@services";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Share, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector } from "react-redux";
import { RootStackParamList } from "src/types";
import {
  HeaderStateProps,
  SnackStateProps
} from "../../components/atom/Base/types";
import styles from "./styles";

const WIDTH = widthPercent(100);
const ACTION_HIDE = -128;

const Reading = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Reading">>();

  const {
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);

  const isMounted = useMounted();
  const overlayRef = useRef<any>();
  const scrollRef = useRef<FlatList<any>>();

  const actionPosition = useSharedValue(ACTION_HIDE);
  const tipPosition = useSharedValue(-WIDTH / 2);

  const [content, setContent] = useState<BookContentProps | null>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [detailBook, setDetailBook] = useState(false);

  const actionStyle = useAnimatedStyle(() => ({
    bottom: actionPosition.value
  }));

  const tipStyle = useAnimatedStyle(() => ({ top: tipPosition.value }));

  const currentTitle = useMemo(
    () => (!!content ? content?.pageContent[currentPage]?.title : ""),
    [content, currentPage]
  );

  useEffect(() => {
    getBookContent();
  }, []);

  useEffect(() => {
    if (!route.params?.page) {
      return;
    }
    setCurrentPage(parseInt(route.params?.page) || 0);
  }, [route.params?.page]);

  const closeActions = () => (actionPosition.value = withTiming(0));

  const closeTip = () => (tipPosition.value = withTiming(-WIDTH / 2));

  const BOOK_ID = route.params?.id;
  const BOOK = route.params?.book;

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

  const falseComponent = (
    <EmptyPlaceholder
      title={strings.kilasEmpty}
      subtitle={strings.kilasEmptyDesc}
    />
  );

  const getDetailBook = async () => {
    try {
      const [detailBook] = await Promise.all([fetchDetailBooks(BOOK_ID)]);

      if (!BOOK) {
        setDetailBook(detailBook.data);
      }
    } catch {}
  };

  useEffect(() => {
    getDetailBook();
  }, []);

  const getBookContent = async () => {
    if (!BOOK_ID) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookContent({
        bookTitle: BOOK_ID
      });
      if (!isMounted) return;
      if (!isSuccess) return;

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
    customComp
  };

  const isOnFirstPage = currentPage === 0;

  const isOnLastPage = currentPage === (content?.numberOfPage || 0) - 1;

  const keyExtractor = (item: string) => `${item}`;

  const label = `${currentPage + 1} dari ${content?.numberOfPage}`;

  const onMark = () => {
    firestore()
      .collection(firebaseNode.lastReadBook)
      .doc(email)
      .update({
        "book.book": BOOK_ID,
        "book.kilas": currentPage + 1
      })
      .then(() => {
        setSnackState(ss.successState(strings.marked));
      })
      .catch(() => {
        setSnackState(ss.failState(strings.markFailed));
      })
      .finally(() => {
        onTap();
        overlayRef.current?.close();
      });
  };

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
        message: `"${currentTitle}"
        
Penggalan kilas ini merupakan bagian dari buku ${BOOK_ID}. Baca keseluruhan kilas di https://sekilasaja.com`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          onTap();
          overlayRef.current?.close();
        } else {
          onTap();
          overlayRef.current?.close();
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
    navigation.navigate("BookTableContent", {
      id: BOOK_ID,
      isFromReading: true,
      readingPayload: content?.pageContent?.map((item) => ({
        id: item?.id,
        kilas: item?.kilas,
        title: item?.title
      }))
    });
  };

  const navigationTopBar = (type: any) => {
    switch (type) {
      case "reading":
        navigation.navigate("Reading", {
          id: BOOK_ID,
          page: 1,
          book: BOOK || detailBook
        });
        break;
      case "listening":
        navigation.navigate("Listening", {
          book: BOOK || detailBook
        });
        break;
      case "watching":
        navigation.navigate("Watching", { book: BOOK || detailBook });
        break;

      default:
        break;
    }
  };

  const s = styles({ isOnFirstPage, isOnLastPage });

  return (
    <Base {...{ headerState, snackState, setSnackState }}>
      <SkeletonContent
        isLoading={isLoading}
        layout={skeleton.mainReading}
        containerStyle={s.skeleton}
      >
        <DuoRender isRenderMain={!!content} falseComponent={falseComponent}>
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
                onPrevPress
              }}
            />
            <Gap vertical={36} />
            <TextItem type="b.32.nc.100">{currentTitle}</TextItem>
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
                onPrevPress
              }}
            />
            <Gap vertical={sp.xl * 3} />
          </DummyFlatList>
        </DuoRender>
      </SkeletonContent>
      <Animated.View style={[s.actionWrapper, actionStyle]}>
        <LinearGradient
          colors={["#fff1", "#fff8", "#fff"]}
          style={s.linearGradient}
        ></LinearGradient>
        <View style={s.actions}>
          <Button
            style={s.button}
            onPress={() => navigationTopBar("listening")}
          >
            <Headphones stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem style={s.titleSelect}>{strings.listen}</TextItem>
          </Button>
          <Button onPress={() => navigationTopBar("watching")} style={s.button}>
            <Video stroke={primaryColor.main} />
            <Gap horizontal={sp.xs} />
            <TextItem style={s.titleSelect}>{strings.watch}</TextItem>
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
          <Button style={s.tipButton} onPress={onMark}>
            <TextItem type="r.20.nc.90">{strings.mark}</TextItem>
          </Button>
        </View>
      </Animated.View>
    </Base>
  );
};

export default Reading;
