const Router = require("express").Router
const postController = require("../controllers/post-controller")

const router = new Router()
const {auth, authAndAdmin, checkId} = require("../middlewares/auth-middleware")

router.post("/post", auth, postController.createNewPost)
router.put("/post/:id", auth, postController.updatePostById)
router.delete("/post/:id", auth, postController.deletePostById)
router.put("/post/:id/like", auth, postController.likePost)
router.get("/post/:id", postController.getPostById)
router.get("/posts/:userId", checkId, postController.getPostsByUserId)
router.get("/posts/timeline/all", auth, postController.getTimelinePost)

module.exports = router