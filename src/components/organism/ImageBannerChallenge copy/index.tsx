import React from "react";
import { Linking, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Amage, Button, Gap, TextItem } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

interface ImageBannerProps {
  placeholder?: any;
  source?: any;
  data?: any;
  openModal?: any;
  dataUser?: any;
}

const ImageBannerChallenge = ({
  source,
  data,
  openModal,
  dataUser
}: ImageBannerProps) => {
  const move = useNavigation();

  const handleNavigation = () => {
    if (dataUser || data) {
      if (!dataUser.is_subscribed) {
        openModal();
      } else if (data.id_video) {
        move.navigate("RewatchWebinar", { ...data });
      } else if (data?.joinLink) {
        Linking.openURL(data?.joinLink)
          .then((res) => {})
          .catch((err) => {});
      }
    }
  };

  return (
    <>
      <Button
        onPress={() => {
          // handleNavigation();
        }}
      >
        <View style={[styles.container]}>
          <TouchableOpacity>
            <View>
              <Amage style={styles.image} source={source || false} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.containerDesk,
            {
              marginVertical: 10
            }
          ]}
        >
          <TextItem type="b.20.nc.90">
            {data?.tittle || "Belajar Investasi Crypto untuk pemula"}
          </TextItem>

          <Gap vertical={5} />
          <View>
            <TextItem type="r.15.nc.90">
              {data?.descsription || "description "}{" "}
            </TextItem>
          </View>
          <TextItem type="b.15.nc.90">
            Progress {data?.progress.length} of {data?.books?.length}
          </TextItem>
        </View>
      </Button>
    </>
  );
};

export default ImageBannerChallenge;
