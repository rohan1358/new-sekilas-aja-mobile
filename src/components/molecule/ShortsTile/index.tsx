import { Lock } from "@assets";
import { AdaptiveText, Amage, Button, Gap, TextItem } from "@atom";
import { neutralColor, primaryColor, spacer } from "@constants";
import { ReduxState } from "@rux";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { adjust } from "../../../utils";
import styles from "./styles";

interface ShortsTileProps {
  index?: number;
  onPress(arg0: string): void;
  title: string;
  cover: string;
}

const ShortsTile = ({ index, onPress, title, cover }: ShortsTileProps) => {
  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);

  let { is_subscribed, owned_books } = profile;

  let isOpen = owned_books.includes(title) || is_subscribed;

  return (
    <>
      {!isOpen && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            alignSelf: "center",
            width: "90%"
          }}
        >
          <Lock
            color={neutralColor[90]}
            height={adjust(50)}
            width={adjust(50)}
          />
        </View>
      )}
      <View style={[styles.wrapper, { opacity: isOpen ? 1 : 0.5 }]}>
        {index === 0 && <Gap horizontal={spacer.m} />}
        <Button
          style={styles.container}
          onPress={() => isOpen && onPress(title)}
        >
          <View style={styles.circle} />
          <View style={styles.smallCircle}>
            <AdaptiveText
              type="textBase/black"
              style={styles.title}
              numberOfLines={2}
            >
              {title}
            </AdaptiveText>
            <Gap vertical={spacer.xs} />
            <Amage style={styles.image} source={cover} />
          </View>
        </Button>

        <Gap horizontal={spacer.m} />
      </View>
    </>
  );
};

export default ShortsTile;
