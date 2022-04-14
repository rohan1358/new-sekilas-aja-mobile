import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import ImageBannerChallenge from "../../components/organism/ImageBannerChallenge";
import { Button, Gap, TextItem } from "@atom";
import { neutralColor, spacing } from "@constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "@assets";

import styles from "./styles";
import { getChallenge } from "@services";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@rux";
import { setChallenge, setDoneReadChallenge } from "@actions";

const Challenge = () => {
  const { navigate, goBack } = useNavigation();

  const {
    sessionReducer: { email },
    editProfile: { profile },
    challengeRedux
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getChallenge(profile.id).then((res: any) => {
        dispatch(setChallenge(res.data));
      });
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: neutralColor[10] }}>
      <View style={styles.headerContainer}>
        <Gap vertical={spacing.sm} />

        <View style={styles.headerTitle}>
          <Button onPress={() => goBack()}>
            <ArrowLeft color={neutralColor[90]} />
          </Button>
          <TextItem
            style={{
              marginLeft: 5
            }}
            type="b.24.ncb.90"
          >
            {"Challenge"}
          </TextItem>
          {/* <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button> */}
        </View>
        <Gap vertical={spacing.sm} />
      </View>
      <Gap vertical={5} />

      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array.isArray(challengeRedux.challenge) &&
            challengeRedux.challenge.map((data) => {
              return (
                <>
                  <ImageBannerChallenge data={data} source={data.cover} />
                  <Gap vertical={10} />
                </>
              );
            })}
        </ScrollView>
        {/* <ImageBannerChallenge /> */}
      </View>
    </View>
  );
};

export default Challenge;
