import { Base, DummyFlatList, HeaderNotification } from '../../components';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import {
  pages,
  primaryColor,
  skeleton,
  snackState as ss,
  spacing as sp,
  strings,
} from "@constants";
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default function Notification({navigation}: any) {

  const [snackState, setSnackState] = useState<SnackStateProps>(ss.closeState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
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
          <DummyFlatList>
            <HeaderNotification
              navigation={navigation}
            />
          </DummyFlatList>
        </SkeletonContent>
      </Base>
    )
}
