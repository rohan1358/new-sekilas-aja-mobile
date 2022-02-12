import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../services/blog/client";
import { Button, Gap, TextItem } from "@atom";
import styles from "./styles";
import { neutralColor, spacing } from "@constants";
import ImageBannerBlog from "../../components/organism/ImageBannerBlog";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "@assets";

const Blog = () => {
  const [dataBlog, setDataBlog] = useState(false);

  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
          title,
          slug,
          body,
          mainImage {
              asset -> {
                  _id,
                  url
              },
              alt
          }, 
          releaseDate, 
          "name": author->name
      }`
      )
      .then((data) => {
        if (Array.isArray(data)) {
          const result = data.map((nd) => {
            const { name, releaseDate, title, mainImage } = nd;
            return { name, releaseDate, title, mainImage };
          });
          setDataBlog(result);
        }
        // setPosts(data);
        // setIsLoading(false);
      })
      .catch(console.error);
  }, []);
  const { width } = Dimensions.get("screen");

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBannerBlog
        data={item}
        placeholder={item.mainImage.asset.url}
        source={item.mainImage.asset.url}
      />
      <Gap horizontal={spacing.m} />
    </View>
  );

  const idKeyExtractor = ({
    coverImageLink
  }: {
    coverImageLink: string | number;
  }) => `${Math.random()}`;

  const newData = (type: any) => {
    if (dataBlog) {
      if (type === "banner") {
        let result = dataBlog
          ?.sort(
            (a: any, b: any) =>
              new Date(b.releaseDate) - new Date(a.releaseDate)
          )
          .slice(0, 4);

        return result;
      } else {
        return dataBlog
          ?.sort(
            (a: any, b: any) =>
              new Date(b.releaseDate) - new Date(a.releaseDate)
          )
          .slice(4, dataBlog.length);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            type="b.24.nc.90"
          >
            {"Artikel Pembelajaran"}
          </TextItem>
          {/* <Button style={styles.icon}>
            <Search stroke={neutralColor[90]} />
          </Button> */}
        </View>
        <Gap vertical={spacing.sm} />
      </View>
      <Gap vertical={spacing.sm} />

      <ScrollView>
        {Array.isArray(dataBlog) && (
          <FlatList
            contentContainerStyle={styles.newCollectionContentContainerStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newData("banner") || []}
            renderItem={bannerRenderItem}
            keyExtractor={idKeyExtractor}
            listKey={"bannerlist"}
          />
        )}

        {Array.isArray(dataBlog) &&
          newData("list").map((data) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("ReadBlog", data.title.replaceAll(" ", "-"));
                }}
              >
                <View style={styles.containerList}>
                  <View style={styles.containerImageList}>
                    <Image
                      style={styles.imageList}
                      source={{ uri: data.mainImage.asset.url }}
                    />
                  </View>
                  <View style={styles.containerDesk}>
                    <TextItem type="b.15.nc.90">{data.title}</TextItem>
                    <TextItem
                      type="i.12.nc.90"
                      style={{ position: "absolute", bottom: 0 }}
                    >
                      {moment(data.releaseDate).format("LL")}
                    </TextItem>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Blog;
