
const express=require("express")
const { MessageModel } = require("../Models/message.model")
const { ChatModel } = require("../Models/chat.model")
const MessageRouter=express.Router()

MessageRouter.post("/",async(req,res)=>{
 console.log(req.body)
try {
    let message=new MessageModel(req.body)
    await message.save()
    let updatecon= await ChatModel.findByIdAndUpdate(req.body.conversationId,{messege:req.body.text})
    
    res.status(200).send("messege save succesfully")
} catch (error) {
    res.status(400).send({err:error.message,msg:"something went wrong"})
}

    
})


MessageRouter.get("/:id",async(req,res)=>{     
   const {id} =req.params
   console.log(id)
    try {
        let findMessege=await MessageModel.find({conversationId:id})
        res.status(200).send(findMessege)
    } catch (error) {
        res.status(400).send({err:error.message})
    }
})


module.exports={
    MessageRouter
}