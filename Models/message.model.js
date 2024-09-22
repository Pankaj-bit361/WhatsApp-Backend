


const mongoose = require(`mongoose`)
const MessageSchema=mongoose.Schema({
  receiverId:{type:String},
  senderId:{type:String},
  type:{type:String},
  conversationId:{type:String},
  text:{type:String}

},{
    versionKey:false,
    timestamps:true
})

const MessageModel=mongoose.model("message",MessageSchema)

module.exports={
    MessageModel
}