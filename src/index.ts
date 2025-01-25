import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from './routes/productRoute'  ; 
dotenv.config();

const app = express();
const port = 3001 ;
app.use(express.json());
const mongodbConnect = process.env.MONGODB_URI || "default-mongodb-uri";


app.use('/user',userRoute)
app.use('/product', productRoute)


mongoose.connect(mongodbConnect).then(() => {
  console.log("Connected to MongoDB");
}).catch((err)=>
  console.log(err)
);
seedInitialProducts();

app.listen(port, () => {
  console.log(`Ecom app listening on port ${port}!`);
})