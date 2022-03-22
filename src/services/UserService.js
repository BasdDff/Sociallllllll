import $api from "../http/index";

export default class UserService {
    static async fetchUsers(userId) {
        if (!userId) {
            return $api.get(`/user`)
        }
        return $api.get(`/users/${userId}`)
    }

    static async editUserInfo(user) {
        return $api.put(`/user`, {
            username: user.username,
            country: user.country,
            city: user.city,
            biography: user.biography,
        })
    }

    static async changeBirthday(date) {
        return $api.put(`/user`, {
            birthday: date
        })
    }

    static async changeTag(tag) {
        return $api.put(`/user`, {
            tag: tag
        })
    }

    static async getAllUsers(page = 0, pageSize = 7) {
        return $api.get(`/users?page=${page}&pageSize=${pageSize}`)
    }

    static async follow(userId) {
        return $api.put(`/users/${userId}/follow`)
    }

    static async unfollow(userId) {
        return $api.put(`/users/${userId}/unfollow`)
    }

    static async searchUsers(text) {
        return $api.get(`/search?text=${text}`)
    }
}