import { Base, MenuArrow } from "@components";
import { skeleton, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { logger } from "../../helpers/helper";
import { fetchBookTableOfContent } from "../../services";
import styles from "./styles";
import { BookTableOfContentProps, BookTableContentProps } from "./types";

const BookTableContent = ({ navigation, route }: BookTableContentProps) => {
  const BOOK_ID = route.params?.id;
  const isMounted = useRef<boolean>(true);

  const [contents, setContents] = useState<BookTableOfContentProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getContent = async () => {
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookTableOfContent({
        bookTitle: BOOK_ID,
      });
      if (!isMounted.current) {
        return;
      }
      if (!isSuccess) {
        return;
      }
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

  useEffect(() => {
    isMounted.current = true;

    getContent();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Base headerState={headerState}>
      <SkeletonContent
        isLoading={isLoading}
        layout={skeleton.mainTableContent}
        containerStyle={styles.skeleton}
      >
        <FlatList
          data={contents}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SkeletonContent>
    </Base>
  );
};

export default BookTableContent;
