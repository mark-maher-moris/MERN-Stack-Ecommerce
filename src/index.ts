import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3001 ;
const mongodbConnect = "mongodb+srv://markmaher933:i2F178W1MiH1JR1O@cluster0.q09lw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodbConnect).then(() => {
  console.log("Connected to MongoDB");
}).catch((err)=>
  console.log(err)
);
app.listen(port, () => {
  console.log(`Ecom app listening on port ${port}!`);
})