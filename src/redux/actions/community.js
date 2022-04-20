import CommunityService from "../../services/CommunityService";
import {
    SET_ALL_COMMUNITIES_PROFILE, SET_COMMUNITY_BY_ID_PROFILE, SET_CURRENT_PAGE, SET_TOTAL_COUNT
} from "../reducers/communityReducer";

export const setCommunityByIdActionCreator = (community) => {
    return {type: SET_COMMUNITY_BY_ID_PROFILE, community}
}

export const setTotalCountActionCreator = (totalCount) => {
    return {type: SET_TOTAL_COUNT, totalCount}
}

export const setCurrentPageActionCreator = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const setAllCommunitiesActionCreator = (communities) => {
    return {type: SET_ALL_COMMUNITIES_PROFILE, communities}
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