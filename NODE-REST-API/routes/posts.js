const router=require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//_____CREATE__POST_____
router.post('/',async(req,res)=>{
    console.log("came");
    const newPost=new Post(req.body);
    console.log(newPost);
    try {
        const savedPost =await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____UPDATE_A_POST_____
router.put('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("post has been updated")
        }
        else{
            res.status(403).json("You cannot update other's post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____DELETE_A_POST_____
router.delete('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.delete()
            res.status(200).json("post has been deleted")
        }
        else{
            res.status(403).json("You cannot delete other's post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____LIKE/DISLIKE_POST_____
router.put('/:id/like',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("post has been liked")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____GET_A_POST_____
router.get('/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____GET_ALL_TIMELINE_____
router.get('/timeline/:userId', async(req,res)=>{
    try {
        console.log("requested");
        const currentUser = await User.findById(req.params.userId);
        const userPosts= await Post.find({userId:currentUser._id})
        const friendPosts=await Promise.all(
            currentUser.following.map((friendId)=>{
               return Post.find({userId:friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error);
    }
})

//_____GET_A_USER'S_POST_____
router.get('/profile/:username', async(req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username});
        const posts= await Post.find({userId:user._id})
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router