const Router = require("express").Router
const communityController = require("../controllers/community-controller")

const router = new Router()

router.post("/community", communityController.createNewCommunity)
router.get("/community/:id", communityController.getCommunityById)
router.get("/communities", communityController.getAllCommunities)
router.put("/community/:id", communityController.updateCommunityById)
router.delete("/community/:id", communityController.deleteCommunityById)

module.exports = router