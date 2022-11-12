const express = require("express")
const app = express()
const cors = require("cors")
const { urlencoded, json } = require("express")
require("./connection")

const userRoutes = require("./routes/userRoutes")

app.use(cors())
app.use(express,urlencoded({extended:true}))
app.use(express,json({extended:true}))
app.use("/users",userRoutes)


app.listen(5000,()=>{
    console.log("listening on port 5000")
})
