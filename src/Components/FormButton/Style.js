import { StyleSheet } from "react-native";

import { VH, VW, COLORS } from '../../Theme/Index'

const Styles = StyleSheet.create({
     btnCont:{
        marginTop: VW(30),
        width: '100%',
        height: VH(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
     },
     btnText:{
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.white,
     }
})

export default Styles;