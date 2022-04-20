export const SET_ALL_COMMUNITIES_PROFILE = "communityReducer/SET_ALL_COMMUNITIES_PROFILE"
export const SET_COMMUNITY_BY_ID_PROFILE = "communityReducer/SET_COMMUNITY_BY_ID_PROFILE"

export const SET_TOTAL_COUNT = "communityReducer/SET_TOTAL_COUNT"
export const SET_CURRENT_PAGE = "communityReducer/SET_CURRENT_PAGE"

let initialState = {
    communities: [
        {
            id: 1,
            title: "dw"
        }
    ],
    community: {},

    pageSize: 7,
    currentPage: 0,
    totalCount: 0,
}

const communityReducer = (state = initialState, action) => {
    if (action.type === SET_ALL_COMMUNITIES_PROFILE) {
        return {
            ...state,
            communities: action.communities
        }
    } else if (action.type === SET_COMMUNITY_BY_ID_PROFILE) {
        return {
            ...state,
            community: action.community
        }
    } else if (action.type === SET_TOTAL_COUNT) {
        return {
            ...state,
            totalCount: action.totalCount
        }
    } else if (action.type === SET_CURRENT_PAGE) {
        return {
            ...state,
            currentPage: action.currentPage,
        }
    } else {
        return {
            ...state
        }
    }
}

export default communityReducer