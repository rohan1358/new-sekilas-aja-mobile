import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Amage, Button, Gap, Seed, TextItem } from "../../atom";
import { neutralColor, spacing as sp, strings } from "../../../constants";
import styles from "./styles";
import { ReduxState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { Lock } from "@assets";

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

  const [lock, setLock] = useState(false);

  useEffect(() => {
    const handleSub = () => {
      const subsc = profile?.is_subscribed;
      if (!subsc) {
        setLock(true);
      }
    };

    handleSub();
  }, []);

  return (
    <Button onPress={() => onPress && onPress()} style={styles.container}>
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
          {lock && (
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
