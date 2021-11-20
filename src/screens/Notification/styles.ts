import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../helpers/helper";


const styles = StyleSheet.create({
    skeleton: { flex: 1 },

    riwayatEmpty: {
        alignItems: 'center',
        width: widthPercent(100),
        height: heightPercent(60),
    },

    imageEmpty: {
        width: '100%',
        height: '100%'
    },

    boxEmpty: {
        alignItems: 'center',
    },

    notifEmpty: {
        fontSize: 32,
        fontWeight: '900',
        color: neutralColor[90]
    },

    tidak_ada_notif: {
        fontSize: 16,
        fontWeight: '500',
        color: neutralColor[60],
        marginTop: 8
    }
})

export default styles;