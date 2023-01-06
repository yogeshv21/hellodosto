import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Styles from './Style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../Theme/Theme';
import { useNavigation } from '@react-navigation/native';

const Header = ({screen, toscreen, arrow}) => {
  const navigation = useNavigation()
  return (
    <View style={Styles.header_cont}>
        {arrow?  <TouchableOpacity style={{marginRight: 10}} onPress={()=>{navigation.navigate(toscreen)}}>
          <Icon name='keyboard-arrow-left' size={35} color={COLORS.primary}/>
        </TouchableOpacity>: ''}
        <Text style={Styles.header_txt}>{screen}</Text>
    </View>
  )
}

export default Header