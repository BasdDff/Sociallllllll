module.exports = class ApiError extends Error {

    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    } 

    //static функции можно использовать не создавая объект класса
    static UnauthorizedError() {
        return new ApiError(401, `Пользователь не авторизован`)
    }

    //пользователь указал не правильные параметры, не прошел валидацию
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

}