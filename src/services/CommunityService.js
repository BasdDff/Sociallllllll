import $api from "../http/index";

export default class CommunityService {

    static getAllCommunities(page = 0, pageSize = 7) {
        //return $api.get(`/communities?page=${page}&pageSize=${pageSize}`)
        return $api.get(`/communities`, {
            params: {
                page: page,
                pageSize: pageSize
            }
        })
    }

    static createNewCommunity(newCommunity) {
        console.log(newCommunity)
        return $api.post("/community", newCommunity)
    }

    static getCommunityById(id) {
        return $api.get(`/community/${id}`)
    }

    static deleteCommunity(id, userId) {
        return $api.delete(`/community/${id}`, {userId})
    }

    static updateCommunity(id, community) {
        console.log(id)
        return $api.put(`/community/${id}`, community)
    }

}