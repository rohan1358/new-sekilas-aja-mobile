import { AboutHeader, TextItem } from '../../components'
import React from 'react'
import { View } from 'react-native';
import styles from './styles'

export default function About({route, navigation}: AboutProps) {
    return (
        <View>
            <AboutHeader
                title={route.params.title}
                navigation={navigation}
            />
            <View style={styles.content}>
                <TextItem style={styles.title}>Lorem Ipsum</TextItem>
                <TextItem style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat at dictum ut ullamcorper quisque porttitor. Tristique faucibus quam sit at massa. Sed hendrerit aliquet id senectus. Nunc tempor, dignissim nisl lectus enim mauris nunc condimentum. Facilisis elit elementum posuere posuere. Placerat risus venenatis eget gravida adipiscing malesuada. Sollicitudin cum tortor ac non quisque pellentesque sit.</TextItem>
                <TextItem style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat at dictum ut ullamcorper quisque porttitor. Tristique faucibus quam sit at massa. Sed hendrerit aliquet id senectus. Nunc tempor, dignissim nisl lectus enim mauris nunc condimentum. Facilisis elit elementum posuere posuere. Placerat risus venenatis eget gravida adipiscing malesuada. Sollicitudin cum tortor ac non quisque pellentesque sit.</TextItem>
            </View>
        </View>
    )
}
