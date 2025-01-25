import mongoos,  {Schema , Document } from "mongoose";    

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
 
}