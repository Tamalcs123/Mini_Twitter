const User=require("../models/User")

// follow a user

const followUser=async(req,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          if(!user){
            return res.status(404).json({message:"user not found"})
          }
          const currentUser = await User.findById(req.body.userId);
          if(!currentUser){
            return res.status(404).json({message:"user not found"})
          }
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
}

//unfollow 

const unfollowUser=async(req,res)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          if(!user){
            return res.status(404).json({message:"user not found"})
          }
          const currentUser = await User.findById(req.body.userId);
          if(!currentUser){
            return res.status(404).json({message:"user not found"})
          }
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
}

module.exports={followUser,unfollowUser}