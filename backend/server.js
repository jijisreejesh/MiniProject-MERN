require('dotenv').config();
const express=require("express");
const cors=require('cors');
const mongoose=require("mongoose");
const multer=require('multer');
const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary")
const app=express();
const PORT=process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URL)
.then((res)=>{
    console.log("Connected Successfully"); 
})
.catch((err)=>{
    console.log('Server Connection Error');
    
})


//configure cloudinary
cloudinary.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

//configure multer storage cloudinary
const storage=new CloudinaryStorage({
  cloudinary,
  params:{
      folder:'mini_project_images',
      format:async(req,res)=>"png",
      public_id:(req,res)=>File.fieldname+"_"+Date.now(),
      transformation:[{
          width:800,
          height:600,
          crop:"fill",
      }
      ]
  }
})

//configure multer
const upload=multer({
  storage,
  limits:1024*1020*5,//5MB limit
  fileFilter:function(req,file,cb){
      if(file.mimetype.startsWith("image/")){
          cb(null,true);

      }
      else{
          cb(new Error("Not an image! Please upload an image",false))
      }
  }
})
 module.exports=upload;

const userRouter=require('./Routes/UserRoutes');
app.use('/api/users',userRouter)

const templateRouter=require('./Routes/TemplateRoutes');
app.use('/api/templates',templateRouter);

const uploadRouter=require('./Routes/UploadRoutes');
app.use('/api/uploads',uploadRouter);

app.listen(PORT,()=>{
    console.log("Server Connected with "+PORT);
    
})