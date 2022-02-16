import {
  Bank,
  ChevronRight,
  Clock,
  File,
  Headphones,
  Lock,
  Sunrise,
  Video
} from "@assets";
import {
  neutralColor,
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings
} from "@constants";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
  View,
  Text
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useDispatch, useSelector } from "react-redux";
import {
  Amage,
  Base,
  BookTile,
  Button,
  CardComent,
  Gap,
  HeaderBookDetail,
  ModalSubscribe,
  TextItem
} from "../../components";
import { SnackStateProps } from "../../components/atom/Base/types";
import { logger } from "../../helpers";
import { ReduxState } from "../../redux/reducers";
import {
  fetchBookContent,
  fetchDetailBooks,
  fetchFavoriteBooks,
  fetchRecommendedBooks,
  getBookCoverImageURL,
  postBookFavorite
} from "../../services";
import { fetchCommentarryBook } from "../../services/commentarry";
import { checkData, formatDate } from "../../utils";
import { CompactBooksProps } from "../Home/types";
import { WebView } from "react-native-webview";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { handleOpenModalSubscribe } from "@actions";

const openRate = false;

export default function BookDetail({ navigation, route }: any) {
  const {
    editProfile: { profile },
    sessionReducer: { email }
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  const { id } = route.params;

  const isMounted = useRef<boolean>();
  const refScroll = useRef<any>(null);

  const yOffset = useSharedValue(0);
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [ratingCount, setRatingCount] = useState(4.5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);
  const [recommendedBooks, setRecommendedBooks] =
    useState<CompactBooksProps[]>();
  const [statusSub, setStatusSub] = useState(false);
  const [daftarIsi, setDaftarIsi] = useState([]);
  const [favorite, setFavorite] = useState<any>([]);
  const [listComment, setListComment] = useState<any>(false);
  const [newCover, setNewCover] = useState<any>("");

  const setModalAllPlan = () => {
    dispatch(handleOpenModalSubscribe());
  };

  const [book, setBook] = useState({
    book_title: "",
    author: "",
    read_time: "",
    id: "",
    book_cover: "",
    category: "",
    description: "",
    short_desc: "",
    audio_link: "",
    video_link: "",
    watch_time: "",
    descriptions: []
  });

  const getDetailBookData = async () => {
    setIsLoading(true);
    try {
      const [detailBook, recomData, kilasBook] = await Promise.all([
        fetchDetailBooks(id),
        fetchRecommendedBooks(),
        fetchBookContent({ bookTitle: id })
      ]);

      if (!isMounted.current) {
        return;
      }
      if (detailBook.isSuccess) {
        setBook(detailBook.data);
        newGetCover(detailBook.data);
        setDaftarIsi(kilasBook.data.pageContent);
      } else {
        throw new Error("Fail on fetching released books data");
      }
      if (recomData.isSuccess) {
        setRecommendedBooks(recomData.data);
      } else {
        throw new Error("Fail on fetching released books data");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleSub = () => {
      const subsc = profile?.is_subscribed;
      if (subsc) {
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
  }, [id]);

  useEffect(() => {
    const fetchComment = async () => {
      const list = await fetchCommentarryBook(id);

      setListComment(list.data);
    };
    fetchComment();
  }, []);

  const getFavorite = async (checking: boolean) => {
    const res = await fetchFavoriteBooks(email);
    if (res) {
      const filterArr = (arr: any[]) => {
        return arr.filter((v, i) => arr.indexOf(v) === i);
      };
      if (!checking) {
        if (res?.book.includes(id)) {
          setActive(true);
        }
      }

      let arr = [...res?.book, id];
      let newRes = res.book ? filterArr(arr) : [id];
      setFavorite(newRes);
    } else {
      setFavorite([id]);
    }
    return res ? res?.book : [];
  };

  const focus = useIsFocused();

  useEffect(() => {
    getFavorite(false);
  }, []);

  const toTop = (id: any) => {
    // use current
    yOffset.value = 0;
    refScroll.current.scrollTo({ x: 0, y: 0, animated: true });
    navigation.navigate(pages.BookDetail, { id: id });
  };

  const stylez = useAnimatedStyle(() => {
    return {
      display: yOffset.value > 268 ? "flex" : "none"
    };
  });

  const navigationTopBar = (type = "", link = "", page = 0) => {
    switch (type) {
      case "reading":
        navigation.navigate("Reading", { id: book.id, page: page || 0, book });
        break;
      case "listening":
        navigation.navigate(pages.Listening, {
          book: book,
          listAudio: daftarIsi
        });
        break;
      case "watching":
        navigation.navigate(pages.Watching, { book });
        break;

      default:
        break;
    }
  };

  const addToFavorite = async () => {
    const list = await getFavorite(true);
    if (list.includes(id)) {
      postBookFavorite(email, {
        book: favorite.filter((t: []) => t !== id),
        jumlah: favorite.length - 1
      });
    } else {
      postBookFavorite(email, { book: favorite, jumlah: favorite.length });
    }
  };

  const newGetCover = async (param: any) => {
    getBookCoverImageURL(param?.book_title).then((res) => {
      setNewCover(res);
    });
  };

  const lockReadingListenViewBook =
    statusSub || profile.owned_books.includes(book?.book_title) ? true : false;

  return (
    <>
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
            onFavorite={() => {
              setActive(!active);
              addToFavorite();
            }}
            onDownload={() => logger("donwload")}
            active={active}
            isSubscribe={lockReadingListenViewBook}
          />
          {lockReadingListenViewBook ? (
            <>
              <Animated.View style={[styles.SelectBarUp, stylez]}>
                <Button
                  onPress={() => navigationTopBar("reading")}
                  style={styles.btnBar}
                >
                  <File />
                  <TextItem style={styles.titleSelect}>{strings.baca}</TextItem>
                </Button>
                <Button
                  onPress={() => navigationTopBar("listening")}
                  style={styles.btnBar}
                >
                  <Headphones />
                  <TextItem style={styles.titleSelect}>
                    {strings.dengar}
                  </TextItem>
                </Button>
                {checkData(book.video_link) && (
                  <Button
                    onPress={() => navigationTopBar("watching")}
                    style={styles.btnBar}
                  >
                    <Video />
                    <TextItem style={styles.titleSelect}>
                      {strings.tonton}
                    </TextItem>
                  </Button>
                )}
              </Animated.View>
            </>
          ) : (
            <>
              <Animated.View
                style={[styles.SelectBarUp, styles.upgrade_yuk, stylez]}
              >
                <Button onPress={() => setModalAllPlan()} style={styles.btnBar}>
                  <Lock color={primaryColor.main} width={28} />
                  <TextItem style={styles.titleSelect}>
                    {strings.yuk_upgrade}
                  </TextItem>
                </Button>
                {/* <Lock color={primaryColor.main} width={28} />
              <TextItem style={styles.titleSelect}>
                {strings.yuk_upgrade}
              </TextItem> */}
              </Animated.View>
            </>
          )}
          <Animated.ScrollView
            ref={refScroll}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
              (yOffset.value = event.nativeEvent.contentOffset.y)
            }
            scrollEventThrottle={16}
          >
            <View style={styles.layer}>
              <View style={styles.head}></View>
            </View>
            <View style={styles.boxImage}>
              <Amage
                style={styles.image}
                source={
                  checkData(book?.book_cover) ? book?.book_cover : newCover
                }
                resizeMode="contain"
              />
            </View>
            <View style={[styles.boxSelect]}>
              {lockReadingListenViewBook ? (
                <View style={styles.SelectBar}>
                  <Button
                    onPress={() => navigationTopBar("reading")}
                    style={styles.btnBar}
                  >
                    <File />
                    <TextItem style={styles.titleSelect}>
                      {strings.baca}
                    </TextItem>
                  </Button>
                  {/* {book.audio_link != '' && ( */}
                  <Button
                    onPress={() => navigationTopBar("listening")}
                    style={styles.btnBar}
                  >
                    <Headphones />
                    <TextItem style={styles.titleSelect}>
                      {strings.dengar}
                    </TextItem>
                  </Button>
                  {/* )} */}
                  {book.video_link != "" && (
                    <Button
                      onPress={() => navigationTopBar("watching")}
                      style={styles.btnBar}
                    >
                      <Video />
                      <TextItem style={styles.titleSelect}>
                        {strings.tonton}
                      </TextItem>
                    </Button>
                  )}
                </View>
              ) : (
                <View style={[styles.SelectBar, styles.upgrade_yuk]}>
                  <Button
                    onPress={() => setModalAllPlan()}
                    style={styles.btnBar}
                  >
                    <Lock color={primaryColor.main} width={28} />
                    <TextItem style={styles.titleSelect}>
                      {strings.yuk_upgrade}
                    </TextItem>
                  </Button>
                </View>
              )}
            </View>

            <View style={styles.sectionDetail}>
              <View style={styles.boxTitle}>
                <TextItem style={styles.titleBook}>{book?.book_title}</TextItem>
                <TextItem style={styles.textShortDesc}>
                  {book?.short_desc}
                </TextItem>
                <TextItem style={styles.titleOuthor}>{book?.author}</TextItem>
                <View style={styles.info}>
                  <Clock style={styles.iconInfo} stroke={neutralColor[70]} />
                  <View style={styles.boxTextInfo}>
                    <TextItem style={styles.textInfo}>
                      {book?.read_time + " min"}
                    </TextItem>
                  </View>
                  <Sunrise style={styles.iconInfo} />
                  <View style={styles.boxTextInfo}>
                    <TextItem style={styles.textInfo}>
                      {daftarIsi.length + " " + strings.kilas}
                    </TextItem>
                  </View>
                </View>
              </View>

              <View style={styles.sectionList}>
                <TextItem style={styles.titleSection}>
                  {strings.kategori}
                </TextItem>
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
                  {book?.descriptions.map((desc, index) => (
                    <TextItem style={styles.textTentang}>{desc}</TextItem>
                  ))}
                </View>
              </View>

              <>
                {/* <View style={styles.boxRelease}>
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
              </View> */}

                <View style={styles.boxDaftarIsi}>
                  <TextItem style={[styles.titleSection, styles.textDaftarIsi]}>
                    {strings.daftar_isi}
                  </TextItem>
                  <View style={styles.boxListDaftar}>
                    {daftarIsi.map(({ title }, index) => (
                      <Button
                        onPress={() => {
                          !lockReadingListenViewBook
                            ? setModalAllPlan()
                            : navigationTopBar("reading", "", index);
                        }}
                        key={index}
                        style={styles.listDaftar}
                      >
                        <TextItem style={styles.textDfatar}>
                          Kilas {index + 1}: {title || ""}
                        </TextItem>
                        <ChevronRight
                          style={{
                            position: "absolute",
                            right: 2,
                            marginVertical: "40%"
                          }}
                          color={neutralColor[50]}
                        />
                      </Button>
                    ))}
                  </View>
                </View>
                {/* <View style={styles.boxTitleUlasan}>
                <TextItem style={styles.titleSection}>
                  {strings.ulasan}
                </TextItem>
                <Button>
                  <TextItem style={styles.textLihatSemua}>
                    {strings.lihat_semua}
                  </TextItem>
                </Button>
              </View>
              <View>
                {openRate && (
                  <>
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
                        {`${strings.ulasan_dari} ${
                          listComment ? listComment.length : 0
                        } ${strings.pembaca}`}
                      </TextItem>
                    </View>
                  </>
                )}

                <View style={styles.boxKomentar}>
                  <TextItem style={styles.textKomentar}>
                    {strings.komentar}
                  </TextItem>
                  {listComment ? (
                    listComment
                      .sort(
                        (a: any, b: any) => b.date.toDate() - a.date.toDate()
                      )
                      .map((coment: any, index: number) => (
                        <CardComent
                          key={index}
                          name={coment.name}
                          time={formatDate(coment.date.toDate())}
                          text={coment.text}
                          rating={3}
                        />
                      ))
                  ) : (
                    <>
                      <TextItem style={styles.textTidakAdaKomentar}>
                        {strings.tidak_ada_komentar}
                      </TextItem>
                    </>
                  )}
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
              </View> */}
              </>

              {/* <View style={styles.boxLihatLebih}>
              <Button onPress={() => setAllInfo(!allInfo)}>
                <TextItem style={styles.texttglRelease}>
                  {allInfo ? strings.lebih_sedikit : strings.lebih_banyak}
                </TextItem>
              </Button>
            </View> */}
            </View>

            <View style={styles.sectionSaran}>
              <View style={styles.headSaran}>
                <TextItem style={styles.titleSection}>
                  {strings.buku_serupa}
                </TextItem>
                <Button>
                  {/* <TextItem style={styles.textLihatSemua}>
                    {strings.lihat_semua}
                  </TextItem> */}
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
                        onPress={() => toTop(item.id)}
                        navSubscrive={() =>
                          navigation.navigate(pages.Subscribe)
                        }
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
    </>
  );
}
