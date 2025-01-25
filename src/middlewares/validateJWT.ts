import { NextFunction ,Request, Response} from "express";
import jwt  from "jsonwebtoken";
import userModel, { IUser } from "../models/userModel";



interface ExtendRequest extends Request {
    user? : any
}

const validateJWT =  (req: ExtendRequest , res: Response, next  : NextFunction )=> { 
const authorizationHeader = req.get('authorization'); 
if(!authorizationHeader ){
    res.status(403).send("Authorization header is missing");
    return ;
}
const bearerToken =  authorizationHeader.split(' ')[1];
if(!bearerToken){
    res.status(403).send("Bearer token is missing");
return ;
}

jwt.verify(bearerToken , process.env.JWT_SECRET || "" ,async (err , payload )=>  {
if(err){
    res.status(403).send("Invalid token");
    return ;
}
if(!payload){
    res.status(403).send("Invalid token payload");
    return ;

}
const userPayload = payload as {email : string, firstName : string, lastName : string};

const user = await  userModel.findOne({email : userPayload.email});    
req.user = user ; 
next();
})

}

export default validateJWT ; 