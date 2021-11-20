import { Button } from '@components'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ArrowLeft } from '@assets'
import { neutralColor, strings } from '@constants'
import styles from './styles'
import { TextItem } from '../../atom'

export default function HeaderNotification({navigation}:any) {
    return (
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()} style={styles.btnBack}>
                <ArrowLeft color={neutralColor[90]} />
            </Button>
            <TextItem type='b.20.nc.90'>{strings.notification}</TextItem>
        </View>
    )
}
