const Post=require("../models/Post");
const User=require("../models/User")

//create post

const createPost=async(req,res)=>{
    const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
}

// update post

const updatePost=async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

// delete post

const deletePost=async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.deleteOne();
          res.status(200).json("the post has been deleted");
        } else {
          res.status(403).json("you can delete only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

// get timeline post

const timeLinePost=async(req,res)=>{
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.json(userPosts.concat(...friendPosts))
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports={createPost,updatePost,deletePost,timeLinePost}