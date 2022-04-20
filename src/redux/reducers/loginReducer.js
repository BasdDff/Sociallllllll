export const LOGIN = "loginReducer/LOGIN"
export const REGISTRATION = "loginReducer/REGISTRATION"
export const CHECK_AUTH = "loginReducer/CHECK_AUTH"
export const LOGOUT = "loginReducer/LOGOUT"
export const AUTHORIZED_USER_ID = "loginReducer/AUTHORIZED_USER_ID"
export const IS_INITIALIZED = "loginReducer/IS_INITIALIZED"
export const SET_ERROR = "SET_ERROR"

let initialState = {
    isAuth: false,
    authorizedUserId: "",
    isInitialized: false,
    email: "",
    error: null
}

const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        return {
            ...state,
            isAuth: true,
        }
    } else if (action.type === SET_ERROR) {
        return {
            ...state,
            error: action.error
        }
    } else if (action.type === REGISTRATION) {
        return {
            ...state,
            email: action.email
        }
    } else if (action.type === CHECK_AUTH) {
        return {
            ...state,
            isAuth: true,
        }
    } else if (action.type === AUTHORIZED_USER_ID) {
        return {
            ...state,
            authorizedUserId: action.authorizedUserId
        }
    } else if (action.type === IS_INITIALIZED) {
        return {
            ...state,
            isInitialized: true
        }
    } else if (action.type === LOGOUT) {
        return {
            ...state,
            isAuth: false,
            email: ""
        }
    } else {
        return state
    }
}

export default loginReducer