import UserService from "../../services/UserService";
import {
    INCREASE_ALL_USERS,
    SET_CURRENT_PAGE,
    SET_FETCHING_SCROLL, SET_FOLLOW, SET_UNFOLLOW,
    SET_USER_PROFILE,
    TOTAL_COUNT
} from "../reducers/userReducer";

export const setUserProfileActionCreator = (profile) => {
    return {type: SET_USER_PROFILE, profile}
}

export const increaseCurrentPageActionCreator = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const setFetchingScroll = (value) => {
    return {type: SET_FETCHING_SCROLL, value}
}

export const setIncreaseAllUsersActionCreator = (users) => {
    return {type: INCREASE_ALL_USERS, users}
}

export const setTotalCountActionCreator = (totalCount) => {
    return {type: TOTAL_COUNT, totalCount}
}

export const setFollow = (userId, authorizedUserId) => {
    return {type: SET_FOLLOW, userId, authorizedUserId}
}

export const setUnfollow = (userId, authorizedUserId) => {
    return {type: SET_UNFOLLOW, userId, authorizedUserId}
}

export const getUserProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        const responseProfile = await UserService.fetchUsers(userId)
        dispatch(setUserProfileActionCreator(responseProfile.data))
    }
}

export const editUserInfoProfileThunkCreator = (user) => {
    return async (dispatch) => {
        await UserService.editUserInfo(user)
            .then((response) => {
                dispatch(setUserProfileActionCreator(response.data.user))
            })
    }
}

export const changeUserBirthdayThunkCreator = (date, setIsSuccessRequestDate) => {
    return async (dispatch) => {
        await UserService.changeBirthday(date)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setUserProfileActionCreator(response.data.user))
                    setIsSuccessRequestDate(true)
                }
            })
    }
}

export const changeTagThunkCreator = (tag) => {
    return async (dispatch) => {
        const response = await UserService.changeTag(tag)
        if (response.status === 200) {
            dispatch(setUserProfileActionCreator(response.data.user))
        }
    }
}

export const getScrollUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        await UserService.getAllUsers(currentPage, pageSize)
            .then((response) => {
                dispatch(setIncreaseAllUsersActionCreator(response.data.users))
                dispatch(increaseCurrentPageActionCreator(currentPage + 1))
                dispatch(setTotalCountActionCreator(response.data.totalCount))
            })
            .finally(() => {
                dispatch(setFetchingScroll(false))
            })

    }
}

export const follow = (userId, authorizedUserId) => {
    return async (dispatch) => {
        await UserService.follow(userId)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    dispatch(setFollow(userId, authorizedUserId))
                }
            })
    }
}

export const unfollow = (userId, authorizedUserId) => {
    return async (dispatch) => {
        await UserService.unfollow(userId)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    dispatch(setUnfollow(userId, authorizedUserId))
                }
            })
    }
}