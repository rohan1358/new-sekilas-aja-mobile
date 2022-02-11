import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Amage, Gap, TextItem } from "../../atom";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { spacing } from "@constants";

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

        <View style={[styles.containerDesk]}>
          <TextItem type="b.15.nc.90">
            {data?.title || "Belajar Investasi Crypto untuk pemula"}
          </TextItem>

          <Gap vertical={spacing.xs} />

          <TextItem type="i.12.nc.90">
            {moment(data?.releaseDate).format("LL")}
          </TextItem>

          {/* <TextItem type="b.15.nc.90">{data?.releaseDate}</TextItem> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageBannerBlog;
