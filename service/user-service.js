const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")

class UserService {
    async registration(email, password, username) {
        const candidate = await UserModel.findOne({email})
        if (candidate) { //если кандидат не равен null, тогда запрещаем регистрацию
            throw new Error(`Пользователь с почтой ${email} уже существует`)
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuid.v4()

            const user = await UserModel.create({email, password: hashPassword, activationLink, username})
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto._id, tokens.refreshToken)
            return {
                ...tokens,
                user: userDto
            }
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest(`Некоректная ссылка активации`)
        } else {
            user.isActivated = true
            await user.save()
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с таким email не найден`)
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        } else {
            const userData = tokenService.validateRefreshToken(refreshToken)
            const tokenFromDb = /*await*/ tokenService.findToken(refreshToken)
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError()
            } else {
                const user = await UserModel.findById(userData._id)
                const userDto = new UserDto(user)
                const tokens = tokenService.generateTokens({...userDto})
                await tokenService.saveToken(userDto._id, tokens.refreshToken)
                return {
                    ...tokens,
                    user: userDto
                }
            }
        }
    }

    async updateUser(password) {
        const salt = await bcrypt.genSalt(10)
        const saltPassword = await bcrypt.hash(password, salt)
        return saltPassword
    }

    async updateUserInfo(user, body) {
        return await user.updateOne({$set: body})
    }

    async getUserEditById(id) {
        return UserModel.findById(id)
    }

    async getUserById(paramsId) {
        const user = await UserModel.findById(paramsId)
        const userDto = new UserDto(user)
        return {
            ...userDto
        }
    }

    async getUserByIdFollow(paramsId) {
        return await UserModel.findById(paramsId)
    }

    async findAllCommunities(page, pageSize) {
        let countSkip = page * pageSize
        return UserModel.find().skip(countSkip).limit(parseInt(pageSize))
    }

    async totalCountCommunities() {
        return (await UserModel.collection.stats()).count
    }

}

module.exports = new UserService()