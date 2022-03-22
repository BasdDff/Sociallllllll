import $api from "../http/index";

export default class PostService {

    static async fetchPost(userId) {
        return $api.get(`/posts/${userId}`)
    }

    static async addFileToNewPost(data) {
        return $api.post(`/upload`, data)
    }

    static async addNewPost(newPost) {
        return $api.post(`/post`, newPost)
    }

    static async editPost(idPost, desc, file) {
        const post = {
            description: desc,
            image: file
        }
        return $api.put(`/post/${idPost}`, post)
    }

    static async getPost(idPost) {
        return $api.get(`/post/${idPost}`)
    }

    static async likePost(idPost) {
        return $api.put(`/post/${idPost}/like`)
    }

    static async deletePost(idPost) {
        return $api.delete(`/post/${idPost}`)
    }

    static async getTimelinePosts() {
        return $api.get(`/posts/timeline/all`)
    }

}