import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, VW } from "../../Theme/Theme";

const Styles = StyleSheet.create({
    header_cont:{
       width:'100%',
       backgroundColor: COLORS.white,
       paddingHorizontal: VW(20),
       height: VW(8),
       flexDirection: "row",
       alignItems:"center",
       marginBottom: "3%",
       ...SHADOWS.medium
    },

    header_txt:{
       fontSize: VW(20),
       fontWeight: '500',
       color: COLORS.primary
    }
})

export default Styles