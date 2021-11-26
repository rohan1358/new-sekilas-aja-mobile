import { ArrowLeft, ShareIcon } from '@assets';
import { Button, TextItem } from '@components';
import { neutralColor, primaryColor } from '@constants';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default function HeaderListening({navigation, onShare}) {
    return (
        <View style={styles.container}>
            <Button style={styles.btn}>
                <ArrowLeft color={neutralColor[90]} />
            </Button>
            <LinearGradient
                colors={[primaryColor.main, 'transparent']}
                 useAngle={ true}
                 angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientLeft}
            />
            <View style={styles.boxTitle}>
                <TextItem style={styles.title}>Bab 3 : Tak Pernah Cukup</TextItem>
            </View>
            <LinearGradient
                colors={[primaryColor.main, 'transparent']}
                 useAngle={ true}
                 angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientRight}
            />
            <Button style={styles.btn}>
                <ShareIcon color={neutralColor[90]} />
            </Button>
        </View>
    )
}
