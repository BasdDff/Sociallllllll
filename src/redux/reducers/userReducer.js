export const SET_USER_PROFILE = "userReducer/SET_USER_PROFILE"
export const SET_CURRENT_PAGE = "userReducer/SET_CURRENT_PAGE"
export const SET_FETCHING_SCROLL = "userReducer/SET_FETCHING_SCROLL"
export const INCREASE_ALL_USERS = "userReducer/INCREASE_ALL_USERS"
export const TOTAL_COUNT = "userReducer/TOTAL_COUNT"
export const SET_FOLLOW = "userReducer/SET_FOLLOW"
export const SET_UNFOLLOW = "userReducer/SET_UNFOLLOW"
export const SELECT_FILTER = "userReducer/SELECT_FILTER"

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

export default userReducer