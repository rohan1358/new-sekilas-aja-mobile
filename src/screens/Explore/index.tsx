import {
  Base,
  Chips,
  DummyFlatList,
  ExploreSearch,
  Gap,
  TextItem,
  TitleTap,
} from "@components";
import { primaryColor, spacing as sp, strings } from "@constants";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { logger } from "../../helpers/helper";
import { dummyChips } from "./dummy";
import styles from "./styles";

const boundary =
  dummyChips.length % 2 === 0
    ? dummyChips.length / 2
    : Math.ceil(dummyChips.length / 2);

const topChips = dummyChips.slice(0, boundary);
const bottomChips = dummyChips.slice(boundary, dummyChips.length + 1);

const HORIZONTAL_GAP = sp.sl * 2;

const Explore = () => {
  const cameraPosition = useSharedValue(-48);

  const [keyword, setKeyword] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const inputHandle = () => {
    if (!!keyword && keyword?.length > 2) {
      cameraPosition.value = withTiming(0);
    } else {
      cameraPosition.value = withTiming(-48);
    }
  };

  useEffect(() => {
    inputHandle();
  }, [keyword]);

  return (
    <Base barColor={primaryColor.main}>
      <View style={styles.container}>
        <Gap vertical={sp.m} />
        <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
        <Gap vertical={sp.sm} />
        <ExploreSearch
          cameraPress={() => logger("camera")}
          closePress={() => logger("close")}
          onChangeText={setKeyword}
          position={cameraPosition}
          keyword={keyword}
        />
        <Gap vertical={sp.m} />
      </View>
      <DummyFlatList>
        <Gap vertical={sp.sl} />
        <Gap horizontal={HORIZONTAL_GAP}>
          <TextItem type="b.24.nc.90">{strings.bookCategory}</TextItem>
        </Gap>
        <Gap vertical={sp.sm} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: "row" }}>
              {topChips.map((item, index) => (
                <View key={item.id} style={{ flexDirection: "row" }}>
                  {index == 0 && <Gap horizontal={sp.sl} />}
                  <Chips
                    label={item.label}
                    id={item.id}
                    Icon={item.Icon}
                    isSelected={
                      selectedCategories.findIndex(
                        (value) => value === item.id
                      ) !== -1
                    }
                    onPress={(id) =>
                      setSelectedCategories((current) => {
                        const index = current?.findIndex((item) => item === id);
                        if (index === -1) {
                          return [...current, id];
                        }
                        return current?.filter((item) => item !== id);
                      })
                    }
                  />
                  <Gap horizontal={index === boundary - 1 ? sp.sl : sp.xs} />
                </View>
              ))}
            </View>
            <Gap vertical={sp.sm} />
            <View style={{ flexDirection: "row" }}>
              {bottomChips.map((item, index) => (
                <View key={item.id} style={{ flexDirection: "row" }}>
                  {index == 0 && <Gap horizontal={sp.sl} />}
                  <Chips
                    label={item.label}
                    id={item.id}
                    Icon={item.Icon}
                    isSelected={
                      selectedCategories.findIndex(
                        (value) => value === item.id
                      ) !== -1
                    }
                    onPress={(id) =>
                      setSelectedCategories((current) => {
                        const index = current?.findIndex((item) => item === id);
                        if (index === -1) {
                          return [...current, id];
                        }
                        return current?.filter((item) => item !== id);
                      })
                    }
                  />
                  <Gap horizontal={index === boundary - 1 ? sp.sl : sp.xs} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <Gap vertical={sp.sl} />
        <TitleTap title={strings.newRelease} />
        <TitleTap title={strings.trendingBook} />
        <TitleTap title={strings.recommendedBook} />
      </DummyFlatList>
    </Base>
  );
};

export default Explore;
