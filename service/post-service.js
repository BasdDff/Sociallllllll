//бизнес логика

const PostModel = require("../models/post-model")
const UserModel = require("../models/user-model")

class UserService {

    async createNewPost(body) {
        return await new PostModel(body)
    }

    async saveNewPost(newPost) {
        return await newPost.save()
    }

    async findPostById(paramsId) {
        return await PostModel.findById(paramsId)
    }

    async updatePost(post, body) {
        return await post.updateOne({$set: body})
    }

    async deletePostById(post) {
        return await post.deleteOne()
    }

    async updateLikePost(post, userId) {
        return await post.updateOne({$push: {likes: userId}})
    }

    async updateDislikePost(post, userId) {
        return await post.updateOne({$pull: {likes: userId}})
    }

    async findUserById(bodyId) {
        return await UserModel.findById(bodyId)
    }

    async findPostsById(paramsId) {
        return await PostModel.find(paramsId)
    }

    async friendMap(friendId) {
        return await PostModel.find({userId: friendId})
    }
}


module.exports = new UserService()