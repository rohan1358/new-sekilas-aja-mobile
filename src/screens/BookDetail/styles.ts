import { neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../helpers/helper";


const styles = StyleSheet.create({
    skeleton:{flex:1},

    layer: {
        height: heightPercent(28),
        // borderWidth: 1,
    },
    
    head: {
        alignItems: 'center',
        backgroundColor: primaryColor.main,
        height: '60%',
        paddingTop: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },

    boxImage: {
        width: 147,
        height: 221,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    boxSelect: {
        marginTop: 20
    },

    SelectBarUp:{
        backgroundColor: neutralColor[90],
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 60,
        width: widthPercent(100),
        zIndex: 1
    },

    SelectBar: {
        backgroundColor: neutralColor[90],
        marginHorizontal: 25,
        height: 44,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems:'center'
    },

    upgrade_yuk: {
        justifyContent:'center'
    },

    btnBar: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },

    titleSelect: {
        fontSize: 16,
        color: primaryColor.main,
        fontWeight: '700',
        marginLeft: 10
    },

    sectionDetail: {
        paddingVertical: 25
    },

    boxTitle: {
        paddingHorizontal: 25,
        marginBottom: 24
    },

    titleBook: {
        fontSize: 32,
        fontWeight: '700',
        color: neutralColor[90]
    },

    titleOuthor: {
        fontWeight: '500',
        fontSize: 20,
        color: neutralColor[70],
        marginTop: 8,
        textDecorationLine:"underline",
    },

    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },

    boxTextInfo: {
        backgroundColor: neutralColor[20],
        paddingHorizontal: 5,
        marginLeft: 10,
        borderRadius: 5,
        marginRight: 55
    },

    iconInfo: {
        width: 24,
        height: 24,
    },

    textInfo: {
        fontSize: 10,
        color: neutralColor[90],
        fontWeight: '500',
    },

    sectionList: {
        paddingHorizontal: 25,
        marginBottom: 16,
    },

    titleSection: {
        fontSize: 24,
        fontWeight: '900',
        color: neutralColor[90]
    },

    boxTextKategori: {
        marginTop: 16,
        backgroundColor: neutralColor[20],
        borderWidth: 1,
        borderColor: neutralColor[60],
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection:'row'
    },

    textKategori: {
        fontSize: 16,
        marginRight: 6,
        color: neutralColor[80]
    },

    boxTextTentang: {
        marginTop: 16,
    },

    listTentang: {
        marginTop: 20
    },

    textTentang: {
        fontSize: 16,
        color: neutralColor[70],
    },

    boxRelease: {
        paddingHorizontal: 25,
    },


    texttglRelease: {
        fontSize: 16,
        fontWeight: '500',
        color: neutralColor[90]
    },

    tgl: {
        fontSize: 16,
        fontWeight: '500',
        color: neutralColor[70],
        marginTop: 8
    },

    textpublikasi: {
        fontSize: 14,
        color: neutralColor[60],
        marginTop: 3
    },

    boxAvatar: {
        flexDirection: 'row',
        alignItems:'center',
    },

    boxImageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: neutralColor[30],
        marginRight: 10,
        marginTop: 10
    },

    imageAvatar: {
        width: '100%',
        height: '100%'
    },

    boxDaftarIsi: {
        marginVertical: 25
    },

    textDaftarIsi: {
        marginLeft: 25,
        marginBottom: 16
    },

    boxListDaftar: {
        borderTopWidth: 1,
        borderColor: neutralColor[50],
    },

    listDaftar: {
        borderBottomWidth: 1,
        paddingHorizontal: 25,
        borderColor: neutralColor[50],
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },

    textDfatar: {
        fontSize: 16,
        fontWeight: '500',
        color: neutralColor[90]
    },

    boxTitleUlasan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        alignItems:'center'
    },

    textLihatSemua: {
        fontSize: 16,
        fontWeight: '700',
        color: neutralColor[90],
        textDecorationLine:'underline'
    },

    containerRating:{
        borderBottomWidth: 1,
        borderBottomColor: neutralColor[50]
    },

    boxRating: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        marginTop: 16
    },

    textRating: {
        fontSize: 40,
        fontWeight: '700',
        color: neutralColor[90],
        marginRight: 10
    },

    textUlasanDari: {
        marginLeft: 25,
        fontSize: 20,
        color: neutralColor[60],
        fontWeight: '500',
        marginVertical: 10
    },

    textKomentar: {
        fontSize: 16,
        fontWeight: '700',
        color: neutralColor[90],
        marginBottom: 8,
    },

    boxKomentar: {
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: neutralColor[50],
        marginVertical: 10
    },

    boxLihatLebih: {
        paddingHorizontal: 25
    },

    containerRatingChange: {
        marginVertical: 15,
    },

    starContainer: {
        width: '100%',
        justifyContent:'space-between'
    },

    multipelTextInput: {
        borderWidth: 1,
        height: 136,
        borderColor: neutralColor[60],
        borderRadius: 12,
        paddingHorizontal: 10,
        fontSize: 16
    },

    btnKirim: {
        backgroundColor: neutralColor[90],
        marginVertical: 24,
        borderRadius: 12,
        height: 44,
        alignItems: 'center',
        justifyContent:'center'
    },

    textBtn: {
        fontSize: 20,
        fontWeight: '700',
        color: primaryColor.main,
    },

    sectionSaran: {
        paddingHorizontal: 25,
    },

    headSaran: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },

    columnWrapperStyle: { justifyContent: "space-between" },

    boxListBook: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
    }


})

export default styles;