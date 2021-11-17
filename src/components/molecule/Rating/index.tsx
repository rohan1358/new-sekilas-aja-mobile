import { StarActive } from '@assets'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styles from './styles'

export default function Rating({rating}: any) {
    return (
        <View style={styles.container}>
            {
                Array(5).map(() => (
                    <StarActive style={styles.star} />
                ))
            }
        </View>
    )
}
