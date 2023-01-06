import actionType from "../actionType"

const initialState = {
    loading: false,
    user: null,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        // ======================= LOGIN USER ==================== // 

        case (actionType.LOGIN_REQUEST):
            return {
                ...state,
                loading: true
            }
        case (actionType.LOGIN_SUCCESS):
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case (actionType.LOGIN_ERROR):
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        // ======================= SIGN UP USER ==================== // 

        case (actionType.SIGN_UP_REQUEST):
            return {
                ...state,
                loading: true
            }
        case (actionType.SIGN_UP_SUCCESS):
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case (actionType.SIGN_UP_ERROR):
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            
        default: return state
    }
}

export default userReducer