import { Button, TextItem } from '@components';
import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

export default function Card({item}: any) {

    return (
      <>
        {
          item?.status ?
            (
              <Button style={styles.container_active}>
                {
                  item?.image &&
                  <View style={styles.boxImage}>
                    <Image
                      style={styles.image}
                      source={item?.image}
                    />
                  </View>
                }
                <TextItem style={styles.title_active}>{item?.title}</TextItem>
                <TextItem style={styles.text_active}>{item?.text}</TextItem>
                <TextItem style={styles.time_active}>{item?.time}</TextItem>
              </Button>
            )
            :
            (
              <Button style={styles.container}>
                {
                  item?.image &&
                  <View style={[styles.boxImage, styles.boxImageAnActive]}>
                    <Image
                      style={styles.image}
                      source={item?.image}
                    />
                  </View>
                }
                <TextItem style={styles.title}>{item?.title}</TextItem>
                <TextItem style={styles.text}>{item?.text}</TextItem>
                <TextItem style={styles.time}>{item?.time}</TextItem>
              </Button>
            )
        }
      </>
    )
}
