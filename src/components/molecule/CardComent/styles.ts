import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },

    head:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },

    boxImageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: neutralColor[30],
        marginRight: 10
    },

    imageAvatar: {
        width: '100%',
        height:'100%'
    },

    boxTitle: {
        alignItems:'flex-start'
    },

    boxText: {
        flexDirection:'row'
    },

    titleName: {
        fontSize: 16,
        fontWeight: '500',
        color: neutralColor[90]
    },

    time: {
        marginLeft: 10,
        fontSize: 14,
        color: neutralColor[60]
    },

    textContent: {
        fontSize: 16,
    }

})

export default styles;