const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const userModel=require('../Models/UserModel');
const jwt = require('jsonwebtoken');

router.post('/',async (req,res) => {
    try{
    let {name,email,password}=req.body
    const userExist=await userModel.findOne({email});
    if(userExist)
    {
        return res.send('User already exists');
    }
    let hashedPassword=await bcrypt.hash(password,10);
    let details=await userModel.create({name,email,password:hashedPassword});
    res.status(200).json({Message:"Registration successful"})
    }
    catch(err){
        res.status(400).json({Message:`Error : ${err}`})
    }
})
   
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email})
        if(!user)
            return res.send('mismatch');
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) 
            return res.send("password mismatch")
     let id=user._id;
     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'});
     res.json({ token,id });
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
})

router.get("/home",(req,res)=>{
  const token=req.headers["authorization"];
  if(!token) return res.status(403).json({message : "Token required"})
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
  if(err) return res.status(403).json({message : "Invalid token"})
    //proceed if token is valid
  let name=decoded.email.split('@')[0]
  res.status(200).json({message:`Welcome Home , ${name}`})
  })

})
module.exports=router;