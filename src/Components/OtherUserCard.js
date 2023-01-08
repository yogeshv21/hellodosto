import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
import {COLORS, SHADOWS, SIZES, VH, VW} from '../Theme/Index';
import {useNavigation} from '@react-navigation/native'


const OtherUserCard = ({data}) => {
 
    const navigation = useNavigation()
    const profileHandler = (data)=>{
      navigation.navigate('Stack', {screen: "Profile", params:{data:data}})
    }
      
    return (
      <TouchableOpacity style={Styles.cardCont} onPress={()=>profileHandler(data)}>
        <View style={Styles.profileImg}>
        <Image source={{uri: data.pic}} 
             style={{
              height: '100%',
              width: '100%',
              borderRadius: 100
             }}/>
        </View>
        <View style={Styles.nameCont}>
          <Text style={Styles.userName}>{data.name}</Text>
          <Text style={Styles.userEmail}>{data.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  export default OtherUserCard;

  const Styles = StyleSheet.create({ 
    cardCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      ...SHADOWS.light,
      marginTop: VW(10),
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,
      padding: VH(90),
    },
  
    profileImg: {
      height: 80,
      width: 80,
      borderRadius: 100,
      backgroundColor: COLORS.primary,
    },
  
    nameCont: {
      width: '70%',
      height: '100%',
    },
    userName: {
      fontSize: SIZES.large + 1,
      fontWeight: '500',
      marginTop: '4%',
      color: "black"
    },
    userEmail: {
      fontSize: SIZES.medium,
      color: COLORS.gray,
    },
  });