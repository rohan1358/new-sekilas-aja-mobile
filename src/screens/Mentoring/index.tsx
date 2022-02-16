import {
  Base,
  DummyFlatList,
  Gap,
  ModalSubscribe,
  TextItem,
  ImageBannerWebinar
} from "@components";
import {
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings
} from "@constants";
import { logger } from "@helpers";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { SnackStateProps } from "../../components/atom/Base/types";
import styles from "./styles";
import { store } from "../../redux/store";
import { checkData } from "../../utils";
import { getAllMentoring } from "../../services/mentoring";
import { useDispatch } from "react-redux";
import { handleOpenModalSubscribe } from "@actions";

let mounted = false;

const Home = () => {
  const profileStore = store.getState().editProfile.profile;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);

  const [listMentoring, setListMentoring] = useState(false);

  const setModalAllPlan = (param: any) => {
    // done
    dispatch(handleOpenModalSubscribe());
  };

  useFocusEffect(
    useCallback(() => {
      if (!mounted) {
        fetchListMentoring();
        mounted = true;
      }
      return () => {
        setListMentoring(false);
        setIsRefreshing(false);
        setIsLoading(false);
        mounted = false;
      };
    }, [mounted])
  );

  const fetchListMentoring = () => {
    getAllMentoring()
      .then((res) => {
        setListMentoring(res?.data);
        setIsRefreshing(false);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log('please check your connection')
      });
  };

  const bannerRenderItem = ({ item }: { item: any }) => (
    <View style={styles.newCollectionContainer}>
      <ImageBannerWebinar
        dataUser={profileStore}
        openModal={() => setModalAllPlan(true)}
        data={item}
        placeholder={item.title}
        source={item.photo}
      />
      <Gap horizontal={sp.m} />
    </View>
  );

  const idKeyExtractor = ({
    coverImageLink
  }: {
    coverImageLink: string | number;
  }) => `${Math.random()}`;

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      Promise.all([fetchListMentoring()]);
    } catch (error) {
      logger("onRefresh", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getDate = (param: any) => {
    return new Date(param.toDate());
  };

  const sort = () => {
    if (Array.isArray(listMentoring)) {
      return listMentoring.sort(
        (a: any, b: any) => getDate(b.spesific_date) - getDate(a.spesific_date)
      );
    }
  };

  return (
    <>
      {profileStore && (
        <>
          <Base
            barColor={primaryColor.main}
            snackState={snackState}
            setSnackState={setSnackState}
          >
            <SkeletonContent
              containerStyle={styles.skeleton}
              isLoading={isLoading}
              layout={skeleton.mainHome}
            >
              <View style={styles.headerContainer}>
                <Gap vertical={sp.sm} />
                <View style={styles.headerTitle}>
                  <TextItem type="b.24.nc.90">
                    {strings.groupMentoring}
                  </TextItem>
                </View>
                <Gap vertical={sp.sm} />
              </View>
              <DummyFlatList onRefresh={onRefresh} refreshing={isRefreshing}>
                <Gap vertical={sp.l} />

                <View style={styles.adjuster}>
                  <SkeletonContent
                    layout={skeleton.componentBanner}
                    isLoading={!isFocused}
                    containerStyle={styles.skeleton}
                  >
                    <Gap vertical={sp.s} />

                    {checkData(listMentoring) && (
                      <FlatList
                        contentContainerStyle={
                          styles.newCollectionContentContainerStyle
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={sort() || []}
                        renderItem={bannerRenderItem}
                        keyExtractor={idKeyExtractor}
                        listKey={"bannerlist"}
                      />
                    )}
                  </SkeletonContent>

                  <Gap vertical={sp.m} />

                  <Gap vertical={sp.sm} />
                </View>

                <Gap vertical={sp.xxl} />
              </DummyFlatList>
            </SkeletonContent>
          </Base>
        </>
      )}
    </>
  );
};

export default Home;
