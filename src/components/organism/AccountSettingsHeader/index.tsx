import { BgHeader1, Edit, Exit, UserPlaceholder } from "@assets";
import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Button, TextItem, Amage } from "../../../components";

export default function AccountSettingsHeader({
  uri,
  navigation,
  name,
  data
}: any) {
  const { is_subscribed } = data || {};
  return (
    <View style={styles.container}>
      <View style={styles.sectionMenu}>
        <Button onPress={() => navigation.goBack()}>
          <Exit />
        </Button>
        <TextItem type="b.20.nc.90.c" style={styles.textMenu}>
          Menu
        </TextItem>
      </View>
      <View style={styles.sectionProfile}>
        <View style={styles.profileContainer}>
          {!!uri ? (
            <Amage source={uri} />
          ) : (
            <Amage placeholder={UserPlaceholder} />
          )}
        </View>
        <View style={styles.profileTitle}>
          {is_subscribed && (
            <View style={styles.level}>
              <TextItem type="r.10" style={styles.textLevel}>
                Akun Premium
              </TextItem>
            </View>
          )}

          <TextItem type="b.24.nc.90.c">{name}</TextItem>
        </View>
        <Button onPress={() => navigation.navigate("Profile")}>
          <Edit />
        </Button>
      </View>
      <Image source={BgHeader1} style={styles.bgHeader} />
    </View>
  );
}
