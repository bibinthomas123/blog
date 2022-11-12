const mongoose = require("mongoose")
data=require("dotenv").config()


URL =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blogdata.tkze99t.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL,()=>{
     try{
        console.log("Connected to MongoDB");
        console.log("db connected");
     }catch(e){
        console.log(e)
     }
})