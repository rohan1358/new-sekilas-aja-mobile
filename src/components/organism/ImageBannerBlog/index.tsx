import React from "react";
import { Linking, View, TouchableOpacity } from "react-native";
import { Amage, Button, Gap, TextItem } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { neutralColor, primaryColor } from "@constants";
import { Calendar } from "@assets";
import moment from "moment";

const ImageBannerBlog = ({
  source,
  data,
  openModal,
  dataUser
}: ImageBannerProps) => {
  const { navigate } = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigate("ReadBlog", data?.title.replaceAll(" ", "-"));
        }}
      >
        <View style={[styles.container]}>
          <View>
            <Amage style={styles.image} source={source} />
          </View>
        </View>

        <View
          style={[
            styles.containerDesk,
            {
              marginHorizontal: 10
              // height: "100%"
            }
          ]}
        >
          <TextItem type="b.15.nc.90">
            {data?.title || "Belajar Investasi Crypto untuk pemula"}
          </TextItem>
          <TextItem type="r.15.nc.90">
            {moment(data?.releaseDate).format("LL")}
          </TextItem>

          {/* <TextItem type="b.15.nc.90">{data?.releaseDate}</TextItem> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageBannerBlog;
