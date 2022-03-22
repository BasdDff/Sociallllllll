const communityService = require("../service/community-service")

class CommunityController {

    async createNewCommunity(request, response, next) {
        try {
            if (request.body.userId === request.body.authorizedUserId) {
                const newCommunity = await communityService.createNewCommunity(request.body)
                const saveCommunity = await communityService.saveNewCommunity(newCommunity)
                response.status(200).json(saveCommunity)
            } else {
                return response.status(403).json("You can create community only your account")
            }
        } catch (error) {
            response.status(500).json(error)
            next(error)
        }
    }

    async getCommunityById(request, response, next) {
        try {
            const currentCommunity = await communityService.findCommunityById(request.params.id)
            response.status(200).json(currentCommunity)
        } catch (error) {
            response.status(500).json(error)
            next(error)
        }
    }

    async getAllCommunities(request, response, next) {
        try {
            const page = request.query.page
            const pageSize = request.query.pageSize
            const communities = await communityService.findAllCommunities(page, pageSize)
            const totalCount = await communityService.totalCountCommunities()
            return response.status(200).json({communities: communities, totalCount: totalCount})
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    async updateCommunityById(request, response, next) {
        try {
            const currentCommunity = await communityService.findCommunityById(request.params.id)
            if (currentCommunity.userId === request.body.userId) {
                await communityService.updateCommunity(currentCommunity, request.body)
                response.status(200).json("the community has been updated")
            } else {
                response.status(403).json("you can update only your community")
            }
        } catch (error) {
            response.status(500).json(error)
            next(error)
        }
    }

    async deleteCommunityById(request, response, next) {
        try {
            const currentCommunity = await communityService.findCommunityById(request.params.id)
            console.log(currentCommunity)
            if (currentCommunity.userId === request.body.userId) {
                await communityService.deleteCommunityById(currentCommunity)
                response.status(200).json("the community has been deleted")
            } else {
                response.status(403).json("you can delete only your community")
            }
        } catch (error) {
            response.status(500).json(error)
            next(error)
        }
    }

}

module.exports = new CommunityController()