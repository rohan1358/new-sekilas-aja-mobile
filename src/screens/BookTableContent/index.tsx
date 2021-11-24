import { Base, MenuArrow } from "@components";
import { strings } from "@constants";
import React from "react";
import { BookTableContentProps } from "./types";

const BookTableContent = ({ navigation }: BookTableContentProps) => {
  return (
    <Base
      headerState={{
        visible: true,
        title: strings.tableOfContent,
        onBackPress: () => navigation.goBack(),
      }}
    >
      <MenuArrow title={"Tak Seorang Pun Gila"} index={1} />
    </Base>
  );
};

export default BookTableContent;
