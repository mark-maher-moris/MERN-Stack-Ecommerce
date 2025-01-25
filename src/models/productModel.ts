import mongoose, {Schema, Document } from "mongoose" ; 


interface IProduct extends Document{
name: string, 
price: number, 
quantity: number,
description: string,
category: string,
image: string,
stock: number
}

const productSchema  = new Schema<IProduct> ({
    name : { type : String },
    price : {type: Number,required:  true },
        quantity : {type : Number}, 
        description : {type : String},
        category : {type : String},
        image : {type : String},
        stock : {type : Number, default : 0},
});


export default mongoose.model<IProduct>("Product", productSchema);