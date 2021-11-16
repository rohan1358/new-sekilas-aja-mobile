import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: neutralColor[30],
    },
    container_active: {
        paddingHorizontal: 25,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: neutralColor[30],
        backgroundColor:'#FEFBEA'
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: neutralColor[60]
    },
    title_active: {
        fontSize: 20,
        fontWeight: '700',
        color: neutralColor[90]
    },

    text: {
        fontSize: 16,
        color: neutralColor[50],
        marginVertical: 8
    },
    text_active: {
        fontSize: 16,
        color: neutralColor[80],
        marginVertical: 8
    },

    time: {
        fontSize: 12,
        fontWeight: '500',
        color: neutralColor[60]
    },
    time_active: {
        fontSize: 12,
        fontWeight: '500',
        color: '#CB3168'
    },
})

export default styles;