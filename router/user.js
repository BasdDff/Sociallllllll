const Router = require("express").Router
const userController = require("../controllers/user-controller")

const router = new Router()
const {body} = require("express-validator")
const {auth, authAndAdmin} = require("../middlewares/auth-middleware")

router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)
router.get("/user", auth, userController.getUser)

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 16}),
    userController.registration)
router.post("/Login", userController.login)
router.post("/logout", userController.logout)

router.put("/user", auth, userController.updateUser)
router.delete("/users/:id", userController.deleteUser)
router.get("/users/:id", userController.getUserById)
router.get("/users", userController.getAllUsers)
router.put("/users/:id/follow", auth, userController.followUser)
router.put("/users/:id/unfollow", auth, userController.unfollowUser)
router.get("/search", userController.search)
//shop
// router.get("/shop/queryUsers", userController.getAllUsers)
router.get("/usersStats", userController.getUsersStats)

module.exports = router