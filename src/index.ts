import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001 ;

const mongodbConnect = process.env.MONGODB_URI || "default-mongodb-uri";


mongoose.connect(mongodbConnect).then(() => {
  console.log("Connected to MongoDB");
}).catch((err)=>
  console.log(err)
);
app.listen(port, () => {
  console.log(`Ecom app listening on port ${port}!`);
})