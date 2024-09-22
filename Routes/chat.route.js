
const express=require(`express`)
const { ChatModel } = require("../Models/chat.model")
const ChatRouter=express.Router()

ChatRouter.post("/",async(req,res)=>{
    const {recieverId,senderId}=req.body
    const exist =await ChatModel.findOne({members:{$all:[recieverId,senderId]}})
    if(exist){
        res.send(`chat already exist`)
    }else{
        let newchat=new ChatModel({members:[recieverId,senderId]})
        await newchat.save()
        res.send(`chat created successfully`)
    }
})

ChatRouter.get('/singleMessage',async(req,res)=>{
    const {senderId,receiverId} =req.query
    try {
        let chat=await ChatModel.findOne({members:{$all :[receiverId,senderId]}})

        res.json(chat)
    } catch (error) {
        res.send({error:error.message})
    }
})

ChatRouter.post("/conversation",async(req,res)=>{
    const {receiverId,senderId}=req.body
    try {
        let conversation=await ChatModel.findOne({members:{$all:[receiverId,senderId]}})
        res.status(200).send(conversation)
        
    } catch (error) {
        res.status(400).send({err:error.message})
    }
})

module.exports={

    ChatRouter
}