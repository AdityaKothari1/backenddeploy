const jwt=require("jsonwebtoken")
require("dotenv").config()

const authentaction=async(req,res,next)=>{
    const token=req.headers?.authorization
    try{
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    console.log(decoded);
    const {email}=decoded
    req.body.email=email
    next()
    }catch(err){
          console.log(err);
          res.send({"msg":"Please Login Again"})
    }
}
module.exports={authentaction}