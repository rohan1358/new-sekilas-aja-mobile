import { Lock } from "@assets";
import { getBookCoverImageURL } from "@services";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import {
  neutralColor,
  neutralColorButton,
  neutralColorText,
  spacing as sp,
  strings
} from "../../../constants";
import { ReduxState } from "../../../redux/reducers";
import { Amage, Button, Gap, Seed, TextItem } from "../../atom";
import styles from "./styles";

const BookTile = ({
  title,
  author,
  duration,
  cover,
  onPress,
  navSubscrive,
  isVideoAvailable
}: BookTileProps) => {
  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  const subsPress = () => navSubscrive && navSubscrive();

  const tilePress = () => onPress(title);

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

  return (
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
      <Gap vertical={sp.sm} />
      <View style={styles.detail}>
        <View style={styles.boxTitle}>
          <TextItem type="b.18.nc.90" numberOfLines={1} style={styles.title}>
            {title}
          </TextItem>
          {lockReadingListenViewBook && (
            <Button onPress={subsPress} style={styles.lock}>
              <Lock color={neutralColorText[90]} width={30} />
            </Button>
          )}
        </View>
        <TextItem type="i.14.nc.80" numberOfLines={1}>{`${author}`}</TextItem>
      </View>
      <Gap vertical={sp.sm} />
      <View style={styles.seeds}>
        <Seed label={`${duration} min`} />
        <Gap horizontal={sp.xs} />
        {isVideoAvailable && (
          <Seed
            label={strings.video}
            bg={neutralColorButton[90]}
            textColor={"ncbtn.100"}
          />
        )}
      </View>
    </Button>
  );
};

export default BookTile;
