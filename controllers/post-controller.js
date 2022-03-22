//здесь пишем код из html

const postService = require("../service/post-service")
const Observer = require("../exceptions/api-error")

class PostController {

    async createNewPost(request, response, next) {
        try {
            if (request.user._id === request.body.userId) {
                const newPost = await postService.createNewPost(request.body)
                const savePost = await postService.saveNewPost(newPost)
                response.status(200).json(savePost)
            } else {
                return response.status(403).json("You can update only your account")
            }
        } catch (error) {
            response.status(500).json("Unknown error")
        }
    }

    async updatePostById(request, response, next) {
        try {
            const post = await postService.findPostById(request.params.id)
            if (request.user._id === post.userId) {
                await postService.updatePost(post, request.body)
                //response.status(200).json("the post has been updated")
                response.status(200).json("the post has been updated")
            } else {
                response.status(403).json("you can update only your post")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async deletePostById(request, response, next) {
        try {
            const post = await postService.findPostById(request.params.id)
            if (request.user._id === post.userId) {
                await postService.deletePostById(post)
                response.status(200).json("the post has been deleted")
            } else {
                response.status(403).json("you can delete only your post")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async likePost(request, response, next) {
        try {
            const post = await postService.findPostById(request.params.id)
            if (!post.likes.includes(request.user._id)) {
                await postService.updateLikePost(post, request.user._id)
                response.status(200).json("the post has been liked")
            } else {
                await postService.updateDislikePost(post, request.user._id)
                response.status(200).json("the post has been disliked")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getPostById(request, response, next) {
        try {
            const post = await postService.findPostById(request.params.id)
            response.status(200).json(post)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getPostsByUserId(request, response, next) {
        try {
            const currentUser = await postService.findUserById(request.params.userId)
            const userPosts = await postService.findPostsById({userId: currentUser._id})
            response.status(200).json(userPosts)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getTimelinePost(request, response, next) {
        try {
            const currentUser = await postService.findUserById(request.user._id)

            const userPosts = await postService.findPostsById({userId: currentUser._id})
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return postService.friendMap(friendId)
                })
            )
            response.json(userPosts.concat(...friendPosts))

            //const userPosts = await postService.findPostsById({userId: currentUser._id})

            // const mutableUserPosts = userPosts.map(userPost => ({
            //     ...userPost.toObject(),
            //     username: currentUser.username
            // }))

            // const friendPosts = await Promise.all(
            //     currentUser.followings.map(async (friendId) => {
            //         const friend = await postService.findUserById(friendId)
            //
            //         const posts = await postService.friendMap(friendId)
            //
            //         const newArr = posts.map(post => ({
            //             ...post.toObject(), //Объекты, возвращаемые mongoose, обертывают фактические данные, чтобы добавить к ним поведение (методы). мета данные че?
            //             username: friend.username
            //         }))
            //
            //         return newArr
            //     })
            // )

            //response.json(mutableUserPosts.concat(...friendPosts))

        } catch (error) {
            response.status(500).json(error)
        }
    }
}

module.exports = new PostController()