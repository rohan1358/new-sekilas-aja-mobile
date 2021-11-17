import React, { PropsWithChildren } from "react";
import { FlatList } from "react-native";
import { DummyFlatListProps } from "./types";

const DummyFlatList = ({
  children,
  ...props
}: PropsWithChildren<DummyFlatListProps>) => {
  const data: any = [];
  const renderItem = () => null;
  const keyExtractor = () => `dummyId`;
  const ListHeaderComponent = <>{children}</>;
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
};

export default DummyFlatList;
