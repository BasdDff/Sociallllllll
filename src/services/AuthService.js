import $api from "../http/index";

export default class AuthService {
    static async login(email, password) {
        return $api.post("/Login", {email, password})
    }

    static async registration(email, password, username) {
        return $api.post("/registration", {email, password, username})
    }

    static async logout() {
        return $api.post("/logout")
    }
}