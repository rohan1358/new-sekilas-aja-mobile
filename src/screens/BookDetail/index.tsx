import {
  Bank,
  ChevronRight,
  Clock,
  File,
  Headphones,
  Lock,
  Sunrise,
  Video,
} from "@assets";
import {
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings,
} from "@constants";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
  View,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector } from "react-redux";
import {
  Amage,
  Base,
  BookTile,
  Button,
  CardComent,
  Gap,
  HeaderBookDetail,
  TextItem,
} from "../../components";
import { SnackStateProps } from "../../components/atom/Base/types";
import { logger } from "../../helpers/helper";
import { ReduxState } from "../../redux/reducers";
import { fetchDetailBooks, fetchRecommendedBooks } from "../../services";
import { CompactBooksProps } from "../Home/types";
import { comentList, daftarIsi } from "./dummy";
import styles from "./styles";

export default function BookDetail({ navigation, route }: any) {
  const {
    editProfile: { profile },
  } = useSelector((state: ReduxState) => state);

  const { item } = route.params;

  // console.log(item)

  const isMounted = useRef<boolean>();
  const refScroll = useRef<any>(null);

  const yOffset = useSharedValue(0);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [allInfo, setAllInfo] = useState(false);
  const [ratingCount, setRatingCount] = useState(4.5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [statusSub, setStatusSub] = useState(false);
  const [book, setBook] = useState({
        book_title: '',
        author: '',
        read_time: '',
        id: '',
        book_cover: '',
        category: '',
        description: '',
        short_desc: '',
        audio_link: '',
        video_link: '',
        watch_time: '',
      });

  const getDetailBookData = async () => {
    setIsLoading(true);
    try {
      const [detailBook,recomData] = await Promise.all([
        fetchDetailBooks(item.id),
        fetchRecommendedBooks(),
      ]);
      if (!isMounted.current) {
        return;
      }
      if (detailBook.isSuccess) {
        setBook(detailBook.data);
        // console.log(detailBook)
      } else {
        throw new Error("Fail on fetching released books data");
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data);
      }else {
        throw new Error("Fail on fetching released books data");
      }
    } catch (error) {
      logger("Detail Book, getDetailBookData", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    const handleSub = () => {
      const subsc = profile?.is_subscribed;
      if (!subsc) {
        setStatusSub(true);
      }
    };

    handleSub();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getDetailBookData();

    () => {
      isMounted.current = false;
    };
  }, [item]);

  const toTop = (data:any) => {
    // use current
    yOffset.value = 0
    refScroll.current.scrollTo({ x: 0, y: 0, animated: true });
    navigation.navigate(pages.BookDetail, { item: data });
  };

  const stylez = useAnimatedStyle(() => {
    return {
      display: yOffset.value > 268 ? "flex" : "none",
    };
  });

  const navigationTopBar = (type = "", link = '') => {
    switch (type) {
      case "reading":
        // navigation.navigate(pages.Listening);
        break;
      case "listening":
        navigation.navigate(pages.Listening,{link});
        break;
      case "watching":
        navigation.navigate(pages.Watching,{link});
        break;

      default:
        break;
    }
  };

  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainHome}
      >
        <HeaderBookDetail
          navigation={navigation}
          onFavorite={() => setActive(!active)}
          onDownload={() => logger("donwload")}
          Active={active}
        />
        {statusSub ? (
          <Animated.View style={[styles.SelectBarUp, styles.upgrade_yuk, stylez]}>
            <Lock color={primaryColor.main} width={28} />
            <TextItem style={styles.titleSelect}>{strings.yuk_upgrade}</TextItem>
          </Animated.View>
        ) : (
            <Animated.View style={[styles.SelectBarUp, stylez]}>
              {

              }
            <Button
              onPress={() => navigationTopBar("reading")}
              style={styles.btnBar}
            >
              <File />
              <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
            </Button>
              {
                book.audio_link != '' &&
                <Button
                  onPress={() => navigationTopBar("listening")}
                  style={styles.btnBar}
                >
                  <Headphones />
                  <TextItem style={styles.titleSelect}>{strings.dengar}</TextItem>
                </Button>
              }
              {
                book.video_link != '' &&
                <Button
                  onPress={() => navigationTopBar("watching")}
                  style={styles.btnBar}
                >
                  <Video />
                  <TextItem style={styles.titleSelect}>{strings.tonton}</TextItem>
                </Button>
              }
          </Animated.View>
        )}
        <Animated.ScrollView
          ref={refScroll}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
            (yOffset.value = event.nativeEvent.contentOffset.y)
          }
          scrollEventThrottle={16}
        >
          <View style={styles.layer}>
            <View style={styles.head}>
              <View style={styles.boxImage}>
                <Amage
                  style={styles.image}
                  source={book?.book_cover}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={[styles.boxSelect]}>
            {statusSub ? (
              <View style={[styles.SelectBar, styles.upgrade_yuk]}>
                <Lock color={primaryColor.main} width={28} />
                <TextItem style={styles.titleSelect}>
                  {strings.yuk_upgrade}
                </TextItem>
              </View>
            ) : (
              <View style={styles.SelectBar}>
                <Button
                  onPress={() => navigationTopBar("reading")}
                  style={styles.btnBar}
                >
                  <File />
                  <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
                </Button>
                {
                  book.audio_link != '' &&
                  <Button
                    onPress={() => navigationTopBar("listening")}
                    style={styles.btnBar}
                  >
                    <Headphones />
                    <TextItem style={styles.titleSelect}>{strings.dengar}</TextItem>
                  </Button>
                }
                {
                  book.video_link != '' &&
                  <Button
                    onPress={() => navigationTopBar("watching")}
                    style={styles.btnBar}
                  >
                    <Video />
                    <TextItem style={styles.titleSelect}>{strings.tonton}</TextItem>
                  </Button>
                }
              </View>
            )}
          </View>

          <View style={styles.sectionDetail}>
            <View style={styles.boxTitle}>
              <TextItem style={styles.titleBook}>{book?.book_title}</TextItem>
              <TextItem style={styles.titleOuthor}>{book?.author}</TextItem>
              <View style={styles.info}>
                <Clock style={styles.iconInfo} stroke={neutralColor[70]} />
                <View style={styles.boxTextInfo}>
                  <TextItem style={styles.textInfo}>{book?.read_time+' min'}</TextItem>
                </View>
                <Sunrise style={styles.iconInfo} />
                <View style={styles.boxTextInfo}>
                  <TextItem style={styles.textInfo}>{"20 wawasan"}</TextItem>
                </View>
              </View>
            </View>

            <View style={styles.sectionList}>
              <TextItem style={styles.titleSection}>{strings.kategori}</TextItem>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.boxTextKategori}>
                  <TextItem style={styles.textKategori}>
                    {book?.category[1]}
                  </TextItem>
                  <Bank />
                </View>
              </View>
            </View>

            <View style={styles.sectionList}>
              <TextItem style={styles.titleSection}>
                {strings.tentang_buku}
              </TextItem>
              <View style={styles.boxTextTentang}>
                <TextItem style={styles.textTentang}>
                     {book?.short_desc}
                </TextItem>
              </View>
            </View>

            {allInfo && (
              <>
                <View style={styles.boxRelease}>
                  <TextItem style={styles.texttglRelease}>
                    {strings.tgl_release}
                  </TextItem>
                  <TextItem style={styles.tgl}>{"8 September 2020"}</TextItem>
                  <TextItem style={styles.textpublikasi}>
                    {strings.publikasi}
                    {"Amerika Serikat"}
                  </TextItem>
                  <View style={styles.listTentang}>
                    <TextItem style={styles.texttglRelease}>
                      {strings.penulis}
                    </TextItem>
                    <View style={styles.boxAvatar}>
                      <View style={styles.boxImageAvatar}>
                        <Amage style={styles.imageAvatar} resizeMode="contain" />
                      </View>
                      <View>
                        <TextItem style={styles.tgl}>{"Morgan Housel "}</TextItem>
                        <TextItem style={styles.textpublikasi}>
                          {"Mitra di The Collaborative Fund"}
                        </TextItem>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.boxDaftarIsi}>
                  <TextItem style={[styles.titleSection, styles.textDaftarIsi]}>
                    {strings.daftar_isi}
                  </TextItem>
                  <View style={styles.boxListDaftar}>
                    {daftarIsi.map((item, index) => (
                      <Button key={index} style={styles.listDaftar}>
                        <TextItem style={styles.textDfatar}>
                          {item.title}
                        </TextItem>
                        <ChevronRight color={neutralColor[50]} />
                      </Button>
                    ))}
                  </View>
                </View>

                <View>
                  <View style={styles.boxTitleUlasan}>
                    <TextItem style={styles.titleSection}>
                      {strings.ulasan}
                    </TextItem>
                    <Button>
                      <TextItem style={styles.textLihatSemua}>
                        {strings.lihat_semua}
                      </TextItem>
                    </Button>
                  </View>

                  <View style={styles.containerRating}>
                    <View style={styles.boxRating}>
                      <TextItem style={styles.textRating}>
                        {ratingCount.toString()}
                      </TextItem>
                      <AirbnbRating
                        count={5}
                        defaultRating={ratingCount}
                        size={25}
                        showRating={false}
                        isDisabled={true}
                        selectedColor="#E27814"
                      />
                    </View>
                    <TextItem style={styles.textUlasanDari}>
                      {strings.ulasan_dari + "183" + strings.pembaca}
                    </TextItem>
                  </View>

                  <View style={styles.boxKomentar}>
                    <TextItem style={styles.textKomentar}>
                      {strings.komentar}
                    </TextItem>
                    {comentList.map((coment, index) => (
                      <CardComent
                        key={index}
                        name={coment.name}
                        time={coment.time}
                        text={coment.text}
                        rating={coment.rating}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.sectionList}>
                  <TextItem style={styles.titleSection}>
                    {strings.beri_ulasan}
                  </TextItem>
                  <AirbnbRating
                    count={5}
                    defaultRating={0}
                    size={25}
                    showRating={false}
                    selectedColor="#E27814"
                    ratingContainerStyle={styles.containerRatingChange}
                    starContainerStyle={styles.starContainer}
                  />
                  <TextInput
                    placeholder="Isi ulasan di sini.."
                    style={styles.multipelTextInput}
                    multiline
                    textAlignVertical="top"
                  />
                  <Button style={styles.btnKirim}>
                    <TextItem style={styles.textBtn}>{strings.kirim}</TextItem>
                  </Button>
                </View>
              </>
            )}

            <View style={styles.boxLihatLebih}>
              <Button onPress={() => setAllInfo(!allInfo)}>
                <TextItem style={styles.texttglRelease}>
                  {allInfo ? strings.lebih_sedikit : strings.lebih_banyak}
                </TextItem>
              </Button>
            </View>
          </View>

          <View style={styles.sectionSaran}>
            <View style={styles.headSaran}>
              <TextItem style={styles.titleSection}>
                {strings.buku_serupa}
              </TextItem>
              <Button>
                <TextItem style={styles.textLihatSemua}>
                  {strings.lihat_semua}
                </TextItem>
              </Button>
            </View>
            <View style={styles.boxListBook}>
              {recommendedBooks?.map((item: CompactBooksProps, index) => {
                return (
                  <View key={index} style={styles.columnWrapperStyle}>
                    <BookTile
                      title={item?.book_title}
                      author={`${item?.author}`}
                      duration={item?.read_time}
                      cover={item?.book_cover}
                      isVideoAvailable={item?.isVideoAvailable}
                      onPress={() => toTop(item)}
                      navSubscrive={() => navigation.navigate(pages.Subscribe)}
                    />
                    <Gap vertical={sp.sl} />
                  </View>
                );
              })}
            </View>
          </View>
        </Animated.ScrollView>
      </SkeletonContent>
    </Base>
  );
}
