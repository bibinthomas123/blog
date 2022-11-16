const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const CatRoute = require("./routes/category");
const multer = require("multer");

env.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to database"))
  .catch((err) => {
    console.log("Error", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, "hello.jpeg");
  },
});

const upload =multer(
  {storage:storage}
  )
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file has been uploaded")
})
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CatRoute);

app.listen(5000, () => {
  console.log("Backend is running");
});
