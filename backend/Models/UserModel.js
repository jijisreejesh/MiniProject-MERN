const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true,trim:true}
})
const userModel=mongoose.model('LoginDetails',userSchema)
module.exports=userModel;