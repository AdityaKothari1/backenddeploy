  const jwt=require("jsonwebtoken")
  require("dotenv").config()

  const autnentaction=async(req,res,next)=>{
     const token=req.headers?.authorization
     try{
      const decoded=jwt.verify(token,process.env.SECRET_KEY)
       const {email}=decoded.email
       req.body.email=email
       next()
     }catch(err){
        console.log(err);
        res.send({"msg":"Please login again"})
     }
  }
  module.exports={autnentaction}