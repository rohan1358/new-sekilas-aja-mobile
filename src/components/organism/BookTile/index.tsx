import { Lock } from "@assets";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { neutralColor, spacing as sp, strings } from "../../../constants";
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
  isVideoAvailable,
}: BookTileProps) => {
  const {
    editProfile: { profile },
  } = useSelector((state: ReduxState) => state);

  return (
    <Button onPress={() => onPress(title)} style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.background}>
          <View style={styles.innerBackgorund} />
        </View>
        <View>
          <Amage style={styles.image} source={cover} resizeMode="contain" />
        </View>
      </View>
      <Gap vertical={sp.sm} />
      <View style={{ flex: 1 }}>
        <View style={styles.boxTitle}>
          <TextItem type="b.24.nc.90" numberOfLines={1} style={styles.title}>
            {title}
          </TextItem>
          {!profile?.is_subscribed && (
            <Button
              onPress={() => navSubscrive && navSubscrive()}
              style={styles.lock}
            >
              <Lock color={neutralColor[90]} width={30} />
            </Button>
          )}
        </View>
        <TextItem type="r.14.nc.70" numberOfLines={1}>{`${author}`}</TextItem>
      </View>
      <Gap vertical={sp.sm} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Seed label={`${duration} min`} />
        <Gap horizontal={sp.xs} />
        {isVideoAvailable && (
          <Seed
            label={strings.video}
            bg={neutralColor[90]}
            textColor="pc.main"
          />
        )}
      </View>
    </Button>
  );
};

export default BookTile;
