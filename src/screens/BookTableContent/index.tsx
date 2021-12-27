import { Base, EmptyPlaceholder, MenuArrow } from "@components";
import { skeleton, strings } from "@constants";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { RootStackParamList } from "src/types";
import { logger, useMounted } from "../../helpers";
import { fetchBookTableOfContent } from "../../services";
import styles from "./styles";

const BookTableContent = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "BookTableContent">>();
  const isMounted = useMounted();

  const [contents, setContents] = useState<BookTableOfContentProps[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getContent();
  }, []);

  const BOOK_ID = route.params?.id;
  const isFromReading = route.params?.isFromReading;
  const readingPayload = route.params?.readingPayload;

  const getContent = async () => {
    if (isFromReading) {
      setContents(readingPayload);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookTableOfContent({
        bookTitle: BOOK_ID,
      });
      if (!isMounted) return;
      if (!isSuccess) return;
      setContents(data);
    } catch (error) {
      logger("BookTableContent, getContent", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerState = {
    visible: true,
    title: strings.tableOfContent,
    onBackPress: () => navigation.goBack(),
  };

  const keyExtractor = ({ id }: BookTableOfContentProps) => `${id}`;

  const ListEmptyComponent = (
    <EmptyPlaceholder
      title={strings.kilasEmpty}
      subtitle={strings.kilasEmptyDesc}
    />
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: BookTableOfContentProps;
    index: number;
  }) => (
    <MenuArrow
      title={item?.title}
      index={index + 1}
      onPress={() =>
        navigation.navigate("Reading", { id: BOOK_ID, page: `${index}` })
      }
    />
  );

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        isLoading={isLoading}
        layout={skeleton.mainTableContent}
        containerStyle={styles.skeleton}
      >
        {!!contents ? (
          <FlatList
            data={contents}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={ListEmptyComponent}
          />
        ) : (
          <EmptyPlaceholder
            title={strings.kilasEmpty}
            subtitle={strings.kilasEmptyDesc}
          />
        )}
      </SkeletonContent>
    </Base>
  );
};

export default BookTableContent;
