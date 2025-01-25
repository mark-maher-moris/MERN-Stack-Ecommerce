import express from "express";
import { register } from "../services/userService";

const router = express.Router(); 





router.post('/register',async (request , response )=>{
    const {lastName , firstName , email , password} = request.body;
    const {statusCode , data} =await register({firstName , lastName , email , password});
    response.status(statusCode).send(data); 
})
export default router;  