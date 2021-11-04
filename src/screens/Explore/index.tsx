import {
  Base,
  DummyFlatList,
  ExploreSearch,
  Gap,
  TextItem,
  TitleTap,
} from "@components";
import { primaryColor, spacing as sp, strings } from "@constants";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { logger } from "../../helpers/helper";
import styles from "./styles";

const HORIZONTAL_GAP = sp.sl * 2;

const Explore = () => {
  const cameraPosition = useSharedValue(-48);
  const [keyword, setKeyword] = useState<string>();

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
        <Gap vertical={sp.sl} />
        <TitleTap title={strings.newRelease} />
      </DummyFlatList>
    </Base>
  );
};

export default Explore;
