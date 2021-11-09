import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    skeleton: { flex: 1 },

    content: {
        padding: 32
    },
    title: {
        fontSize: 20,
        color: neutralColor[90],
        fontWeight: '700'
    },

    boxItem: {
        borderWidth: 2,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: neutralColor[50],
        marginBottom: 16,
        alignItems:'center'
    },

    textInput: {
        flex: 1,
        fontSize: 16,
        color: neutralColor[90]
    },

    btnKeluar: {
        marginTop: 24,
        alignItems: 'center',
        paddingVertical: 10
    },

    contaonerSheet: {
        marginTop: 24
    },

    titleGantiFoto: {
        marginLeft: 32,
        marginBottom: 20
    },

    btnTakeAction: {
        borderTopWidth: 1,
        borderColor: neutralColor[60],
        paddingHorizontal: 32,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    textTake: {
        fontSize: 20,
        fontWeight: '500',
        color: neutralColor[70]
    }
})

export default styles;