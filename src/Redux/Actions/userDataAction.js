import actionType from "../actionType"
import firestore from '@react-native-firebase/firestore'


const userDetailsRequest =()=>{
     return{
        type: actionType.GET_CURRENT_USER_REQUEST,
     }
}
const userDetailsSuccess =(data)=>{
     return{
        type: actionType.GET_CURRENT_USER_SUCCESS,
        payload: data
     }
}
const userDetailsError =(err)=>{
     return{
        type: actionType.GET_CURRENT_USER_ERROR,
        payload: err
     }
}

export const getUserDetails =(uid)=>{
      return (dispatch)=>{
         dispatch(userDetailsRequest());
         firestore().collection("users")
         .doc(uid)
         .get()
         .then(doc => {
           dispatch(userDetailsSuccess(doc.data()))
         }).catch(err=>{
           dispatch(userDetailsError(err))
         })
      }
}