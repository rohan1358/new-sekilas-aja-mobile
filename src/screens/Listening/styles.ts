import { neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";
import { heightPercent } from "../../helpers/helper";


const styles = StyleSheet.create({
    content: {
        backgroundColor: primaryColor.main,
        flex: 1,
        paddingHorizontal: 25
    },
    boxImage: {
        height: heightPercent(25),
        marginVertical: 23
    },

    text: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 20,
        color: neutralColor[70],
        fontWeight: '500'
    },

    containerTitle: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: neutralColor[90],
        // textAlign:'center'
    },

    gradientLeft: {
        width: 60,
        height: '100%',
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    
    gradientRight: {
        width: 60,
        height: '100%',
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },

    SliderContainer: {
        height: heightPercent(5)
    },

    trackSliderStyle: {
        height: 8,
        borderRadius: 10
    },

    boxTextTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },

    boxAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: heightPercent(5),
        alignItems: 'center',
        paddingHorizontal: 10
    },

    play: {
        backgroundColor: neutralColor[90],
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
    },

    rotate: {
        width: 10,
        height: 10
    },

    iconPlay: {
        marginLeft: 5
    },

    boxFooter: {
        alignItems:'center'
    },

    speedText: {
        fontWeight: '700',
        marginBottom: heightPercent(5),
    },

    SelectBar: {
        backgroundColor: neutralColor[90],
        marginHorizontal: 25,
        height: 44,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems:'center'
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
})

export default styles;