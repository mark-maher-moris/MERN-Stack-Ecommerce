import e from "express";
import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";
import { parse } from "dotenv";

interface CreateCartForUser { 
    userId : string ; 

}

const createCartForUser  = async ({userId }: CreateCartForUser )=>{
const cart = await cartModel.create({userId,totalAmount : 0 }); 
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

interface AddItemToCart {
    userId : string ; 
    productId : any ; 
    quantity : string 
}


export const  addItemToCart = async ({productId ,quantity ,userId }: AddItemToCart)=>{
    const cart = await getActiveCartForUser({userId});
    const existInCart = cart.items.find((p=> p.product.toString()=== productId ));
if(existInCart){    
    return {data :"Item already exist in cart",statusCode : 400}
}
const product = await productModel.findById(productId);
if(!product){
    return {data :"Product does not exist",statusCode : 400}
}

if(product.stock < parseInt(quantity)){
    return {data :"Product out of stock",statusCode : 400}

}
cart.items.push({product : productId,unitPrice : product.price,quantity:parseInt(quantity) });

cart.totalAmount += product.price * parseInt(quantity);

const updateedCart = await cart.save();
return {data : updateedCart,statusCode : 200}   
}



interface UpdateItemToCart {
    userId : string ; 
    productId : any ; 
    quantity : string 
}


export const updateItemInCart= async ({userId , productId , quantity}:UpdateItemToCart)=> {
const cart = await getActiveCartForUser({userId});
const  existsInCart = cart.items.find((p=> p.product.toString()=== productId ));
if(!existsInCart){
    return {data :"Item does not exist in cart",statusCode : 400}
} 

const otherItems = cart.items.filter((p=> p.product.toString()!== productId ));

let total =  otherItems. reduce((sum , product )=> {
    sum += product.unitPrice * product.quantity;
    return sum; 
},0 )
existsInCart.quantity = parseInt(quantity);

total += existsInCart.unitPrice * parseInt(quantity);
cart.totalAmount = total;
 const updateedCart = await cart.save();    
return {data : updateedCart,statusCode : 200}

}

