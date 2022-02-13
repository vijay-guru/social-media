const router=require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

//_____UPDATE_____
router.put('/:id',async(req,res)=>{
     if(req.body.userId===req.params.id || req.body.isAdmin){
         if(req.body.password){
             try {
                 const salt=await bcrypt.genSalt(10);
                 req.body.password =await bcrypt.hash(req.body.password,salt);
             } catch (error) {
                 res.status(500).json(error);
             }
         }
         try {
             const user = await User.findByIdAndUpdate(req.params.id,{
                 // $set : automatically set all the value to reqbody
                 $set:req.body,
             });
             res.status(200).json("Account updated successfully")
         } catch (error) {
            res.status(500).json(error);
         }
     }else{
         res.status(403).json("You can update only your accont")
     }
})

//____DELETE____
router.delete('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted successfully")
        } catch (error) {
           res.status(500).json(error);
        }
    }else{
        res.status(403).json("You can delete only your accont")
    }
})

//_____GET_A_USER_____
router.get('/',async(req,res)=>{
        const userId=req.query.userId;
        const username=req.query.username;
    try {
        const user= userId ? await User.findById(userId) : await User.findOne({username: username})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
})
//_____GET_FRIENDS_____
router.get('/friends/:userId', async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(
            user.following.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        let friendList=[];
        friends.map((friend)=>{
          const {_id,username,profilePicture}=friend;
          friendList.push({_id,username,profilePicture});
        })
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
})
//_____FOLLOW_____
router.put('/:id/follow',async(req, res)=>{
    if(req.body.userId!==req.params.id){
       try {
           const user= await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(!user.followers.includes(req.body.userId)){
             await user.updateOne({$push:{followers:req.body.userId}})
             await currentUser.updateOne({$push:{following:req.params.id}})
             res.status(200).json("User has been followed");
           }
           else{
            res.status(403).json("You already followed this account")
           }
       } catch (error) {
           
       }
    }
    else{
        res.status(403).json("You cant follow yourself")
    }
})

//_____UNFOLLOW_____
router.put('/:id/unfollow',async(req, res)=>{
    if(req.body.userId!==req.params.id){
       try {
           const user= await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(user.followers.includes(req.body.userId)){
             await user.updateOne({$pull:{followers:req.body.userId}})
             await currentUser.updateOne({$pull:{following:req.params.id}})
             res.status(200).json("User has been unfollowed");
           }
           else{
            res.status(403).json("You doesnt follow this user");
           }
       } catch (error) {
           
       }
    }
    else{
        res.status(403).json("You cant unfollow yourself")
    }
})

module.exports = router