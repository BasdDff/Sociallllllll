import axios from "axios"
import {API_URL} from "../../http"
import AuthService from "../../services/AuthService"

const LOGIN = "loginReducer/LOGIN"
const REGISTRATION = "loginReducer/REGISTRATION"
const CHECK_AUTH = "loginReducer/CHECK_AUTH"
const LOGOUT = "loginReducer/LOGOUT"
const AUTHORIZED_USER_ID = "loginReducer/AUTHORIZED_USER_ID"
const IS_INITIALIZED = "loginReducer/IS_INITIALIZED"

let initialState = {
    isAuth: false,
    authorizedUserId: "",
    isInitialized: false,
    email: "",
}

const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        return {
            ...state,
            isAuth: true,
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

export const setUserLoginActionCreator = () => {
    return {type: LOGIN}
}

export const emailActionCreator = (email) => {
    return {type: REGISTRATION, email: email}
}

export const checkAuthActionCreator = () => {
    return {type: CHECK_AUTH}
}

export const setAuthorizedUserIdActionCreator = (authorizedUserId) => {
    return {type: AUTHORIZED_USER_ID, authorizedUserId: authorizedUserId}
}

export const setIsInitializedActionCreator = () => {
    return {type: IS_INITIALIZED}
}

export const logoutActionCreator = () => {
    return {type: LOGOUT}
}

export const registrationThunkCreator = (email, password, username) => {
    return async (dispatch) => {
        const response = await AuthService.registration(email, password, username)
        localStorage.setItem("token", response.data.accessToken)
        dispatch(emailActionCreator(response.data.user.email))
        dispatch(checkAuthActionCreator())
    }
}

export const loginThunkCreator = (email, password) => {
    return async (dispatch) => {
        await AuthService.login(email, password)
            .then((response) => {
                localStorage.setItem("token", response.data.accessToken)
                dispatch(setUserLoginActionCreator())
                dispatch(setIsInitializedActionCreator())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const checkAuthThunkCreator = () => {
    return async (dispatch) => {
        await axios.get(`${API_URL}/refresh`, {
            withCredentials: true
        }).then((response) => {
            localStorage.setItem("token", response.data.accessToken)
            dispatch(checkAuthActionCreator())
            dispatch(setAuthorizedUserIdActionCreator(response.data.user._id))
            dispatch(emailActionCreator(response.data.user.email))
            dispatch(setIsInitializedActionCreator())
        }).catch((error) => {
            console.log(error)
            dispatch(setIsInitializedActionCreator())
        })
    }
}

export const logoutThunkCreator = () => {
    return async (dispatch) => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem("token")
            dispatch(logoutActionCreator())
        } catch (error) {
            console.log(error)
        }
    }
}

export default loginReducer