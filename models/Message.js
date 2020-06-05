const {model,Schema} = require("mongoose");

const MessageSchema = new Schema({
    conversation:{
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
})

module.exports=model("Message",MessageSchema)