import { Lock } from "@assets";
import { getBookCoverImageURL } from "@services";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { checkData } from "../../../utils";
import {
  neutralColor,
  neutralColorButton,
  neutralColorNormalKebalikan,
  neutralColorText,
  primaryColor,
  spacing as sp,
  strings
} from "../../../constants";
import { ReduxState } from "../../../redux/reducers";
import { Amage, Button, Gap, Seed, TextItem } from "../../atom";
import styles from "./styles";

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
  const [loadDoneReading, setLoadDoneReading] = useState<any>(false);

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

  const checkBook = progress.find((cb: any) => cb.book === title);
  return (
    <View style={{ flexDirection: "row" }}>
      <Button onPress={tilePress} style={styles.container}>
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
        <>
          <TextItem type="b.14.nc.80" numberOfLines={1}>
            Day {index + 1}
          </TextItem>
          <View style={styles.boxTitle}>
            <TextItem type="b.14.nc.90" numberOfLines={2} style={styles.title}>
              {title}
            </TextItem>
            {lockReadingListenViewBook && (
              <Button onPress={subsPress} style={styles.lock}>
                <Lock color={neutralColorText[90]} width={30} />
              </Button>
            )}
          </View>
          <TextItem type="i.14.nc.80" numberOfLines={1}>{`${author}`}</TextItem>
        </>
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
        <View style={styles.containerButton}>
          {checkData(checkBook) ? (
            <Button
              onPress={tilePress}
              style={[
                styles.btn,
                styles.btnDone,
                {
                  backgroundColor: neutralColorNormalKebalikan[20]
                }
              ]}
            >
              <TextItem
                type="b.14"
                style={{
                  color: neutralColorNormalKebalikan[90]
                }}
              >
                Baca Ulang
              </TextItem>
            </Button>
          ) : (
            <>
              <Button
                onPress={tilePress}
                style={[
                  styles.btn,
                  styles.btnRead,
                  {
                    backgroundColor: neutralColorButton[80]
                  }
                ]}
              >
                <TextItem type="b.14.ncbtn.80">Baca</TextItem>
              </Button>
              <Button
                onPress={async () => {
                  await setLoadDoneReading(true);
                  setTimeout(() => {
                    btnDonePress();
                  }, 500);
                }}
                style={[
                  styles.btn,
                  styles.btnDone,
                  {
                    backgroundColor: neutralColorNormalKebalikan[20]
                  }
                ]}
              >
                {loadDoneReading ? (
                  <ActivityIndicator
                    size="small"
                    color={neutralColorNormalKebalikan[90]}
                  />
                ) : (
                  <TextItem
                    type="b.14"
                    style={{
                      color: neutralColorNormalKebalikan[90]
                    }}
                  >
                    Selesai
                  </TextItem>
                )}
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default BookTileChallenge;
