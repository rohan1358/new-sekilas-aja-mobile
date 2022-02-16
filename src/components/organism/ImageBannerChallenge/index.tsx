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

interface paramsInterface {
  type: string;
}

const ImageBannerChallenge = ({
  source,
  data,
  openModal,
  dataUser
}: ImageBannerProps) => {
  const move = useNavigation();

  return (
    <>
      <Button
        onPress={() => {
          move.navigate("ListBookChallenge", {
            title: data?.tittle,
            book: data?.books,
            challenge: data.id
          });
        }}
      >
        <Gap vertical={10} />

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

          <Gap vertical={20} />

          {data?.progress.length == data?.books?.length ? (<TextItem type="b.15.nc.90">✔️ Completed</TextItem>) : (
            <TextItem type="b.15.nc.90">Progress {data?.progress.length} of {data?.books?.length}
            </TextItem>)}

          <Gap vertical={10} />
        </View>
      </Button>
    </>
  );
};

export default ImageBannerChallenge;
