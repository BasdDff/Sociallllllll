const ApiError = require("../exceptions/api-error")
const tokenService = require("../service/token-service")

const auth = function (request, response, next) {
    try {
        const authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        } else {
            const accessToken = authorizationHeader.split(" ")[1] //разбиваем по пробелу массив на 2 слова и по индексу 1(второй элемент) забираем токен
            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            } else {
                const userData = tokenService.validateAccessToken(accessToken)
                if (!userData) {
                    return next(ApiError.UnauthorizedError())
                } else {
                    request.user = userData
                    next()
                }
            }
        }
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}

const authAndAdmin = function (request, response, next) {
    try {
        const authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        } else {
            const accessToken = authorizationHeader.split(" ")[1] //разбиваем по пробелу массив на 2 слова и по индексу 1(второй элемент) забираем токен
            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            } else {
                const userData = tokenService.validateAccessToken(accessToken)
                if (!userData) {
                    return next(ApiError.UnauthorizedError())
                } else {
                    request.user = userData
                    if (userData.role === "admin") {
                        console.log("adminnnnn", userData.role)
                        next()
                    } else {
                        return next(response.status(500).json("You are not alowed to do that!"))
                    }
                }
            }
        }
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}

module.exports = {
    auth,
    authAndAdmin
};