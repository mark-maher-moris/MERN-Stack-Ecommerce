import e from "express";
import userModel from "../models/userModel";

interface RegisterParams {
firstname : string ; 
lastname : string ;
email : string ;
password : string ;
}

export const register =async ({firstname, lastname, email, password}: RegisterParams)=>  {
const findUser = await userModel.findOne({email :email});
if(findUser ){
    return {error : {message : "user already exist"}}
}

const newUser = new userModel({firstname, lastname,email ,password});
await newUser.save();
return newUser;
}
interface LoginParams {
    email : string ;    
password : string ;

}
export const login = async ({email ,password}:LoginParams ) => {
const findUser = await userModel.findOne({email});
if(!findUser){
    return {error : {message : "user does not exist"}}
}
const passwordMatch  =password === findUser.password;
if(!passwordMatch){
    return {error : {message : "password is incorrect"}}
}
return findUser;
}