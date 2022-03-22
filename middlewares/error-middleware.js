const ApiError = require("../exceptions/api-error")

module.exports = function (error, request, response, next) {
    console.log("ERROR")
    if (error instanceof ApiError) {
        return response.status(error.status).json({
            message: error.message, errors: error.errors 
        })
    } else {
        return response.status(500).json({message: `Произошла неопределенная ошибка`})
    }
}