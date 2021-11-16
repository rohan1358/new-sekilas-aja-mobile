import { primaryColor } from "@constants";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor.main,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24
    },
    
    btnBack: {
        padding: 20
    }
})

export default styles;