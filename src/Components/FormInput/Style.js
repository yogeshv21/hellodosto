import { StyleSheet } from "react-native";

import { VH, VW, COLORS, SHADOWS } from '../../Theme/Index'

const Stylesinp = StyleSheet.create({
    inputContainer: {
        marginTop: VH(65),
        marginBottom: 10,
        width: '100%',
        height: VH(15),
        // borderColor: '#ccc',
        borderRadius: 3,
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        ...SHADOWS.light
      },
      iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
      },
      input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: VW(1.5),
        height: VH(15),
        fontSize: 16,
        borderRadius: 8,
        // borderWidth: 1,  
    },
})

export default Stylesinp;