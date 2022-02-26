import { Base, BookTile, EmptyPlaceholder, Gap } from "@components";
import {
  dangerColor,
  primaryColor,
  skeleton,
  spacing as sp,
  strings,
  successColor,
  systemColor
} from "@constants";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../redux/reducers";
import { openBottomTab, closeBottomTab } from "@actions";
import { fetchShorts, fetchMyShorts } from "../../services";
import { checkData, getRandomInt } from "../../utils";
import styles from "./styles";
import { SpecialBookListProps } from "./types";
import ShortsTile from "./../../components/molecule/ShortsTile/index";
import StoryShort from "./../../components/organism/StoryShort/index";

const MyShortsList = ({ navigation, route }: SpecialBookListProps) => {
  const isMounted = useRef<boolean>();
  const storyRef = useRef<any>();

  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentStory, setCurrentStory] = useState<null | string>();
  const [shorts, setShorts] = useState<null | any[]>();
  const [shortsColor, setShortsColor] = useState<string>();

  const headerState = {
    visible: true,
    title: ["Shorts", " Ku"],
    onBackPress: () => navigation.goBack()
  };

  useEffect(() => {
    isMounted.current = true;

    // getBooks();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getShorts = async () => {
    try {
      const { data, isSuccess } = await fetchShorts();
      if (!isSuccess) return;
      // console.log("data shorts", data);
    } catch (error) {
      // console.log("Home, getShorts", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setIsLoading(true);

      fetchMyShorts(profile.id)
        .then((res: any) => {
          setShorts(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, [])
  );

  const storyColorIndex = getRandomInt(0, 3);

  const storyColors = [
    primaryColor.pressed,
    systemColor.hover,
    successColor.hover,
    dangerColor.hover
  ];

  const storyPress = (title: string) => {
    setShortsColor(storyColors[storyColorIndex]);

    setCurrentStory(title);
    dispatch(closeBottomTab(true));
    storyRef.current?.open();
  };

  const closeStory = () => {
    setShortsColor("");

    setCurrentStory("");
    dispatch(openBottomTab());
    storyRef.current?.close();
  };

  const onLastStoryPress = (id: string) =>
    navigation.navigate("BookDetail", { id });

  return (
    <Base
      headerState={headerState}
      barColor={checkData(shortsColor) ? shortsColor : primaryColor.main}
    >
      <SkeletonContent
        containerStyle={styles.skeleton}
        isLoading={isLoading}
        layout={skeleton.mainCategory}
      >
        {/* my shorts area */}
        {checkData(shorts) && shorts?.length > 0 ? (
          <>
            <Gap vertical={sp.m} />
            <FlatList
              data={shorts}
              renderItem={({ item, index }) => (
                <ShortsTile
                  index={index}
                  onPress={storyPress}
                  title={item?.book_title}
                  cover={item?.book_cover}
                />
              )}
              keyExtractor={({ id }) => `${id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Gap vertical={sp.sl} />
          </>
        ) : (
          <>
            <EmptyPlaceholder title={"tidak ada short favorit"} subtitle={""} />
          </>
        )}
      </SkeletonContent>

      <StoryShort
        ref={storyRef}
        onEnd={() => {
          closeStory();
        }}
        storyStatus={currentStory}
        storyData={shorts?.find((item) => item?.book_title === currentStory)}
        color={shortsColor}
        onLastStoryPress={onLastStoryPress}
      />
    </Base>
  );
};

export default MyShortsList;
