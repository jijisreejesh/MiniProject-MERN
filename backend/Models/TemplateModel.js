const mongoose=require('mongoose');
const templateSchema=mongoose.Schema({
   templateId:{type:String,requires:true},
   userId:{type:String,requires:true},
    name:{type:String,required:true,trim:true},
    job:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    phone:{type:String,required:true,trim:true},
    address:{type:String,required:true,trim:true},
    jobDesc:{type:String,required:true,trim:true},

    workDesc:{type:String,required:true,trim:true},
    service1:{type:String,required:true,trim:true},
    service2:{type:String,required:true,trim:true},
    service3:{type:String,required:true,trim:true},
    serviceDesc1:{type:String,required:true,trim:true},
    serviceDesc2:{type:String,required:true,trim:true},
    serviceDesc3:{type:String,required:true,trim:true},

    about:{type:String,required:true,trim:true},
})
const templateModel=mongoose.model('templateDetails',templateSchema)
module.exports=templateModel;