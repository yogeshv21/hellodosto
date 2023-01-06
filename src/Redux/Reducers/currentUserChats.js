import actionType from "../actionType";

const initialState = {
    chats: null,
}

const currentUserChatReducer= (state = initialState, action)=>{
    switch(action.type){
        case(actionType.GET_CURRENT_USER_CHATS):
        return{
            ...state,
            chats: action.payload
        }
        default: return state
    }
}

export default currentUserChatReducer;