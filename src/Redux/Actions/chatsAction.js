import actionType from "../actionType"

export const getCurrentUserChat = (data)=>{
   return{
      type : actionType.GET_CURRENT_USER_CHATS,
      payload: data
   }
}