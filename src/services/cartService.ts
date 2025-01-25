import { cartModel } from "../models/cartModel";

interface CreateCartForUser { 
    userId : string ; 

}

const createCartForUser  = async ({userId }: CreateCartForUser )=>{
const cart = await cartModel.create({userId}); 
await  cart.save();
return cart ; 
}


export const getActiveCartForUser =async ({userId}: CreateCartForUser)=>{
let cart = await cartModel.findOne({userId, status:"active"}); 
if(!cart){
    cart = await createCartForUser({userId})  ; 
}

return cart ; 

}
