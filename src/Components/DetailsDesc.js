import React, { useState } from "react";

import { Text, View } from "react-native";
import { COLORS, SIZES } from "../Theme/Index";
import { Title, Price } from '../Components/SubInfo'

const DetailsDesc = ({ data }) => {
  const [text, setText] = useState(data.description.slice(0, 200))
  const [readMore, setReadMore] = useState(false)
  return (
    <>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Title
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />
      </View>
      <View style={{
        marginVertical: SIZES.extraLarge * 1.5
      }}>
        <Text
          style={{
            fontSize: SIZES.large,
            color: COLORS.primary
          }}
        >
          Description
        </Text>
        <View
          style={{
            marginTop: SIZES.base
          }}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
              color: COLORS.secondary,
              lineHeight: SIZES.large + 8
            }}
          >
            {text}
            {!readMore && '....'}
            <Text
             style={{
              fontSize: SIZES.medium,
              color: COLORS.primary,
            }}
            onPress={()=>{
              if(readMore === false){
                setText(data.description)
                setReadMore(true)
              }else{
                setText(data.description.slice(0, 200))
                setReadMore(false)
              }
            }}
            >
              {readMore ? '   Show Less': 'Read More'}

            </Text>
          </Text>
        </View>
      </View>

    </>
  )
}

export default DetailsDesc;