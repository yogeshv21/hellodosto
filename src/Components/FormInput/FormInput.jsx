import { View, TextInput} from 'react-native'
import React from 'react'

import Styles from './Style'
import { COLORS } from '../../Theme/Theme'


const FormInput = ({lable , placeholderText, ...rest}) => {
  return (
    <View style={Styles.inputContainer}>
        <TextInput 
          style={[Styles.input, Styles.inputField]}
          value={lable}
          placeholderTextColor={COLORS.gray}
          placeholder={placeholderText}
          {...rest}
        />
    </View>
  )
}

export default FormInput