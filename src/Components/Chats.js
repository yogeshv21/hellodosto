import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { COLORS, SHADOWS } from "../Theme/Theme"
import {useNavigation} from '@react-navigation/native'


const Chats = ()=>{
    const navigation = useNavigation()
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('Stack', {screen: "ChatUsers"})} style={Styles.container}>
          <Text style={{color:"white"}}>Chats</Text>
      </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container:{
        height: 60,
        width: 60,
        backgroundColor: COLORS.primary,
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 3,
        borderRadius: 100,
        alignItems:"center",
        justifyContent:"center",
        ...SHADOWS.dark
    }
})

export default Chats;

