import { ArrowLeft, Download, Heart, HeartBook } from '@assets'
import { Button } from '@components'
import { neutralColor } from '@constants'
import React from 'react'
import {Text, View } from 'react-native'
import styles from './styles'

export default function HeaderBookDetail({navigation}: any) {
    return (
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()}>
                <ArrowLeft color={neutralColor[90]} />
            </Button>
            <View style={styles.boxRight}>
                <Button style={styles.btn}>
                    <Download color={neutralColor[90]} />
                </Button>
                <Button style={[styles.btnHeart, styles.btn]}>
                    <HeartBook color={neutralColor[90]} />
                </Button>
            </View>
        </View>
    )
}
