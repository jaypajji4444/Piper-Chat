const {model,Schema} = require("mongoose")

const MessageSchema = new Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const ConversationSchema = new Schema({
    recipents:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[MessageSchema],
    lastMessage: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    },
})

module.exports=model("Conversation",ConversationSchema)