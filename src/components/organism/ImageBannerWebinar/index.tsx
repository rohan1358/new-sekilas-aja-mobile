import React from "react";
import { Linking, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Amage, Button, Gap, TextItem } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { primaryColor } from "@constants";

const ImageBanner = ({
  source,
  data,
  openModal,
  dataUser
}: ImageBannerProps) => {
  const move = useNavigation();

  const handleNavigation = () => {
    if (!dataUser.is_subscribed) {
      openModal();
    } else if (data?.joinLink) {
      Linking.openURL(data?.joinLink)
        .then((res) => {})
        .catch((err) => {
          console.log("whatsapp tidak terinstall!");
        });
    }
  };

  const newTxtButton = () => {
    if (dataUser.is_subscribed && data?.videoLink) {
      return "Tonton Ulang Webinar";
    } else {
      return "Daftar Webinar";
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity>
          <View>
            <Amage style={styles.image} source={source} />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          // position: "absolute",
          margin: 10
          // width: "80%",
          // height: "80%"
        }}
      >
        {/* <View
              style={{
                height: "90%",
                position: "absolute",
                width: "90%",
                opacity: 0.5,
                backgroundColor: primaryColor.main,
                borderRadius: 10
              }}
            ></View> */}

        <TextItem type="b.20.nc.90">
          {data?.title || "Belajar Investasi Crypto untuk pemula"}
        </TextItem>
        <TextItem type="b.15.nc.70">{data.name}</TextItem>
        <Gap vertical={20} />

        <Button
          onPress={() => {
            handleNavigation();
          }}
          style={styles.btnBar}
        >
          <TextItem type="b.15.pc.main">{newTxtButton()}</TextItem>
        </Button>
      </View>
    </View>
  );
};

export default ImageBanner;
