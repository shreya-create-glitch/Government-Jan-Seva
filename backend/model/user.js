const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:String,
    email:{
      type:  String,
    required:true
},

    password:{
      type:  String,
    required:true
},
    role:{
        type:String,
        enum:['user','admin'],
        default:"user",
    },

    complaintCount:{
      type:Number,
      default:0,
    },
    badge:{
      type:String,
      enum:['None', 'Bronze', 'Silver', 'Gold', 'Platinum'],
      default:'None',
    }
    
},{timestamps:true})
module.exports=mongoose.model("user",userSchema);