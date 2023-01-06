import React from "react";

import { Text, View, Image} from "react-native";
import { COLORS, SIZES } from "../Theme/Index";
import { Price } from "../Components/SubInfo";

const DetailsBid = ({bid})=>{
    return(
        <View 
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            marginVertical: SIZES.base,
          }}
        >
            <Image source={bid.image} resizeMode={'contain'} style={{
                width: 48,
                height: 48
            }}/>
            <View>
                <Text
                  style={{
                    fontSize: SIZES.font,
                    color : COLORS.primary
                  }}
                >
                    Bid placed by {bid.name}
                </Text>
                <Text
                  style={{
                    fontSize: SIZES.small,
                    color : COLORS.secondary
                  }}
                >
                    {bid.date}
                </Text>
            </View>
            <Price price={bid.price}/>
        </View>
    )
}

export default DetailsBid;