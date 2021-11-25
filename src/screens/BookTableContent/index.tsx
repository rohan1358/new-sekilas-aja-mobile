import { Base, MenuArrow } from "@components";
import { skeleton, strings } from "@constants";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { logger } from "../../helpers/helper";
import { fetchBookContent } from "../../services";
import styles from "./styles";
import { BookContentProps, BookTableContentProps } from "./types";

const BookTableContent = ({ navigation }: BookTableContentProps) => {
  const isMounted = useRef<boolean>(true);

  const [contents, setContents] = useState<BookContentProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getContent = async () => {
    setIsLoading(true);
    try {
      const { data, isSuccess } = await fetchBookContent({
        bookTitle: "Atomic Habits",
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

  const keyExtractor = ({ id }: BookContentProps) => `${id}`;

  const renderItem = ({
    item,
    index,
  }: {
    item: BookContentProps;
    index: number;
  }) => <MenuArrow title={item?.title} index={index + 1} />;

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
