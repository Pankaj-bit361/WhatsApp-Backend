


const mongoose = require(`mongoose`)
const ChatSchema=mongoose.Schema({
  members:{type:Array},
  messege:{type:String}
},{
    versionKey:false,
    timestamps:true
})

const ChatModel=mongoose.model("chat",ChatSchema)

module.exports={
    ChatModel
}