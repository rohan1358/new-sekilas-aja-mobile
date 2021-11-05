import { colors, neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    skeleton: { flex: 1 },

    sectionContent: {
        paddingTop: 32,
    },

    title: {
        marginLeft: 32
    },
    subTitle:{
        marginLeft: 32
    },

    listContent: {
        marginTop: 24,
    },
    
    list: {
        marginHorizontal: 32,
        marginVertical: 8
    },

    titleList: {
        fontSize: 16,
        fontWeight: "500",
        color: neutralColor[80]
    },

    textLevel: {
        fontSize: 14,
        color: '#2BA67A',
        marginTop: 4
    },

    textContent: {
        fontSize: 14,
        color: neutralColor[60],
        marginTop: 4
    },

    boxText: {
        maxWidth: '73%',
    },

    btnAction: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 32,
        marginTop: 6,
        paddingVertical: 8,
        borderColor: '#BBC0CE'
    },

    listPreferens: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent:'space-between'
    },

    containerModal: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    contentModal: {
        width: '85%',
        maxHeight: '50%',
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 8,
    },

    btnExit: {
        position: 'absolute',
        right: 5,
        top: 5,
        padding: 5
    },

    textLanguage: {
        marginTop: 10
    },

    language: {
        fontSize: 16,
        fontWeight: 'bold',
        color: neutralColor[90]
    }

})

export default styles;
