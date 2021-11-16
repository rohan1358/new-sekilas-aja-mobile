import { Button, TextItem } from '@components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

export default function CardRiwayat({item}: any) {

    return (
      <>
        {
          item?.status ?
            (
              <Button style={styles.container_active}>
                  <TextItem style={styles.title_active}>{item?.title}</TextItem>
                  <TextItem style={styles.text_active}>{item?.text}</TextItem>
                  <TextItem style={styles.time_active}>{item?.time}</TextItem>
              </Button>
            )
            :
            (
              <Button style={styles.container}>
                  <TextItem style={styles.title}>{item?.title}</TextItem>
                  <TextItem style={styles.text}>{item?.text}</TextItem>
                  <TextItem style={styles.time}>{item?.time}</TextItem>
              </Button>
            )
        }
      </>
    )
}
