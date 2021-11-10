import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
    },

    btnBack: {
        padding: 10,
        marginLeft: 10
    },

    title: {
        fontSize: 20,
        fontWeight: '900',
        color: neutralColor[90]
    }
})

export default styles