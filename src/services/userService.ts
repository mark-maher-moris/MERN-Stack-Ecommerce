import e from "express";
import userModel from "../models/userModel";
import bycrypt from "bcrypt"

interface RegisterParams {
    firstName : string ; 
lastName : string ;
email : string ;
password : string ;
}

export const register =async ({firstName, lastName, email, password}: RegisterParams)=>  {
const findUser = await userModel.findOne({email :email});
if(findUser ){
    return {data :  "user already exist",statusCode: 400}

}
const bcryptPassword = await bycrypt.hash(password,10);
const newUser = new userModel({firstName, lastName,email ,password :bcryptPassword});
await newUser.save();
return {data :  newUser,statusCode: 200}
}

interface LoginParams {
    email : string ;    
password : string ;

}
export const login = async ({email ,password}:LoginParams ) => {
const findUser = await userModel.findOne({email});
if(!findUser){
    return {data : "user does not exist",statusCode: 400}
}
const passwordMatch  =bycrypt.compare(password,findUser.password);
if(!passwordMatch){
    return {data :  "password is incorrect",statusCode: 400}
}
return {data :  findUser,statusCode: 200}
}