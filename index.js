const express=require("express")
const { connection } = require("./Config/db")
const { TodoModel } = require("./Model/todo.module")
const app=express()
require("dotenv").config()
const PORT=process.env.PORT||5000
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const { UserModel } = require("./Model/user.module")
const expressip = require('express-ip');
const { authentaction } = require("./Middleware/auth.middleware")
app.use(expressip().getIpInfoMiddleware);
app.use(cors())
app.use(express.json())


app.post("/signup",async(req,res)=>{
     const {email,password}=req.body
     const user=await UserModel.findOne({email})
     if(user){
        res.send({"msg":"User already register"})
     }else{
        bcrypt.hash(password,2,async(err,hash)=>{
            const newuser=new UserModel({
                email:email,
                password:hash,
                ip:req.ipInfo.ip
            })
            await newuser.save()
            res.send({"msg":"Sign up sucessfull"})
        })
     }
})
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email:email})
    const hash=user.password
    bcrypt.compare(password,hash,async(err,result)=>{
        if(result){
            const token=jwt.sign({email},process.env.SECRET_KEY)
            res.send({"msg":"Login Sucess",token:token})
        }else{
            res.send({"msg":"LogIn Failed"})
        }
    })
})

app.get("/todos",authentaction,async(req,res)=>{
     const {email}=req.body
     const result=await TodoModel.find({email})
     res.send(result)
     
})
app.post("/todos/add",authentaction,async(req,res)=>{
     const {email}=req.body
     console.log(email);
     const {taskname,status,tag}=req.body
    
     const result=new TodoModel({
         taskname,
         status,
          tag,
         email:email
     })
     await result.save()
     res.send({"msg":"Todo Added"})
})
app.delete("/todos/:id",  async (req, res) => {
    const { id } = req.params;
    await TodoModel.deleteOne({ _id:id });
    res.send("Delete Sucess");
  });

  app.patch("/todos/:id",  async (req, res) => {
    const { id } = req.params;
    const {status}=req.body
    await TodoModel.updateOne({ _id: id },{$set:{status:status}});
    res.send("update Sucess");
  });









app.listen(PORT,async()=>{
    try{
        await connection
        console.log("Connection sucess");
    }catch(err){
        console.log(err);
        console.log("Error in connection");
    }
})