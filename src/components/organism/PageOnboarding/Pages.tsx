import { Hero1 } from '@assets';
import { Button, TextItem } from '@components';
import { strings } from '@constants';
import React from 'react'
import { View, Image } from 'react-native';
import styles from '../../../screens/Onboarding/styles'

export default function PagesOnboarding({
    image,
    title,
    subTitle
}: any) {
    return (
        <View style={styles.pageContainer} >
            <View style={styles.boxImage}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.boxtitle}>
                <TextItem type="b.28.nc.90" style={styles.title}>{title}</TextItem>
                <TextItem type="r.17.nc.70" style={styles.sub_title}>{subTitle}</TextItem>
            </View>
        </View>
    )
}