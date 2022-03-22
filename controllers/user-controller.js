const userService = require("../service/user-service")
const {validationResult} = require("express-validator")
const ApiError = require("../exceptions/api-error")
const UserModel = require("../models/user-model")
const UserDto = require("../dtos/user-dto")

class UserController {

    async registration(request, response, next) {
        try {
            const errors = validationResult(request) //автоматически достанется тело(body) и провалидируются поля
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(`Ошибка при валидации`, errors.array()))
            }
            const {email, password, username} = request.body
            const userData = await userService.registration(email, password, username)
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            //response.status(200).json("Пользователь создан")
            return response.json(userData)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async login(request, response, next) {
        try {
            const {email, password} = request.body
            const userData = await userService.login(email, password)
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return response.json(userData)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async logout(request, response, next) {
        try {
            const {refreshToken} = request.cookies
            const token = await userService.logout(refreshToken)
            response.clearCookie("refreshToken")
            return response.json(token)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async activate(request, response, next) {
        try {
            const activationLink = request.params.link
            await userService.activate(activationLink)
            return response.redirect(process.env.CLIENT_URL)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async refresh(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            const userData = await userService.refresh(refreshToken);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return response.json(userData);
        } catch (error) {
            response.status(401).json(error)
        }
    }

    async getUser(request, response, next) {
        try {
            return response.json(request.user)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getUserById(request, response, next) {
        try {
            const userData = await userService.getUserById(request.params.id)
            return response.json(userData);
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async updateUser(request, response, next) {
        try {
            if (request.body.password) {
                try {
                    request.body.password = await userService.updateUser(request.body.password)
                } catch (error) {
                    return response.status(500).json(error)
                }
            }
            try {
                const user = await userService.getUserEditById(request.user._id)
                await userService.updateUserInfo(user, request.body)
                const updatedUser = await userService.getUserEditById(request.user._id)
                response.status(200).json({message: "Account has been updated", user: updatedUser})
            } catch (error) {
                response.status(500).json(error)
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }


    async deleteUser(request, response, next) {
        try {
            if (request.body.userId === request.params.id || request.body.role === "admin") {
                try {
                    await UserModel.findByIdAndDelete(request.params.id)
                    response.status(200).json("Account has been deleted")
                } catch (error) {
                    return response.status(500).json(error)
                }
            } else {
                return response.status(403).json("You can delete only your account")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async getAllUsers(request, response) {
        try {
            const page = request.query.page
            const pageSize = request.query.pageSize
            const users = await userService.findAllCommunities(page, pageSize)
            let usersDto = []
            for (let i = 0; i < users.length; i++) {
                usersDto.push(new UserDto(users[i]))
            }
            const totalCount = await userService.totalCountCommunities()
            return response.status(200).json({users: usersDto, totalCount: totalCount})
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    async followUser(request, response, next) {
        try {
            if (request.user._id !== request.params.id) {
                try {
                    const user = await userService.getUserByIdFollow(request.params.id)
                    const currentUser = await userService.getUserByIdFollow(request.user._id)
                    if (!user.followers.includes(request.user._id)) {
                        //оператор $push добавляет указанное значение в массив
                        await user.updateOne({$push: {followers: request.user._id}})
                        await currentUser.updateOne({$push: {followings: request.params.id}})
                        response.status(200).json("User has been followed")
                    } else {
                        response.status(403).json("You already follow this user")
                    }
                } catch (error) {
                    response.status(500).json(error)
                }
            } else {
                response.status(403).json("You can not follow yourself")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async unfollowUser(request, response, next) {
        try {
            if (request.user._id !== request.params.id) {
                try {
                    const user = await userService.getUserByIdFollow(request.params.id)
                    const currentUser = await userService.getUserByIdFollow(request.user._id)
                    if (user.followers.includes(request.user._id)) {
                        //оператор $pull удаляет из существующего массива все экземпляры, которые соответствуют заданному условию.
                        await user.updateOne({$pull: {followers: request.user._id}})
                        await currentUser.updateOne({$pull: {followings: request.params.id}})
                        response.status(200).json("User has been unfollowed")
                    } else {
                        response.status(403).json("You do not follow this user")
                    }
                } catch (error) {
                    response.status(500).json(error)
                }
            } else {
                response.status(403).json("You can not unfollow yourself")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

    // async getAllUsers(request, response) {
    //     const query = request.query.new
    //     console.log(query)
    //     try {
    //         const users = query
    //             ? await UserModel.find().sort({_id: 1}).limit(query)
    //             : await UserModel.find()
    //         response.status(200).json(users)
    //     } catch (error) {
    //         response.status(500).json(error)
    //     }
    // }

    async getUsersStats(request, response) {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {
            const data = await UserModel.aggregate([
                {$match: {createdAt: {$gte: lastYear}}},
                {
                    $project: {
                        month: {$month: "$createdAt"}
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: 1}
                    }
                }
            ])
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json(error)
        }
    }

    async search(request, response) {
        try {
            const text = request.query.text
            if (text) {
                const users = await UserModel.find({"username": {"$regex": `^${text}`, '$options': 'i'}})
                response.status(200).json(users)
            } else {
                response.status(200).json("")
            }
        } catch (error) {
            response.status(500).json(error)
        }
    }

}

module.exports = new UserController()