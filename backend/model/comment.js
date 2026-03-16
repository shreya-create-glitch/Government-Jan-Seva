const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    user:{
    type:mongoose.Schema.Types.ObjectId,ref:"user",required:true
    },
    complaint:{
        type:mongoose.Schema.Types.ObjectId,ref:"complaint",required:true
    },
},{timestamps:true});
module.exports=mongoose.model("comment",commentSchema);