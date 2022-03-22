import UserService from "../../services/UserService"

const SET_USER_PROFILE = "userReducer/SET_USER_PROFILE"
const SET_CURRENT_PAGE = "userReducer/SET_CURRENT_PAGE"
const SET_FETCHING_SCROLL = "userReducer/SET_FETCHING_SCROLL"
const INCREASE_ALL_USERS = "userReducer/INCREASE_ALL_USERS"
const TOTAL_COUNT = "userReducer/TOTAL_COUNT"
const SET_FOLLOW = "userReducer/SET_FOLLOW"
const SET_UNFOLLOW = "userReducer/SET_UNFOLLOW"
const SELECT_FILTER = "userReducer/SELECT_FILTER"

let initialState = {
    profile: {},
    posts: [],
    users: [],
    pageSize: 20,
    totalCount: 0,
    currentPage: 0,
    fetchingScroll: true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_FETCHING_SCROLL: {
            return {
                ...state,
                fetchingScroll: action.value //true or false
            }
        }
        case INCREASE_ALL_USERS: {
            return {
                ...state,
                users: state.users.concat(action.users)
            }
        }
        case TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case SET_FOLLOW: {
            const index = state.users.findIndex(user => user._id === action.userId)
            state.users[index].followers.push(action.authorizedUserId)
            return {
                ...state,
                users: [...state.users]
            }
        }
        case SET_UNFOLLOW: {
            const index = state.users.findIndex(user => user._id === action.userId)
            const indexF = state.users[index].followers.indexOf(action.authorizedUserId)
            if (indexF !== -1) {
                state.users[index].followers.splice(indexF, 1)
            }
            return {
                ...state,
                users: [...state.users]
            }
        }
        case SELECT_FILTER: {
            return {
                ...state
            }
        }
        default:
            return {
                ...state
            }
    }
}

export const setUserProfileActionCreator = (profile) => {
    return {type: SET_USER_PROFILE, profile: profile}
}

export const increaseCurrentPageActionCreator = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage}
}

export const setFetchingScroll = (value) => {
    return {type: SET_FETCHING_SCROLL, value: value}
}

export const setIncreaseAllUsersActionCreator = (users) => {
    return {type: INCREASE_ALL_USERS, users: users}
}

export const setTotalCountActionCreator = (totalCount) => {
    return {type: TOTAL_COUNT, totalCount: totalCount}
}

export const setFollow = (userId, authorizedUserId) => {
    return {type: SET_FOLLOW, userId: userId, authorizedUserId: authorizedUserId}
}

export const setUnfollow = (userId, authorizedUserId) => {
    return {type: SET_UNFOLLOW, userId: userId, authorizedUserId: authorizedUserId}
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

export default userReducer