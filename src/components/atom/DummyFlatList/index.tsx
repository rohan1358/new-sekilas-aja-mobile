import React, { PropsWithChildren } from "react";
import { FlatList } from "react-native";
import { DummyFlatListProps } from "./types";

const DummyFlatList = ({
  children,
  data = [],
  renderItem = () => null,
  ...props
}: PropsWithChildren<DummyFlatListProps>) => {
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
