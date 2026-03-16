const mongoose=require('mongoose');
const complaint=mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["pending","resolved"],
    default:"pending",
},
category:{
type:String,
    enum: ["Garbage", "Road", "Water", "Electricity", "Others"],

},
image:{
    type:String
},
locality:{
type:String,
},
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"user"
},
createdAt:{
type:Date,
default:Date.now,
},
count:{
    type:Number,
    default:0
}
});

module.exports=mongoose.model("complaint",complaint);