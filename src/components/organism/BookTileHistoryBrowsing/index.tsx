import { File, Headphones, Lock, Video } from "@assets";
import { getBookCoverImageURL } from "@services";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, ProgressBarAndroid } from "react-native";
import { useSelector } from "react-redux";
import { adjust, checkData } from "../../../utils";
import {
  neutralColor,
  primaryColor,
  spacing as sp,
  strings
} from "../../../constants";
import { ReduxState } from "../../../redux/reducers";
import { Amage, Button, Gap, Seed, TextItem } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const BookTileChallenge = ({
  title,
  author,
  duration,
  cover,
  onPress,
  navSubscrive,
  isVideoAvailable,
  onPressDone,
  progress,
  index
}: BookTileProps) => {
  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const subsPress = () => navSubscrive && navSubscrive();

  const tilePress = () => onPress(title);
  const btnDonePress = () => onPressDone && onPressDone(title);

  const lockReadingListenViewBook =
    profile?.is_subscribed || profile.owned_books.includes(title)
      ? false
      : true;

  const [newCover, setNewCover] = useState<any>("");

  const newGetCover = async () => {
    getBookCoverImageURL(title).then((res) => {
      setNewCover(res);
    });
  };

  useEffect(() => {
    if (cover) {
      setNewCover(cover);
    } else {
      newGetCover();
    }
  }, []);

  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={(id) => navigation.navigate("BookDetail", { id: title })}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <View style={styles.background}>
            <View style={styles.innerBackgorund} />
          </View>
          <View>
            {newCover !== "" && (
              <Amage
                style={styles.image}
                source={newCover}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Button>
      <View style={styles.detail}>
        <Button
          onPress={(id) => navigation.navigate("BookDetail", { id: title })}
        >
          <View style={styles.boxTitle}>
            <>
              <TextItem
                type="b.14.nc.90"
                numberOfLines={2}
                style={styles.title}
              >
                {title}
              </TextItem>
            </>
          </View>
          <TextItem type="i.14.nc.80" numberOfLines={1}>{`${author}`}</TextItem>
        </Button>
        <Gap vertical={sp.sm} />
        {/* <View style={styles.seeds}>
          <Seed label={`${duration} min`} />
          <Gap horizontal={sp.xs} />
          {isVideoAvailable && (
            <Seed
              label={strings.video}
              bg={neutralColor[90]}
              textColor="pc.main"
            />
          )}
        </View> */}
        {checkData(progress.reading) && (
          <>
            <View style={styles.containerButton}>
              <TextItem>
                <File stroke={"black"} strokeWidth={2} />
              </TextItem>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress.reading.persentase / 100}
                style={{ flex: 1, marginHorizontal: adjust(5) }}
                color={primaryColor.main}
              />
              <TextItem>{progress.reading.persentase}%</TextItem>
            </View>
            <Gap vertical={sp.xs} />
          </>
        )}

        {checkData(progress.listening) && (
          <>
            <View style={styles.containerButton}>
              <TextItem>
                <Headphones stroke={"black"} strokeWidth={2} />
              </TextItem>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress.listening.persentase / 100}
                style={{ flex: 1, marginHorizontal: adjust(5) }}
                color={primaryColor.main}
              />
              <TextItem>{progress.listening.persentase}%</TextItem>
            </View>
            <Gap vertical={sp.xs} />
          </>
        )}

        {checkData(progress.watching) && (
          <View style={styles.containerButton}>
            <TextItem>
              <Video stroke={"black"} strokeWidth={2} />
            </TextItem>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress.watching.persentase / 100}
              style={{ flex: 1, marginHorizontal: adjust(5) }}
              color={primaryColor.main}
            />
            <TextItem>{progress.watching.persentase}%</TextItem>
          </View>
        )}
      </View>
    </View>
  );
};

export default BookTileChallenge;
