import { StyleSheet } from "react-native";
import { primaryColor, spacing as sp, colors, neutralColor } from "../../constants";
import { heightPercent, widthPercent } from "../../helpers/helper";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },

    content: {
        height: heightPercent(90)
    },

    pageContainer: {
        width: widthPercent(100),
        height: heightPercent(80),
    },

    boxImage: {
        height: '70%',
        overflow:'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },

    boxtitle: {
        paddingHorizontal: 40,
        marginTop: 20,
    },

    title: {
        textAlign:'center',
    },

    sub_title: {
        marginTop: 20,
        textAlign:'center'
    },

    boxCircle: {
        // marginTop: 20,
        // paddingHorizontal: widthPercent(30),
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'center',
    },

    circle: {
        width: 15,
        height: 15,
        backgroundColor: neutralColor[30],
        borderRadius: 100,
        marginHorizontal: 5
    },

    circleActive: {
        width: 15,
        height: 8,
        backgroundColor: primaryColor.main,
        borderRadius: 100,
        marginHorizontal: 5
    },

    boxBtn: {
        alignItems: 'center',
        marginVertical: 20
    },

    button: {
        backgroundColor: neutralColor[80],
        width: '80%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
    },

    textBtn: {
        color: primaryColor.main
    },

    boxBtnAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: widthPercent(100),
        paddingHorizontal: 20
    },

    buttonLewati: {
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
    },

    textBtnLewati: {
        color: neutralColor[80]
    },

    buttonLanjut: {
        width: '45%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: neutralColor[80],
        borderRadius: 8,
        flexDirection: 'row',
    }

})

export default styles;