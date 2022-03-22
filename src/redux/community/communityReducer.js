import CommunityService from "../../services/CommunityService";

const SET_ALL_COMMUNITIES_PROFILE = "communityReducer/SET_ALL_COMMUNITIES_PROFILE"
const SET_COMMUNITY_BY_ID_PROFILE = "communityReducer/SET_COMMUNITY_BY_ID_PROFILE"

const SET_TOTAL_COUNT = "communityReducer/SET_TOTAL_COUNT"
const SET_CURRENT_PAGE = "communityReducer/SET_CURRENT_PAGE"

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

export const setAllCommunitiesActionCreator = (communities) => {
    return {type: SET_ALL_COMMUNITIES_PROFILE, communities: communities}
}

export const setTotalCountActionCreator = (totalCount) => {
    return {type: SET_TOTAL_COUNT, totalCount: totalCount}
}

export const setCurrentPageActionCreator = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage}
}

export const setCommunityByIdActionCreator = (community) => {
    return {type: SET_COMMUNITY_BY_ID_PROFILE, community: community}
}

export const getCommunitiesThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        try {
            await CommunityService.getAllCommunities(currentPage, pageSize)
                .then((response) => {
                    dispatch(setAllCommunitiesActionCreator(response.data.communities))
                    dispatch(setTotalCountActionCreator(response.data.totalCount))
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCommunitiesChangedThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        try {
            await CommunityService.getAllCommunities(pageNumber, pageSize)
                .then((response) => {
                    dispatch(setCurrentPageActionCreator(pageNumber))
                    dispatch(setAllCommunitiesActionCreator(response.data.communities))
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCommunityByIdThunkCreator = (communityId) => {
    return async (dispatch) => {
        try {
            await CommunityService.getCommunityById(communityId)
                .then((response) => {
                    dispatch(setCommunityByIdActionCreator(response.data))
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export default communityReducer