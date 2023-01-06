import {TouchableOpacity, Text } from 'react-native'
import React from 'react'

import Styles from './Style'

const FormButton = ({title, bgColor, ...rest}) => {
  return (
    <TouchableOpacity style={[Styles.btnCont, {backgroundColor:bgColor}]} {...rest}>
        <Text style={Styles.btnText}>
             {title}
        </Text>
    </TouchableOpacity>
  )
}

export default FormButton