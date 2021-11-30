import React, { forwardRef, PropsWithChildren } from "react";
import { FlatList } from "react-native";
import { DummyFlatListProps } from "./types";

const DummyFlatList = forwardRef<any, PropsWithChildren<DummyFlatListProps>>(
  ({ children, data = [], renderItem = () => null, ...props }, ref) => {
    const keyExtractor = () => `dummyId`;
    const ListHeaderComponent = <>{children}</>;
    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props}
      />
    );
  }
);

export default DummyFlatList;
