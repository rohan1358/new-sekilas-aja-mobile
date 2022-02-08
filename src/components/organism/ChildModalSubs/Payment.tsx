import React from "react";
import { View, Text, Platform } from "react-native";
import { Button, TextItem } from "../../atom";
import { ArrowLeft } from "@assets";
import styles from "../ModalSubscribe/styles";
import { neutralColor, strings, primaryColor } from "@constants";
import WebView from "react-native-webview";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const Payment = ({
  handlePrev,
  email,
  btnBack,
  handleClose,
  baseUrl
}: OnPayment) => {
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
            <ArrowLeft color={neutralColor[90]} width={30} height={25} />
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
        <Button onPress={() => handleClose()} style={styles.btnBackToHome}>
          <TextItem type="b.24.pc.main">{strings.kembaliKeHome}</TextItem>
        </Button>
      )}
    </View>
  );
};

export default Payment;
