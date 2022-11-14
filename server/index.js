import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRouter from "./routes/post.js"

const app = express();

app.use("/posts",postRouter)
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//mongodb

const URL = `mongodb+srv://admin:admin@blogdata.tkze99t.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
      console.log("The server is running at port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to server ", err.message);
  });



