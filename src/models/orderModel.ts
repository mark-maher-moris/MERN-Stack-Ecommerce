import mongoose, { ObjectId, Schema } from "mongoose";

export interface IOrderItem {
    productTitle : string;
    productImage: string;
    unitPrice : number ;
    quantity : number
}



export interface IOrder extends Document {  
    userId : ObjectId|string;
    orderItems : IOrderItem[];
    totalAmount : number;
    address : string;
}


const orderItemSchema = new Schema <IOrderItem>({
    productTitle : {type : String , required : true},
    productImage : {type : String , required : true},
    unitPrice : {type : Number , required : true},
    quantity : {type : Number , required : true},
})


const orderSchema = new Schema<IOrder>({
    userId : {type : Schema.Types.ObjectId , ref : "User" , required : true},
    orderItems : [orderItemSchema],
    totalAmount : {type : Number , required : true},
    address : {type : String , required : true}
})

export const orderModel = mongoose.model<IOrder>("Order", orderSchema);