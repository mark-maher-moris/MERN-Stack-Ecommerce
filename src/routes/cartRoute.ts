import express from "express" ; 
import { getActiveCartForUser } from "../services/cartService";

const router = express.Router();







router.get('/' ,async (req, res )=> {
    //To Do : get user id from JWT
const cart = await  getActiveCartForUser({userId  : "xxxx"});
res. status (200).send (cart); 
})


 export default router  ; 


