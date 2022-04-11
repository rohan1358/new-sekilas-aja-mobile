import { Button, TextItem, Amage } from "../../atom";
import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { ArrowLeft, BgHeader1, UserPlaceholder } from "@assets";
import { neutralColor, strings } from "@constants";

export default function ProfileHeader({ navigation, uri, onPress }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionMenu}>
        <Button onPress={() => navigation.goBack()}>
          <ArrowLeft color={neutralColor[90]} />
        </Button>
        <TextItem type="b.20.ncb.90.c" style={styles.textMenu}>
          {strings.edit_profile}
        </TextItem>
      </View>
      <Button onPress={() => onPress()} style={styles.sectionProfile}>
        <View style={styles.profileContainer}>
          {!!uri ? (
            <Amage source={uri} />
          ) : (
            <Amage placeholder={UserPlaceholder} />
          )}
        </View>
        <TextItem type="b.24.ncb.90.c">
          {/* string edit profile */}
          Edit Profile
        </TextItem>
      </Button>
      <Image source={BgHeader1} style={styles.bgHeader} />
    </View>
  );
}
