const express=require("express")
const app=express()
require("dotenv").config()
const PORT=process.env.PORT||5000
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require('cors')
const { connection } = require("./Config/db");
const { UserModel } = require("./Model/user.model");
const { autnentaction } = require("./MIddlware/auth.middleware");
const { ProjectModel } = require("./Model/project.module");
app.use(cors())
app.use(express.json())
 
app.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email})
     if(user){
          res.send({"msg":"User Already Registered "})
     }
     else{
        bcrypt.hash(password,2, async(err,hash)=>{
            if(err){
                res.send({"msg":"Error in Signup"})
            }
            const newuser=new UserModel({
                email:email,
                password:hash
            })
            await newuser.save()
            res.send({"msg":"Sign Up Sucessfull"})
        })
     }
  
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email})
    console.log(user);
     const hash=user.password
     bcrypt.compare(password,hash,async(err,result)=>{
        if(result){
            const token=jwt.sign({email:email},process.env.SECRET_KEY)
            res.send({"msg":"Login Sucess","token":token})
        }else{
            res.send({"msg":"Login Failed"})
        }
     })
})
  
app.get("/",async(req,res)=>{
      const result=await ProjectModel.find()
      res.send(result)
})
app.post("/addproject",autnentaction,async(req,res)=>{
     const data=req.body
      await ProjectModel.insertMany(data)
      res.send({"msg":"Project Added"})
})
app.delete("/project/:id", autnentaction,async (req, res) => {
    const { id } = req.params;
    await ProjectModel.deleteOne({ _id: id });
    res.send({"msg":"Project Deleted"});
});
app.put("/project/:id",autnentaction,async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    await TodoModel.deleteOne({_id: id });
    await TodoModel.insertMany(data);
    res.send({"msg":"Data Updated"});
  });



app.listen(PORT,async()=>{
    try{
      await connection
      console.log("Connection Sucess");
    }catch(err){
        console.log(err);
        console.log("Error in Connection");
    }
})




