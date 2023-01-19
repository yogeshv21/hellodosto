import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { COLORS, SHADOWS, SIZES, VW } from "../Theme/Theme"
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chats = ()=>{
    const navigation = useNavigation()
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('Stack', {screen: "ChatUsers"})} style={Styles.container}>
           <Icon
                name={'wechat'}
                size={VW(14)}
                color={"white"}
              />
      </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container:{
        height: 50,
        width: 50,
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

