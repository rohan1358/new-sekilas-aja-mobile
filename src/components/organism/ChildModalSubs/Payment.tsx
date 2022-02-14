import React, { useState } from "react";
import { View, Text, Platform, ActivityIndicator } from "react-native";
import { Button, TextItem } from "../../atom";
import { ArrowLeft } from "@assets";
import styles from "../ModalSubscribe/styles";
import { neutralColor, strings, primaryColor } from "@constants";
import WebView from "react-native-webview";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@rux";
import { fetchProfile } from "@services";
import { setProfileRedux } from "@actions";
import { adjust } from "../../../utils";

const Payment = ({
  handlePrev,
  email,
  btnBack,
  handleClose,
  baseUrl
}: OnPayment) => {
  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  // profile.id

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const refreshData = () => {
    setLoading(true);
    fetchProfile(email, profile.id).then((profileData) => {
      dispatch(setProfileRedux(profileData.data));
      handleClose();
      setLoading(false);
    });
  };
  return (
    <View style={styles.content}>
      {Platform.OS === "ios" ? (
        <SafeAreaView
          edges={["top"]}
          style={{
            backgroundColor: primaryColor.main
          }}
        >
          <View style={styles.boxBack}>
            <Button onPress={() => handlePrev(100)} style={styles.btn}>
              <ArrowLeft color={neutralColor[90]} width={30} height={25} />
            </Button>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.boxBack}>
          <Button onPress={() => handlePrev(100)} style={styles.btn}>
            <ArrowLeft
              color={neutralColor[90]}
              width={adjust(30)}
              height={adjust(25)}
            />
          </Button>
        </View>
      )}
      <View style={styles.webView}>
        <WebView
          source={{
            // uri: `http://192.168.43.140:3000${baseUrl}${email}`
            uri: `https://sekilasaja.com${baseUrl}${email}`
          }}
        />
      </View>
      {btnBack && (
        <Button onPress={() => refreshData()} style={styles.btnBackToHome}>
          {loading ? (
            <ActivityIndicator size="large" color={primaryColor.main} />
          ) : (
            <TextItem type="b.24.pc.main">{strings.kembaliKeHome}</TextItem>
          )}
        </Button>
      )}
    </View>
  );
};

export default Payment;
