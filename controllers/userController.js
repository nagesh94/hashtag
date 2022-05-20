const catchAsync = require('../utils/catchAsync')
const Users=require('./../modals/usersModal')

exports.getAlluser=catchAsync(async(req,res,next)=>{
    const users=await Users.find()
    res.status(200).json({
        status:"success",
        users
    })
})

exports.createUser=catchAsync(async (req,res,next)=>{
    const user=await Users.create(req.body)
    res.status(200).json({
        status:"success",
        user
    })
})

exports.getloggedUser=catchAsync(async (req,res,next)=>{
    const user=await Users.findById(req.currentUser._id)
    res.status(200).json({
        status:"success",
        user
    })
})
exports.getUser=catchAsync(async (req,res,next)=>{
    const user=await Users.findById(req.params.id)
    res.status(200).json({
        status:"success",
        user
    })
})
exports.updateUserbyId=catchAsync(async (req,res,next)=>{
    const user=await Users.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        status:"success",
        user
    })
})
exports.updateUser=catchAsync(async (req,res,next)=>{

    console.log(req.body)
  
    const receiver=await Users.findOne({email:req.body.to})
    receiver.updateReceivedMsg(req.body)
    receiver.save()
    
    const sender=await Users.findOne({email:req.body.from})
    sender.updateSentMsg(req.body)
    sender.save()

    res.status(200).json({
        status:"success",
        sender,
        receiver
    })
})