const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({

  email:{
    type: "string",
    required:[true, "can't be blank "],
    unique: true,
    match:[/\S+@\S+\.\S+/,"email is invaid"],
    index: true

  },
  password:{
    type: "string",
    required:[true, "can't be blank "],
    minlength: 6,

  },
  tokens:[],

  articles:[]

})

UserSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) return next();
//if user is being created or updated
        bcrypt.genSalt(10,function(err,salt){
            if (err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if (err) return next(err)

                user.password = hash
                next()
            })
    })
})
    
UserSchema.methods.generateAuthToken= async function(){

  const user = this 
  console.log("user is",user)
  const token = jwt.sign({ _id:user._id.toString()},"secertetetet")
  console.log(token)
  user.tokens = user.token.concat({token})
  await user.save()
  return
}

UserSchema.statics.findByCredentials = async function(email,password){
  const user = await User.findOne({email})
  if(!user) throw new Error("Invalid email or password")

  const ismatch = await bcrypt.compare(password,user.password)
  if(!ismatch)  throw new Error("Invalid email or password")
  //if matched
  return user;
}

const User = mongoose.model("User",UserSchema)

module.exports = User
        