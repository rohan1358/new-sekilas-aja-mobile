import { Camera, CloseX, Search } from "@assets";
import {
  Base,
  Button,
  DummyFlatList,
  Gap,
  TextField,
  TextItem,
} from "@components";
import { neutralColor, primaryColor, spacing as sp, strings } from "@constants";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { logger } from "../../helpers/helper";

const Explore = () => {
  const cameraPosition = useSharedValue(-48);
  const [keyword, setKeyword] = useState<string>();

  const cameraStyle = useAnimatedStyle(() => ({
    left: cameraPosition.value,
  }));

  const closeStyle = useAnimatedStyle(() => {
    const opacity =
      !!keyword && keyword.length > 2 ? 1 : withDelay(400, withTiming(0));
    return { opacity };
  });

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
      <DummyFlatList>
        <View
          style={{
            backgroundColor: primaryColor.main,
            paddingHorizontal: sp.sl,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          <Gap vertical={sp.m} />
          <TextItem type="b.24.nc.90">{strings.findFavBook}</TextItem>
          <Gap vertical={sp.sm} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: neutralColor[10],
                width: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Search stroke={neutralColor[90]} />
            </View>
            <TextField
              placeholder="Cari buku favoritmu di sini.."
              containerStyle={{ flex: 1 }}
              noBottomGap
              innerContainerStyle={{
                borderWidth: 0,
                backgroundColor: neutralColor[10],
                borderRadius: 0,
              }}
              inputStyle={{ paddingLeft: 0 }}
              onChangeText={setKeyword}
            />
            <View style={{ flexDirection: "row", width: 48 }}>
              <Animated.View style={closeStyle}>
                <Button
                  onPress={() => logger("red")}
                  style={{
                    backgroundColor: neutralColor[10],
                    width: 48,
                    height: 48,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloseX stroke={neutralColor[100]} />
                </Button>
              </Animated.View>
              <Animated.View style={cameraStyle}>
                <Button
                  onPress={() => logger("primary")}
                  style={{
                    backgroundColor: neutralColor[90],
                    width: 48,
                    height: 48,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Camera stroke={primaryColor.main} />
                </Button>
              </Animated.View>
            </View>
          </View>
          <Gap vertical={sp.m} />
        </View>
      </DummyFlatList>
    </Base>
  );
};

export default Explore;
