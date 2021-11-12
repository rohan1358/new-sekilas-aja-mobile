import { StyleSheet } from "react-native";
import { colors, neutralColor, primaryColor, spacing as sp, strings } from "../../../constants";
import { widthPercent } from "../../../helpers/helper";

const styles = StyleSheet.create({
    container: {
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
        // height: 88,
        alignItems: 'center',
        marginBottom: 34,
    },

    profileContainer: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 48,
        overflow: "hidden",
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