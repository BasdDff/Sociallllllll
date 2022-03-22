const CommunityModel = require("../models/community-model")

class CommunityService {

    async createNewCommunity(body) {
        return new CommunityModel(body)
    }

    async saveNewCommunity(newPost) {
        return newPost.save()
    }

    async findAllCommunities(page, pageSize) {
        let countSkip = page * pageSize
        return CommunityModel.find().skip(countSkip).limit(parseInt(pageSize))
    }

    async totalCountCommunities() {
        return (await CommunityModel.collection.stats()).count
    }

    async findCommunityById(id) {
        return CommunityModel.findById(id)
    }

    // $project
    //Манипулирует полями, может добавлять новые, удалять переименовывать старые
    //работает с $size (записывает в новую переменную size_posts и потом ее можно использовать
    // $match
    //Фильтрует документы, чтобы передать на следующий этап конвейера только те документы,
    //которые соответствуют указанным условиям.
    //
    async quantityCommunitiesWhichHavePosts() {
        return CommunityModel.aggregate([
            {$project: {size_posts: {$size: "$timeline"}}},
            {
                $match: {
                    "size_posts": {$gt: 0} //значения > 1
                }
            },
        ])
    }

    async quantityCommunitiesWhichEmpty() {
        return CommunityModel.aggregate([
            {$project: {size_users: {$size: "$users"}}},
            {
                $match: {
                    "size_users": {$lt: 1} //значения меньше 1
                }
            },
            {$group: {_id: "$title", count: {$sum: 1}}}
        ])
    }

    async userHasMostGroups() {
        return CommunityModel.aggregate([
            {$unwind: "$users"},
            {$project: {id_community: 1, users: 1, count: {$add: [1]}}},
            {$group: {_id: "$users", number: {$sum: "$count"}}},
            {$sort: {number: -1}},
            {$limit: 1}
        ])
    }

    async quantityCommunitiesSameNames() {
        return CommunityModel.aggregate([
            {$group: {_id: "$title", count: {$sum: 1}}}
        ])
    }

    async lengthDescription() {
        return CommunityModel.aggregate([
            {$project: {"length": {$strLenCP: "$description"}}}
        ])
    }

    async updateCommunity(community, body) {
        return community.updateOne({$set: body})
    }

    async deleteCommunityById(post) {
        return await post.deleteOne()
    }

}

module.exports = new CommunityService()