import { StyleSheet } from "react-native";
import { colors, neutralColor, primaryColor, spacing as sp, strings } from "../../../constants";
import { widthPercent } from "../../../helpers/helper";

const styles = StyleSheet.create({
    container: {
        // paddingVertical: sp.m,
        paddingHorizontal: sp.sl,
        backgroundColor: primaryColor.main,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    sectionMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        // borderWidth: 1
    },
    
    textMenu: {
        marginLeft: 16
    },

    sectionProfile: {
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileContainer: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 48,
        overflow: "hidden",
    },

    profileTitle: {
        marginLeft: 16,
        width: 243
    },

    level: {
        backgroundColor: colors.white,
        width: 88,
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 2
    },

    textLevel: {
        color: '#2BA67A'
    },

    bgHeader: {
        position:'absolute',
        resizeMode: 'stretch',
        width: widthPercent(100),
        height: '50%',
        zIndex: -12,
        bottom: 0,
    }
})

export default styles;