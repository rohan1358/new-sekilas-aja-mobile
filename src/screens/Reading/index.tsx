import { Base, ReadingHeader } from "@components";
import React from "react";
import { HeaderStateProps } from "../../components/atom/Base/types";
import { logger } from "../../helpers/helper";
import { ReadingProps } from "./types";

const Reading = ({ navigation }: ReadingProps) => {
  const customComp = () => (
    <ReadingHeader
      title={"Bab 3: Tak Pernah Cukup Untuk Hidup Mandiri"}
      backPress={() => navigation.goBack()}
      dotPress={() => logger("Reading, dotPress")}
    />
  );

  const headerState: HeaderStateProps = {
    visible: true,
    type: "custom",
    customComp,
  };
  return <Base headerState={headerState}></Base>;
};

export default Reading;
