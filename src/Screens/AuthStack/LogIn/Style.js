import { StyleSheet } from "react-native";
import { COLORS } from "../../../Theme/Theme";

const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color: COLORS.primary,
        margin:10
    },
    img:{
        width: 300,
        height: 300
    },
    box1:{
        alignItems:"center",
        flex: 1
    },
    box2:{
        paddingHorizontal:40,
        flex: 1,
        paddingTop: 30
    },

    inp_margin:{
        marginTop: 25
    }
 });

export default styles