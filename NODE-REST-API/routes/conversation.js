const router=require('express').Router();
const Coversation = require('../models/Coversation');
//_____NEW_CONVO_____

router.post('/',async (req,res)=>{
    const newConversation = new Coversation({
       members: [req.body.senderId,req.body.receiverId],
    });
    try {
        const savedConversation =await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

//_____GET_A_CONVO_____

router.get('/:userId',async (req,res)=>{
    try {
        const conversation = await Coversation.find({
            members:{$in:req.params.userId}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router