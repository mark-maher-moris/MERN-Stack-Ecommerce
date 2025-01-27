import express from "express" ; 
import { addItemToCart, checkout, clearCart, getActiveCartForUser, removeItemFromCart, updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();


router.get('/', validateJWT,async (req :ExtendRequest, res )=> {
     const userId = req.user!._id;
const cart = await  getActiveCartForUser({userId  });
res. status (200).send (cart); 
})


router.post('/items', validateJWT,async (req :ExtendRequest, res )=> {
   const userId = req.user!._id;
   const {productId , quantity} = req.body;
   const response = await addItemToCart({userId ,productId , quantity} );
   res.status(response.statusCode).send(response.data);
})


router.put ('/items', validateJWT , async (req :ExtendRequest, res )=> {
const userId = req.user!._id;
const {productId , quantity} = req.body;
const response = await updateItemInCart({userId , productId , quantity});
res.status(response.statusCode).send(response.data);
})


router.delete ('/items/:productId', validateJWT , async (req :ExtendRequest, res )=> {
    const userId = req.user!._id;   
    const {productId} = req.params;
    const response = await removeItemFromCart({userId , productId});
    res.status(response.statusCode).send(response.data);
})


router.delete ('/', validateJWT , async (req :ExtendRequest, res )=> {
    const userId = req.user!._id;   
    const response = await clearCart({userId});
    res.status(response.statusCode).send(response.data);
})


router.post ('/checkout', validateJWT , async (req :ExtendRequest, res )=> {
    const userId = req.user!._id; 
    const {address} = req.body.address;
    const response = await checkout({userId,address});  
    res.status(response.statusCode).send(response.data);
})



 export default router  ; 



