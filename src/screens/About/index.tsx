import { AboutHeader, Base, TextItem } from "../../components";
import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { primaryColor, snackState as ss } from "@constants";

export default function About({ route, navigation }: AboutProps) {
  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  return (
    <Base
      barColor={primaryColor.main}
      snackState={snackState}
      setSnackState={setSnackState}
    >
      <AboutHeader title={route.params.title} navigation={navigation} />
      <View style={styles.content}>
        <TextItem
          style={[
            styles.title,
            {
              color: neutralColor[90]
            }
          ]}
        >
          Lorem Ipsum
        </TextItem>
        <TextItem style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          volutpat at dictum ut ullamcorper quisque porttitor. Tristique
          faucibus quam sit at massa. Sed hendrerit aliquet id senectus. Nunc
          tempor, dignissim nisl lectus enim mauris nunc condimentum. Facilisis
          elit elementum posuere posuere. Placerat risus venenatis eget gravida
          adipiscing malesuada. Sollicitudin cum tortor ac non quisque
          pellentesque sit.
        </TextItem>
        <TextItem style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          volutpat at dictum ut ullamcorper quisque porttitor. Tristique
          faucibus quam sit at massa. Sed hendrerit aliquet id senectus. Nunc
          tempor, dignissim nisl lectus enim mauris nunc condimentum. Facilisis
          elit elementum posuere posuere. Placerat risus venenatis eget gravida
          adipiscing malesuada. Sollicitudin cum tortor ac non quisque
          pellentesque sit.
        </TextItem>
      </View>
    </Base>
  );
}
