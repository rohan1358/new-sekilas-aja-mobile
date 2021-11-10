import { Button } from '../../../components'
import React from 'react'
import { Text, View } from 'react-native'
import { ArrowLeft } from '@assets';
import styles from './styles'
import { TextItem } from '../../atom';
import { neutralColor } from '@constants';

export default function AboutHeader({title, navigation}: AboutHeaderProps) {
    return (
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()} style={styles.btnBack}>
                <ArrowLeft color={neutralColor[90]} />
            </Button>
            <TextItem style={styles.title}>{title}</TextItem>
        </View>
    )
}
