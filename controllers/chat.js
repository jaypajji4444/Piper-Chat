const asyncHandler = require('../middleware/async');
// Model

const Conversation = require("../models/Conversations");

exports.create=asyncHandler(async (req,res,next)=>{
    const {to,from,message} = req.body;
    let messageBody={
        to,from,body:message
    }
    
    let conversation= await Conversation.findOneAndUpdate(
        {
            recipents: {
                $all: [from,to],
            },
        },
        {
            recipents: [from,to],
            $push:{messages:messageBody},
            lastMessage: message,
            date: Date.now(),
            
        },
        { upsert: true, new: true, setDefaultsOnInsert: true })
    
    return res.status(200).json(conversation)
})

exports.conversations=asyncHandler(async(req,res,next)=>{
    const conversations = await Conversation.find({})
    return res.status(200).json(conversations)
})
