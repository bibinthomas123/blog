// const { ConnectionStates } = require("mongoose")
const User = require("../model/user")

const Router = require("express").Router()

//user creation 
Router.post("/",async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.create({email,password})
        console.log(user)
        await user.generateAuthToken()
        res.status(201).json(user)

    }catch(error){
        let msg
        if(error.code==11000){
            msg="email already exists"
        }else{
            msg = error.message
        }
        res.status(400).json(msg)
    }
})


//login

Router.post("/login",async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await user.findByCredentials(email,password)
        await user.generateAuthToken()
        res.json(user)
        console.log(user)

    }catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = Router;