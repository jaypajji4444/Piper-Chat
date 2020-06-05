const {model,Schema} = require("mongoose")

const ConversationSchema = new Schema({
    recipents:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }],
    lastMessage: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    },
})

module.exports=model("Conversation",ConversationSchema)