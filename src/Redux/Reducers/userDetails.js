import actionType from "../actionType"

const initialState = {
    loading : true,
    userDetails: null,
    error: null
}

const userDetailsReducer = (state = initialState, action)=>{
      switch(action.type){
        case(actionType.GET_CURRENT_USER_REQUEST):
        return{
            ...state,
            loading: true
        }
        case(actionType.GET_CURRENT_USER_SUCCESS):
        return{
            ...state,
            loading: false,
            userDetails: action.payload
        }
        case(actionType.GET_CURRENT_USER_ERROR):
        return{
            ...state,
            loading: false,
            error: action.payload
        }
        default: return state
      }
}

export default userDetailsReducer;
