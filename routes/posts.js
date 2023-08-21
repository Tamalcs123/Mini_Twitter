const router = require("express").Router();
const postController=require("../controllers/postController")
const auth=require("../middleware/auth")

//create a post

router.post("/",auth,postController.createPost);
//update a post

router.put("/:id", auth,postController.updatePost);

//delete a post

router.delete("/:id", auth,postController.deletePost);

//get timeline posts

router.get("/timeline/all",auth,postController.timeLinePost);

module.exports = router;
