import {
    AUTHORIZED_USER_ID,
    CHECK_AUTH,
    IS_INITIALIZED,
    LOGIN,
    LOGOUT,
    REGISTRATION,
    SET_ERROR
} from "../reducers/loginReducer";
import AuthService from "../../services/AuthService";
import axios from "axios";
import {API_URL} from "../../http";

export const setUserLoginActionCreator = () => {
    return {type: LOGIN}
}

export const emailActionCreator = (email) => {
    return {type: REGISTRATION, email}
}

export const setError = (error) => {
    return {type: SET_ERROR, error}
}

export const checkAuthActionCreator = () => {
    return {type: CHECK_AUTH}
}

export const setAuthorizedUserIdActionCreator = (authorizedUserId) => {
    return {type: AUTHORIZED_USER_ID, authorizedUserId}
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
                dispatch(setAuthorizedUserIdActionCreator(response.data.user._id))
                dispatch(setIsInitializedActionCreator())
            })
            .catch((error) => {
                dispatch(setError("Incorrect email or password."))
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