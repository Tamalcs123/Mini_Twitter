
const router = require("express").Router();
const userController=require("../controllers/userController")
const auth=require("../middleware/auth")

//follow a user

router.put("/:id/follow",auth,userController.followUser );

//unfollow a user

router.put("/:id/unfollow",auth, userController.unfollowUser);

module.exports = router;
