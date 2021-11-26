import { ArrowLeft, ShareIcon } from '@assets';
import { Button, TextItem } from '@components';
import { neutralColor, primaryColor } from '@constants';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextTicker from 'react-native-text-ticker';
import styles from './styles';

export default function HeaderListening({navigation, onShare}: any) {
    return (
        <View style={styles.container}>
            <Button onPress={()=> navigation.goBack()} style={styles.btn}>
                <ArrowLeft color={neutralColor[90]} />
            </Button>
            <LinearGradient
                colors={[primaryColor.main, 'rgba(251, 207, 50, 0.5)', 'transparent']}
                useAngle={ true}
                angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientLeft}
            />
            <View style={styles.boxTitle}>
                 <TextTicker
                    duration={6000}
                    loop
                    bounce
                    repeatSpacer={20}
                    marqueeDelay={1}
                >
                    <TextItem style={styles.title}>Bab 3 : Tak Pernah Cukup</TextItem>
                </TextTicker>
            </View>
            <LinearGradient
                colors={['transparent', 'rgba(251, 207, 50, 0.5)', primaryColor.main]}
                useAngle={ true}
                angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.gradientRight}
            />
            <Button onPress={()=> onShare && onShare()} style={styles.btn}>
                <ShareIcon color={neutralColor[90]} />
            </Button>
        </View>
    )
}
