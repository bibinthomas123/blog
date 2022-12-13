const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    about:{
      type:String,
      required:false
    },
    following:{
      type: Array,
      required:false
    },
    profilePic: {
      type: String,
      default: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
