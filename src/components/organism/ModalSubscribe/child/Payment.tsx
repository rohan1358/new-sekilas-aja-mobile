import React from "react";
import { View, Text } from "react-native";
import { Button, TextItem } from "../../../atom";
import { ArrowLeft } from "@assets";
import styles from "../styles";
import { neutralColor, strings } from "@constants";
import paketList from "../dummy";
import WebView from "react-native-webview";

const Payment = ({
  handlePrev,
  email,
  btnBack,
  handleClose,
  baseUrl
}: OnPayment) => {
  return (
    <View style={styles.content}>
      <View style={styles.boxBack}>
        <Button onPress={() => handlePrev(100)} style={styles.btn}>
          <ArrowLeft color={neutralColor[90]} width={30} height={25} />
        </Button>
      </View>
      <View style={styles.webView}>
        <WebView
          source={{
            uri: `https://sekilasaja.com${baseUrl}${email}`
          }}
        />
      </View>
      {btnBack && (
        <Button onPress={() => handleClose()} style={styles.btnBackToHome}>
          <TextItem type="b.24.pc.main">{strings.kembaliKeHome}</TextItem>
        </Button>
      )}
    </View>
  );
};

export default Payment;
