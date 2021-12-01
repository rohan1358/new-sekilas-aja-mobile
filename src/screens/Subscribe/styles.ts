import { colors, neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { widthPercent } from "../../helpers/helper";


const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor.main,
        flex: 1
    },

    boxExit: {
        alignItems:'flex-end'
    },
    
    boxBack: {
        alignItems:'flex-start',
    },

    btn: {
        marginHorizontal: 27,
        marginVertical: 19,
        padding: 5,
    },

    content: {
        flex: 1,
        width: widthPercent(100)
    },

    boxContent: {
        paddingHorizontal: 25
    },

    subTextTitle: {
        marginTop: 8
    },

    boxWhite: {
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: neutralColor[90],
        borderRadius: 16,
        paddingVertical: 29,
        paddingHorizontal: 16,
        marginVertical: 24
    },

    list: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },

    textList: {
        marginLeft: 8
    },

    btnPilih: {
        height: 64,
        backgroundColor: neutralColor[90],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },

    btnCancel: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginTop: 8
    },

    boxListCard: {
        flexDirection: 'row',
        marginVertical: 24,
        width: '100%',
        justifyContent:'space-between',
    },

    card: {
        borderWidth: 2,
        borderColor: neutralColor[90],
        borderRadius: 16,
        overflow: 'hidden',
        width: '47%',
        height: 200
    },

    headCard: {
        backgroundColor: neutralColor[90],
        alignItems: 'center',
        paddingVertical: 8
    },

    backPrimaryColor: {
        backgroundColor: primaryColor.main
    },

    headCardActiveNormal: {
        backgroundColor: colors.white
    },

    contentCard: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: '100%'
    },

    textBestValue: {
        fontWeight: 'bold',
        color: primaryColor.main
    },

    colorBlack: {
        color: neutralColor[90]
    },

    colorWhite: {
        color: colors.white
    },

    colorPrimary: {
        color: primaryColor.main
    },

    colorPink: {
        color: '#f7948d'
    },

    backBlack: {
        backgroundColor: neutralColor[90]
    },

    backWhite: {
        backgroundColor: colors.white,
    },

    hemat: {
        color: '#CB3168',
        fontWeight: '700'
    },

    price: {
        fontSize: 20,
        textAlign: 'center',
        color: neutralColor[90],
        marginVertical: 8
    },

    textBold: {
        fontWeight: 'bold',
    },

    note: {
        textAlign: 'center',
        fontSize: 12
    },
})

export default styles;